import React from 'react';
import { CustomTextFieldProps } from '../types/interface';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';

// Original CustomTextField
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

// New CustomFileField for file uploads
export const CustomFileField: React.FC<CustomTextFieldProps> = ({ 
  field, 
  form: { touched, errors, setFieldValue }, 
  label, 
  ...props 
}) => {
  const errorMessage = touched[field.name] && errors[field.name];
  return (
    <div>
      <input
         {...field}
         {...props}
        accept="image/*,application/pdf"
        style={{ display: 'none' }}
        id={field.name}
        type="file"
        onChange={(event) => {
          setFieldValue(field.name, event.currentTarget.files?.[0]);
        }}
      />
      <label htmlFor={field.name}>
        <Button variant="contained" component="span">
          {label}
        </Button>
      </label>
      {field.value && <span style={{ marginLeft: '10px' }}>{field.value.name}</span>}
      {errorMessage && <div style={{ color: 'red' }}>{String(errorMessage)}</div>}
    </div>
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