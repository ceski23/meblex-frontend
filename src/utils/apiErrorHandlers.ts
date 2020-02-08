import { toast } from './toaster';

export const defaultErrorHandler = (error, setErrors?): void => {
  if (typeof error === 'string') toast(error, 'error');
  else {
    toast(error[0].messages[0].message, 'error');
    // TODO: Add field-level errors
  }
};

