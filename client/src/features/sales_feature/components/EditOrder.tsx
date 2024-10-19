import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { CreateOrderSchema } from '../utils/validation/CreateOrderSchema';
import { CreateOrderFormValues } from '../types/interface';
import {
  CustomSelectField,
  CustomNumberField,
  CustomSelectFieldTwo,
  CustomTextField,

} from './CustomTextField';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditOrderMutation, useGetCustomersQuery, useGetProductsQuery, useGetSingleOrderQuery } from '../api/sales-api';
import { toast } from 'sonner';
import { ButtonLoading } from '../../../components/ButtonLoading';
import Shimmer from '../../../components/Shimmer';
import ErrorInTheTable from '../../../components/ErrorInTheTable';
import { useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';


const EditOrder: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const vendorid = useSelector((state:RootState)=>state.userSlice.userData?._id)
  
  if(!id || !vendorid){
    return (
      <>
      <ErrorInTheTable/>
      </>
    )
  }


  const { data: orderData, isLoading, isError } = useGetSingleOrderQuery({orderid:id,vendorid:vendorid},{
    refetchOnMountOrArgChange:true
  });

  const { data: productsData } = useGetProductsQuery(vendorid, {
    refetchOnMountOrArgChange: true,
  });

  const { data: customersData } = useGetCustomersQuery(vendorid, {
    refetchOnMountOrArgChange: true,
  });


  
  const [updateOrder] = useEditOrderMutation();

  if (isLoading) {
    return <div>
      <Shimmer/>
    </div>;
  }

  if (isError) {
    return <div>
      <ErrorInTheTable/>
    </div>;
  }

  if(!customersData || !productsData || !orderData){
    return (
      <>
      <ErrorInTheTable/>
      </>
    )
  }


  const findCustomerName = (customerId: string) => {
    const customer = customersData?.customers.find(c => c._id === customerId);
    return customer ? `${customer.name}` : '';
  };

  const findProductTitle = (productId: string) => {
    const product = productsData?.products.find(p => p._id === productId);
    return product ? product.title : '';
  };

  const initialValues: CreateOrderFormValues = {
    vendorid:vendorid,
    customerid:findCustomerName(orderData.order.customerid) ,
    productid: findProductTitle(orderData.order.productid) ,
    paymentmethod:  orderData?.order.paymentmethod,
    price:  orderData?.order.price ,
    status:  orderData?.order.status,
  };


  const onSubmit = async (
    values: CreateOrderFormValues,
    actions: FormikHelpers<CreateOrderFormValues>
  ) => {
    try {
      const response = await updateOrder({
        vendorid:vendorid,
        _id: id, 
        status: values.status,
      }).unwrap();
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
      key="edit-customer"
      initial={{ x: '2%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-2%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={CreateOrderSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
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
                disabled={isSubmitting}
                className="font-shopify1000 text-AABlack bg-gradient-to-b from-fafawhite to-fafawhite border border-AABlack py-2 px-4 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
              >
                {isSubmitting ? <ButtonLoading /> : 'Edit'}
              </button>
            </div>
          </div>

          <div className="md:flex md:justify-center md:space-x-5">
            <div className="md:w-[70%] space-y-5">
              <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                <h1 className="font-shopify1000 text-xl mb-2">Order Info</h1>
                <Field
                  name="customerid"
                  component={CustomTextField}
                  label="Customer"
                  displayKey="name"
                  placeholder="Select a Customer"
                  disabled={true}
                />
                <Field
                  name="productid"
                  component={CustomTextField}
                  label="Product"
                  displayKey="title"
                  placeholder="Select a Product"
                  disabled={true}
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
                    disabled={true}
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

export default EditOrder;