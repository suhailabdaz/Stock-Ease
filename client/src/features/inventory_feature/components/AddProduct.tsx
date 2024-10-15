import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { AddProductSchema } from '../utils/validation/AddProductSchema';
import { AddProductFormValues } from '../types/interface';
import { CustomTextField } from './CustomTextField';

const initialValues: AddProductFormValues = {
  name: '',     
  description: '',      
  image: undefined as unknown as File,  
  stock: 0,              
  price: 0,             
};


const AddProduct = () => {

  const onSubmit = async (
    values: AddProductFormValues,
    actions: FormikHelpers<AddProductFormValues>
  ) => {
    try {
      
    } catch {
    } finally {
      actions.setSubmitting(false);
    }
  };
  return (
    <motion.div
      key="signup"
      initial={{ x: '10%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-10%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="h-auto  w-auto md:shadow-custom bg-white py-10 px-8 md:rounded-xl">
        <div className="mt-4 mb-4">
          <h2 className="font-shopify font-bold text-2xl mb-1">
            Add Product
          </h2>
          <p className="text-gray-600 text-sm font-shopify1000 ">
            Enter Product Details
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="name"
                component={CustomTextField}
                label="Name"
                placeholder="Your Name"
              />
              <Field
                name="email"
                component={CustomTextField}
                label="Email"
                placeholder="email@domain.com"
              />
              <Field
                name="password"
                component={CustomTextField}
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex justify-center mb-5 mt-6">
                <button
                  type="submit"
                  className="w-full h-10  text-md text-white rounded-lg transition-all delay-200 duration-300 font-shopify1000 bg-gradient-to-b from-buttonTop to-buttonBootom "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <ButtonLoading/> : 'Create account '}
                </button>
              </div>
              
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}

export default AddProduct