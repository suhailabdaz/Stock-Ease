import React from 'react';
import Logo from '../../../components/Logo';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { loginValidationSchema } from '../utils/validation/loginSchema';
import { SignupFormValues } from '../types/Interfaces';
import { CustomTextField } from './CustomTextField';
import { motion } from 'framer-motion';
import { useRegisterMutation } from '../api/auth-api';

const initialValues: SignupFormValues = {
  name: '',
  email: '',
  password: '',
};

type Props = {
  onSwitchToLogin: () => void;
};

const SignupModal: React.FC<Props> = ({ onSwitchToLogin }) => {

  const [userCreate] = useRegisterMutation();

  const onSubmit = async(
    values: SignupFormValues,
    actions: FormikHelpers<SignupFormValues>
  ) => {
    try {
      const response = await userCreate(values).unwrap()
      
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
      <div className="h-auto   w-auto md:shadow-custom bg-white py-10 px-8 md:rounded-xl">
        <Logo />
        <div className="mt-4 mb-4">
          <h2 className="font-shopify font-bold text-2xl mb-1">
            Create Stock-Ease account
          </h2>
          <p className="text-gray-600 text-sm font-shopify1000 ">
            Start your Stock-Ease journey
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={loginValidationSchema}
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
                  {isSubmitting ? '...' : 'Create account '}
                </button>
              </div>
              <div className="flex font-shopify text-sm justify-start mt-10 mb-5">
                <span className="text-gray-600">
                  Alread a member ?{' '}
                  <button onClick={onSwitchToLogin}>
                    <span className="text-blue-500">Login</span>
                  </button>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
};

export default SignupModal;
