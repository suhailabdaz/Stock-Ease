import React from 'react';
import { CustomTextFieldProps } from '../types/interface';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel,SelectChangeEvent, FormHelperText } from '@mui/material';
import { FieldProps } from 'formik';

interface CustomObjectSelectFieldProps extends FieldProps {
  label: string;
  options: Array<{ [key: string]: any }>;
  displayKey: string;
  placeholder?: string;
  onChange?:any
}



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
      label={errorMessage ? String(errorMessage) : label}
      placeholder={placeholder}
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

// New BigCustomTextField for descriptions
export const BigCustomTextField: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  placeholder, 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      label={errorMessage ? String(errorMessage) : label}
      placeholder={placeholder}
      error={!!errorMessage}
      fullWidth
      variant="outlined"
      margin="dense"
      multiline
      rows={4}
      aria-required 
    />
  );
};



// New CustomNumberField for price and stock
export const CustomNumberField: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  placeholder, 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <TextField
      {...field}
      {...props}
      label={errorMessage ? String(errorMessage) : label}
      placeholder={placeholder}
      type="number"
      error={!!errorMessage}
      fullWidth
      variant="outlined"
      margin="dense"
      aria-required 
      size="small"
      InputProps={{
        inputProps: { 
          min: 0,
          step: field.name === 'price' ? 0.01 : 1 // Use cents for price, whole numbers for stock
        }
      }}
    />
  );
};

export const CustomSelectField: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors }, 
  label, 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <FormControl fullWidth error={!!errorMessage} variant="outlined" margin="dense" size="small">
      <InputLabel id={`${field.name}-label`}>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        labelId={`${field.name}-label`}
        label={label}
      >
        <MenuItem value="cash">Cash</MenuItem>
      </Select>
      {errorMessage && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>{String(errorMessage)}</div>}
    </FormControl>
  );
};

export const CustomSelectFieldTwo: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors, setFieldValue }, 
  label, 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  const handleChange = (event: SelectChangeEvent<string>) => {
    setFieldValue(field.name, event.target.value);
  };

  return (
    <FormControl fullWidth error={!!errorMessage} variant="outlined" margin="dense" size="small">
      <InputLabel id={`${field.name}-label`}>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        labelId={`${field.name}-label`}
        label={label}
        value={field.value || ''}
        onChange={handleChange}
      >
        <MenuItem value="">Select</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="completed">Completed</MenuItem>
        <MenuItem value="cancelled">Cancelled</MenuItem>
      </Select>
      {errorMessage && <FormHelperText>{String(errorMessage)}</FormHelperText>}
    </FormControl>
  );
};





export const CustomObjectSelectField: React.FC<CustomObjectSelectFieldProps> = ({
  field,
  form: { touched, errors, setFieldValue },
  label,
  options,
  displayKey,
  placeholder,
  onChange, 
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedId = event.target.value as string;
    setFieldValue(field.name, selectedId);
    if (onChange) {
      onChange(selectedId);  
    }
  };

  return (
    <FormControl fullWidth error={!!errorMessage} variant="outlined" margin="dense" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        {...field}
        {...props}
        label={errorMessage ? String(errorMessage) :label}
        onChange={handleChange}
        value={field.value || ''}
      >
        {placeholder && (
          <MenuItem value="" disabled>
            {placeholder}
          </MenuItem>
        )}
        {Array.isArray(options) && options.map((option) => (
          <MenuItem key={option._id} value={option._id}>
            {option[displayKey]}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>{String(errorMessage)}</div>}
    </FormControl>
  );
};