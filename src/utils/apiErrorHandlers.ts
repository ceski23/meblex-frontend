import { toast } from './toaster';

export const defaultErrorHandler = (error, setErrors?): void => {
  if (error.errors) setErrors(error.errors);
  if (error.detail) toast(error.detail, 'error');
  else toast(error.title, 'error');
};
