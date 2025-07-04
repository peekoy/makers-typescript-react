import TextField from '@mui/material/TextField';
import type { TextFieldProps } from '@mui/material/TextField';
import React from 'react';

type InputFormProps = TextFieldProps;

const InputForm = React.forwardRef<HTMLDivElement, InputFormProps>(
  (props, ref) => {
    return (
      <TextField
        {...props}
        ref={ref}
        fullWidth
        margin='normal'
        variant='outlined'
      />
    );
  }
);

InputForm.displayName = 'InputForm';

export default InputForm;
