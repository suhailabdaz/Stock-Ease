import { Field, Form, Formik, FormikHelpers } from 'formik';
import { motion } from 'framer-motion';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { AddProductSchema } from '../utils/validation/AddProductSchema';
import { AddProductFormValues } from '../types/interface';
import { CustomTextField,BigCustomTextField,CustomFileField,CustomNumberField } from './CustomTextField';

const initialValues: AddProductFormValues = {
  title: '',     
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
      console.log(values);
      
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
       <div className="w-[100%] mb-6 flex justify-between">
      <h1 className="font-shopify1000 font-bold text-greyText text-2xl">
            Add Product
          </h1>
          <button
        // onClick={() => navigate('/products/add-product')}
        className="font-shopify1000 text-fafawhite bg-gradient-to-b from-buttonTop to-buttonBootom  py-2 px-3 rounded-xl hover:scale-105 transition-all ease-in-out duration-300"
          >
            Save
          </button>
          </div>
          <div className='md:flex md:justify-center md:space-x-5'>
      <div className="h-auto w-auto md:w-[70%] md:shadow-custom bg-white py-10 px-8 md:rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="title"
                component={CustomTextField}
                label="Title"
                placeholder="Product Title"
              />
              <Field
                name="description"
                component={BigCustomTextField}
                label="Product Description"
                placeholder="Description"
              />
              <Field
                name="image"
                component={CustomFileField}
                label="Image"
                placeholder="Upload product Image"
              />
            </Form>
          )}
        </Formik>
        
      </div>
      <div className="h-auto w-auto md:shadow-custom bg-white py-10 px-8 md:rounded-xl">
        <Formik
          initialValues={initialValues}
          validationSchema={AddProductSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="stock"
                component={CustomNumberField}
                label="stock"
                placeholder="Stock value"
              />
              <Field
                name="price"
                component={CustomNumberField}
                label="Price of the Product"
                placeholder="Price"
              />
              
            </Form>
          )}
        </Formik>
        
      </div>

      </div>
    </motion.div>
  );
}

export default AddProduct