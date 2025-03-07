import * as Yup from 'yup';

export const SignupValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'At least an uppercase, a lowercase, a number and a special character'
    ),
  name: Yup.string()
    .required('Name is required')
    .min(3,'Atleast 3 characters'),
});

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'At least an uppercase, a lowercase, a number and a special character'
    ),
})


export const OtpValidationSchema = Yup.object({
  otp: Yup.string()
    .required('otp is required')
    .min(6, 'otp is of 6 characters')
    .max(6,'otp is of 6 characters')
    .matches(/^\d+$/, 'Only numbers are allowed')
})
