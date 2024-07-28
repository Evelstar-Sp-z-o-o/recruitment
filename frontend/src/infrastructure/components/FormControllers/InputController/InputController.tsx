import { FunctionComponent, ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@hookform/error-message';
import { Alert, FormControl, Input, Typography } from '@mui/material';

import FormControllerProps from '../types/FormControllerProps';

type Props = FormControllerProps & {
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  type?: string;
  defaultValue?: string;
  rows?: number;
  multiline?: boolean;
  required?: boolean;
  placeholder?: string;
  style?: Record<string, number | string>;
};

const InputController: FunctionComponent<Props> = ({
  fieldName,
  label,
  disabled,
  startAdornment,
  endAdornment,
  rules,
  type,
  defaultValue = '',
  multiline = false,
  placeholder,
  style,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      {label && <Typography>{label}</Typography>}
      <FormControl sx={{ width: '100%' }}>
        <Controller
          name={fieldName}
          control={control}
          rules={rules}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              fullWidth
              {...field}
              multiline={multiline}
              disabled={disabled}
              startAdornment={startAdornment}
              endAdornment={endAdornment}
              type={type}
              placeholder={placeholder}
              sx={style}
              inputProps={{ 'data-testid': fieldName }}
            />
          )}
        />
        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => (
            <Alert severity="error" data-testid="errorAlert">
              {message}
            </Alert>
          )}
        />
      </FormControl>
    </div>
  );
};

export default InputController;
