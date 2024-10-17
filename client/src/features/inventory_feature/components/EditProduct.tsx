import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { AddProductSchema } from '../utils/validation/AddProductSchema';
import { AddProductFormValues } from '../types/interface';
import {
  CustomTextField,
  BigCustomTextField,
  CustomNumberField,
  CustomSelectField,
  CustomCheckboxField,
} from './CustomTextField';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditProductMutation, useGetSingleProductQuery } from '../api/inventory-api';
import { toast } from 'sonner';
import { ButtonLoading } from '../../../components/ButtonLoading';

const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  if(!id){
    return null
  }

  const { data: productData, isLoading, isError } = useGetSingleProductQuery(id,{
    refetchOnMountOrArgChange:true
  });
  const [updateProduct] = useEditProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading product data</div>;
  }

  const initialValues: AddProductFormValues = {
    title: productData?.product.title || '',
    description: productData?.product.description || '',
    stock: productData?.product.stock || 0,
    price: productData?.product.price || 0,
    status: productData?.product.status || '',
    publishing: productData?.product.publishing || [],
    category: productData?.product.category || '',
  };

  const onSubmit = async (
    values: AddProductFormValues,
    actions: FormikHelpers<AddProductFormValues>
  ) => {
    try {
      const response = await updateProduct({
        _id: id, 
        product: values,
      }).unwrap();
      toast.success(response.message);
      navigate('/products');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="edit-product"
      initial={{ x: '2%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-2%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={AddProductSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="w-[100%] mb-6 flex justify-between">
              <div className='flex space-x-5 items-start justify-start'>
                <ArrowLeftIcon onClick={() => navigate('/products')} className='md:h-7 text-greyText hover:cursor-pointer'/>
                <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
                  Edit Product
                </h1>
              </div>
              
              <div className="flex justify-end items-start space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-shopify1000 text-AABlack bg-gradient-to-b from-fafawhite to-fafawhite border border-AABlack py-2 px-4 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
                >
                  {isSubmitting ? <ButtonLoading/> : 'Edit'}
                </button>
              </div>
            </div>

            {/* Form fields */}
            <div className="md:flex md:justify-center md:space-x-5">
              <div className="md:w-[70%] space-y-5">
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Title Info</h1>
                  <Field
                    name="title"
                    component={CustomTextField}
                    label="Title"
                    placeholder="Product Title"
                  />
                  <Field
                    name="category"
                    component={CustomTextField}
                    label="Category"
                    placeholder="Product Category"
                  />
                  <Field
                    name="description"
                    component={BigCustomTextField}
                    label="Product Description"
                    placeholder="Description"
                  />
                </div>
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">
                    Stock & Prices
                  </h1>
                  <div className="flex justify-between items-center space-x-4">
                    <Field
                      name="stock"
                      component={CustomNumberField}
                      label="Stock"
                      placeholder="Stock value"
                    />
                    <Field
                      name="price"
                      component={CustomNumberField}
                      label="Price of the Product"
                      placeholder="Price"
                    />
                  </div>
                </div>
              </div>
              <div className="md:w-[30%] space-y-5">
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Status</h1>
                  <Field
                    name="status"
                    component={CustomSelectField}
                    label="Status"
                    placeholder="Status"
                  />
                </div>
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Publishing</h1>
                  <Field
                    name="publishing"
                    component={CustomCheckboxField}
                    label="Select Channels"
                    options={['Store', 'Online']} 
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

export default EditProduct;