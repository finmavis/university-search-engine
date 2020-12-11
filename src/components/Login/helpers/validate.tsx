import { FormikErrors } from 'formik';
import { LoginFormValues } from 'components/Login/types';

export function validate(
  values: LoginFormValues
): FormikErrors<LoginFormValues> {
  const errors: FormikErrors<LoginFormValues> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
