import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik, FormikHelpers } from 'formik';

import { useUser } from 'shared/stores/user.store';

import Input from 'components/Input/Input';
import ErrorHint from 'components/ErrorHint/ErrorHint';
import PrimaryButton from 'components/Button/Primary.button';

import { RegisterFormValues } from 'components/Register/types';
import { validate } from 'components/Register/helpers/validator';

function Register(): JSX.Element {
  const history = useHistory();
  const { user, register, isExists } = useUser();
  const [registerError, setRegisterError] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate,
    onSubmit: (
      values: RegisterFormValues,
      actions: FormikHelpers<RegisterFormValues>
    ) => {
      actions.setSubmitting(true);
      if (isExists(values.email)) {
        actions.setSubmitting(false);
        setRegisterError(true);
        return;
      }
      register(values);
      history.push('/');
    },
  });

  if (user) {
    history.push('/');
  }

  return (
    <section className='flex items-center justify-center sm:mt-8'>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
        <form onSubmit={formik.handleSubmit} className='w-full'>
          <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
            <h1 className='mb-8 text-3xl text-center'>Register</h1>
            <Input
              type='text'
              className='mt-4'
              name='name'
              placeholder='Full Name'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.errors.name && formik.touched.name && (
              <ErrorHint className='text-sm'>{formik.errors.name}</ErrorHint>
            )}
            <Input
              type='email'
              className='mt-4'
              name='email'
              placeholder='Email'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.errors.email && formik.touched.email && (
              <ErrorHint className='text-sm'>{formik.errors.email}</ErrorHint>
            )}
            <Input
              type='password'
              className='mt-4'
              name='password'
              placeholder='Password'
              required
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
              <ErrorHint className='text-sm'>
                {formik.errors.password}
              </ErrorHint>
            )}
            {registerError && (
              <ErrorHint className='text-sm my-4 text-center'>
                User already exists!
              </ErrorHint>
            )}
            <PrimaryButton
              type='submit'
              className='w-full py-3 rounded my-1 mt-4'
              disabled={formik.isSubmitting}
            >
              Create Account
            </PrimaryButton>
            <div className='text-grey-dark mt-4 text-center'>
              Already have an account?&nbsp;
              <Link className='no-underline text-red-400' to='/login'>
                Log in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
