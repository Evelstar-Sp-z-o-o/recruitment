import { ReactNode } from 'react';
import { RegisterOptions } from 'react-hook-form';

type FormControllerProps = {
  fieldName: string;
  label?: ReactNode;
  disabled?: boolean;
  rules?: Omit<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'>;
};

export default FormControllerProps;
