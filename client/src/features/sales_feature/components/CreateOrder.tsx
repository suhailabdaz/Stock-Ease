import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { CreateOrderSchema } from '../utils/validation/CreateOrderSchema';
import { CreateOrderFormValues } from '../types/interface';
import {
  CustomSelectField,
  CustomObjectSelectField,
  CustomNumberField,
  CustomSelectFieldTwo,
} from './CustomTextField';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import {
  useCreateOrderMutation,
  useGetCustomersQuery,
  useGetProductsQuery,
} from '../api/sales-api';
import { toast } from 'sonner';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import ErrorInTheTable from '../../../components/ErrorInTheTable';



const CreateOrder: React.FC = () => {
  const navigate = useNavigate();

  const vendorId = useSelector((state:RootState)=>state.userSlice.userData?._id)

  if(!vendorId){
    return(
      <>
      <ErrorInTheTable/></>
    )
  }

  const initialValues: CreateOrderFormValues = {
    vendorid:vendorId,
    customerid: '',
    productid: '',
    paymentmethod: '',
    price: 0,
    status: '',
  };

  const [createOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const { data: productsData,isLoading:isProductsLoading } = useGetProductsQuery(vendorId, {
    refetchOnMountOrArgChange: true,
  });

  const { data: customersData,isLoading: isCustomersLoading  } = useGetCustomersQuery(vendorId, {
    refetchOnMountOrArgChange: true,
  });

  if(!customersData || !productsData){
    return (
      <>
      <ErrorInTheTable/>
      </>
    )
  }

  const productRatata = productsData?.products.filter((product: any) => product.stock > 0);


  const onSubmit = async (
    values: CreateOrderFormValues,
    actions: FormikHelpers<CreateOrderFormValues>
  ) => {
    try {
      console.log("thr order bvalues",values);
      
      const response = await createOrder(values).unwrap();
      toast.success(response.message);
      navigate('/orders');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="add-customer"
      initial={{ x: '2%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-2%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CreateOrderSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            <div className="w-[100%] mb-6 flex justify-between">
              <div className="flex space-x-5 items-start justify-start">
                <ArrowLeftIcon
                  onClick={() => navigate('/orders')}
                  className="md:h-7 text-greyText hover:cursor-pointer"
                />
                <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
                  Create Order
                </h1>
              </div>

              <div className="flex justify-end items-start space-x-4">
                <button
                  type="button"
                  className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isCreatingOrder}
                  className="font-shopify1000 text-AABlack bg-gradient-to-b from-fafawhite to-fafawhite border border-AABlack py-2 px-4 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
                >
                  {isSubmitting ? <ButtonLoading /> : 'Create'}
                </button>
              </div>
            </div>

            <div className="md:flex md:justify-center md:space-x-5">
              <div className="md:w-[70%] space-y-5">
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Order Info</h1>
                  <Field
                    name="customerid"
                    component={CustomObjectSelectField}
                    label="Customer"
                    options={customersData?customersData.customers:[]}
                    displayKey="name"
                    placeholder="Select a Customer"
                    isLoading={isCustomersLoading}
                  />
                  <Field
                    name="productid"
                    component={CustomObjectSelectField}
                    label="Product"
                    options={productsData?productRatata:[]}
                    displayKey="title"
                    placeholder="Select a Product"
                    isLoading={isProductsLoading}
                    onChange={(selectedProductId: string) => {
                      setFieldValue('productid', selectedProductId);
                      const selectedProduct = productsData?.products?.find(
                        (product) => product._id === selectedProductId
                      );
                      if (selectedProduct) {
                        setFieldValue('price', selectedProduct.price);
                      }
                    }}
                  />
                </div>
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Payment</h1>
                  <div className="flex justify-between items-center space-x-4">
                    <Field
                      name="paymentmethod"
                      component={CustomSelectField}
                      label="Payment Method"
                      placeholder="Payment Method"
                    />
                    <Field
                      name="price"
                      component={CustomNumberField}
                      label="Price"
                      placeholder="Price"
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-[30%] space-y-5">
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Status</h1>
                  <Field
                    name="status"
                    component={CustomSelectFieldTwo}
                    label="Status"
                    placeholder="Status"
                  />
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CreateOrder;
