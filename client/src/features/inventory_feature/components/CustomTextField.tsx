import React from 'react';
import { CustomTextFieldProps } from '../types/interface';
import TextField from '@mui/material/TextField';
import { Select, MenuItem, FormControl, InputLabel, FormLabel, FormControlLabel, FormHelperText, FormGroup, Checkbox } from '@mui/material';
import { FieldProps } from 'formik';


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
        <MenuItem value="active">Active</MenuItem>
        <MenuItem value="blocked">Blocked</MenuItem>
      </Select>
      {errorMessage && <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '3px' }}>{String(errorMessage)}</div>}
    </FormControl>
  );
};

interface CustomCheckboxFieldProps extends FieldProps {
  label: string;
  options: string[];
}

export const CustomCheckboxField: React.FC<CustomCheckboxFieldProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  label,
  options,
}) => {
  // Get the error message if the field has been touched and has an error
  const errorMessage = touched[field.name] && errors[field.name];

  // Handle the change event for checkboxes
  const handleChange = (option: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValues = field.value as string[];
    let newValues: string[];
    
    if (event.target.checked) {
      // Add the option if it's checked
      newValues = [...currentValues, option];
    } else {
      // Remove the option if it's unchecked
      newValues = currentValues.filter(value => value !== option);
    }
    
    // Update the field value
    setFieldValue(field.name, newValues);
  };

  return (
    <FormControl component="fieldset" error={!!errorMessage} margin="dense" fullWidth>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup>
        {options.map((option) => (
          <FormControlLabel
            key={option}
            control={
              <Checkbox
                checked={(field.value as string[]).includes(option)}
                onChange={handleChange(option)}
                name={`${field.name}[${option}]`}
              />
            }
            label={option}
          />
        ))}
      </FormGroup>
      {errorMessage && <FormHelperText>{String(errorMessage)}</FormHelperText>}
    </FormControl>
  );
};