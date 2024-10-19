import React from 'react';
import Logo from '../../../components/Logo';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { OtpValidationSchema } from '../utils/validation/loginSchema';
import { otpformValues } from '../types/Interfaces';
import { CustomTextField } from './CustomTextField';
import { motion } from 'framer-motion';
import { ButtonLoading } from '../../../components/ButtonLoading';
import { useVerfyOtpMutation } from '../api/auth-api';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../stores/store';
import { removeEmail } from '../../../stores/userSlice';

type Props = {
  onSwitchToSignup: (modal: string) => void;
};

const OtpModal: React.FC<Props> = ({ onSwitchToSignup }) => {
  const email = useSelector((state: RootState) => state.userSlice.email); 
const dispatch = useDispatch()
  const initialValues: otpformValues = {
    email: email || '',
    otp: '',
  };

  const [verifyOtp] = useVerfyOtpMutation();
  const onSubmit = async (
    values: otpformValues,
    actions: FormikHelpers<otpformValues>
  ) => {
    try {
      const response = await verifyOtp(values).unwrap();
      if (response.status == 200 || 201) {
        onSwitchToSignup('login');
        toast.success(response.message);
         dispatch(removeEmail())
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error('Something went wrong !!!');
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
          <h2 className="font-shopify font-bold text-2xl mb-1">Enter OTP</h2>
          <p className="text-gray-600 text-sm font-shopify1000 ">
            Enter otp send to your email
          </p>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={OtpValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="otp"
                component={CustomTextField}
                label="OTP"
                placeholder="Enter your otp"
              />
              <div className="flex justify-center mb-5 mt-6">
                <button
                  type="submit"
                  className="w-full h-10  text-md text-white rounded-lg transition-all delay-200 duration-300 font-shopify1000 bg-gradient-to-b from-buttonTop to-buttonBootom "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <ButtonLoading /> : 'Verify Otp '}
                </button>
              </div>
              <div className="flex justify-between font-shopify text-sm  mt-10 mb-5">
                <span className="text-gray-600">
                  Back to signup ?{' '}
                  <button onClick={() => onSwitchToSignup('signup')}>
                    <span className="text-blue-500">Click here</span>
                  </button>
                </span>
                <span className="text-gray-600 ">
                  <button onClick={() => onSubmit}>
                    <span className="text-blue-500">Resend otp</span>
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

export default OtpModal;
