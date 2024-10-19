import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { AddCustomerSchema } from '../utils/validation/AddCustomerSchema';
import { AddCustomerFormValues } from '../types/interface';
import { CustomTextField, CustomSelectField } from './CustomTextField';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import {
  useEditCustomerMutation,
  useGetSingleCustomerQuery,
} from '../api/customer-api';
import { toast } from 'sonner';
import { ButtonLoading } from '../../../components/ButtonLoading';
import Shimmer from '../../../components/Shimmer';
import ErrorInTheTable from '../../../components/ErrorInTheTable';

const EditCustomer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  const {
    data: customerData,
    isLoading,
    isError,
  } = useGetSingleCustomerQuery(id, {
    refetchOnMountOrArgChange: true,
  });
  const [updateCustomer] = useEditCustomerMutation();

  if (isLoading) {
    return (
      <div>
        <Shimmer />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <ErrorInTheTable />
      </div>
    );
  }

  const initialValues: AddCustomerFormValues = {
    name: customerData?.customer.name || '',
    address: customerData?.customer.address || '',
    pincode: customerData?.customer.pincode || '',
    mobile: customerData?.customer.mobile || '',
    status: customerData?.customer.status || '',
  };

  const onSubmit = async (
    values: AddCustomerFormValues,
    actions: FormikHelpers<AddCustomerFormValues>
  ) => {
    try {
      const response = await updateCustomer({
        _id: id,
        customer: values,
      }).unwrap();
      toast.success(response.message);
      navigate('/customers');
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
        validationSchema={AddCustomerSchema}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="w-[100%] mb-6 flex justify-between">
              <div className="flex space-x-5 items-start justify-start">
                <ArrowLeftIcon
                  onClick={() => navigate('/customers')}
                  className="md:h-7 text-greyText hover:cursor-pointer"
                />
                <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
                  Edit Customer
                </h1>
              </div>

              <div className="flex justify-end items-start space-x-4">
                <button
                  type="button"
                  onClick={() => navigate('/customers')}
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

            {/* Form fields */}
            <div className="md:flex md:justify-center md:space-x-5">
              <div className="md:w-[70%] space-y-5">
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">
                    Customer Info
                  </h1>
                  <Field
                    name="name"
                    component={CustomTextField}
                    label="Name"
                    placeholder="Customer Name"
                  />
                  <Field
                    name="address"
                    component={CustomTextField}
                    label="Address"
                    placeholder="Address Name"
                  />
                  <Field
                    name="pincode"
                    component={CustomTextField}
                    label="Pin Code"
                    placeholder="Address Pin Code"
                  />
                </div>
                <div className="md:shadow-custom border border-gray-400 bg-white pt-4 pb-6 px-6 md:rounded-xl">
                  <h1 className="font-shopify1000 text-xl mb-2">Contacts</h1>
                  <div className="flex justify-between items-center space-x-4">
                    <Field
                      name="mobile"
                      component={CustomTextField}
                      label="Mobile"
                      placeholder="Mobile Number"
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
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditCustomer;
