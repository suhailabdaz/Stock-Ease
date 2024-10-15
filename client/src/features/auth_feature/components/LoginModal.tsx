import React from 'react';
import Logo from '../../../components/Logo';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { LoginValidationSchema } from '../utils/validation/loginSchema';
import { LoginFormValues } from '../types/Interfaces';
import { CustomTextField } from './CustomTextField';
import { motion } from 'framer-motion';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { useLoginMutation } from '../api/auth-api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../../stores/userSlice';
import { toast } from 'sonner';

const initialValues: LoginFormValues = {
  email: '',
  password: '',
};

type Props = {
  onSwitchToSignup: (modal: string) => void;
};

const LoginModal: React.FC<Props> = ({ onSwitchToSignup }) => {
  const [loginMutation, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    try {
      const response = await loginMutation(values).unwrap();
      if (response.status == 200) {
        dispatch(login(response.data.user));
        navigate('/home');
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ x: '-10%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '10%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="h-auto  transition-all delay-300 duration-300 w-auto md:shadow-custom  bg-white py-10 px-8 md:rounded-xl">
        <Logo />
        <div className="mt-4 mb-4">
          <h2 className="font-shopify font-bold text-2xl mb-1">Log in</h2>
          <p className="text-gray-600 text-sm font-shopify1000 ">
            Continue to Stock-Ease
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={LoginValidationSchema}
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
                  className="w-full h-10  text-md text-white rounded-lg transition-all delay-200 duration-300 font-shopify1000 bg-gradient-to-b from-buttonTop to-buttonBootom "
                  disabled={isSubmitting || isLoading}
                >
                  {isSubmitting ? <ButtonLoading /> : 'Login with email '}
                </button>
              </div>
              <div className="flex font-shopify text-sm justify-start mt-10 mb-5">
                <span className="text-gray-600">
                  New to Stock-Ease ?{' '}
                  <button onClick={() => onSwitchToSignup('signup')}>
                    <span className="text-blue-500">Get Started</span>
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

export default LoginModal;
