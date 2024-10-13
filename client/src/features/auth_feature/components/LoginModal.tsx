import React from 'react';
import Logo from '../../../components/Logo';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { loginValidationSchema } from '../utils/validation/loginSchema';
import { LoginFormValues } from '../types/Interfaces';
import { CustomTextField } from './CustomTextField';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

const LoginModal: React.FC = () => {
  const onSubmit = (values: LoginFormValues, actions: FormikHelpers<LoginFormValues>) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <div className="h-auto md:w-[30%] w-auto shadow-lg border-2 bg-white py-10 px-8 rounded-xl">
      <Logo />
      <div className="mt-4 mb-4">
        <h2 className="font-shopify1000 text-2xl">Login</h2>
        <p className="text-gray-600 text-sm font-shopify1000 ">Continue to Stock-Ease</p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
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
                  className="w-full h-12 text-white rounded-lg transition-all delay-200 duration-300 font-shopify1000 bg-gradient-to-b from-buttonTop to-buttonBootom "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Continue'}
                </button>
              </div>
              <div className="flex justify-start mb-3">
                <span>New to stock-ease ? <span>Get Started</span></span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
  );
};

export default LoginModal;