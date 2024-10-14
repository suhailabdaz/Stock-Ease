import { CustomTextFieldProps } from '../types/Interfaces';
import TextField from '@mui/material/TextField';


export const CustomTextField: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  placeholder, 
  type = 'text', 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      label={errorMessage ? String(errorMessage) :label}
      placeholder={ placeholder}
      type={type}
      error={!!errorMessage}
      fullWidth
      variant="outlined"
      margin="dense"
      aria-required 
      size="small" 
      
    />
  );
};