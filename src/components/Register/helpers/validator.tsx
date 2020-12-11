import { FormikErrors } from 'formik';

import { RegisterFormValues } from 'components/Register/types';
import { isValidEmail } from 'shared/helpers/validator';

export function validate(
  values: RegisterFormValues
): FormikErrors<RegisterFormValues> {
  const errors: FormikErrors<RegisterFormValues> = {};

  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Password is required';
  }

  return errors;
}
