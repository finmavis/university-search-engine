import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik, FormikHelpers } from 'formik';

import { useUser } from 'shared/stores/user.store';

import Input from 'components/Input/Input';
import ErrorHint from 'components/ErrorHint/ErrorHint';
import PrimaryButton from 'components/Button/Primary.button';

import { validate } from 'components/Login/helpers/validate';
import { LoginFormValues, ErrorLoginType } from 'components/Login/types';

const ERROR_LOGIN: ErrorLoginType = {
  NO_EXISTS: `User doesn't exists`,
  INCORRECT: `Email or password incorrect`,
};

function Login(): JSX.Element {
  const history = useHistory();
  const { user, login } = useUser();
  const [loginError, setLoginError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (
      values: LoginFormValues,
      actions: FormikHelpers<LoginFormValues>
    ) => {
      actions.setSubmitting(true);
      try {
        login(values);
      } catch (error) {
        const message: keyof ErrorLoginType = error.message;
        setLoginError(ERROR_LOGIN[message]);
        actions.setSubmitting(false);
        return;
      }
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
            <h1 className='mb-8 text-3xl text-center'>Login</h1>
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
            {loginError && (
              <ErrorHint className='text-sm my-4 text-center'>
                {loginError}
              </ErrorHint>
            )}
            <PrimaryButton
              type='submit'
              className='w-full text-center py-3 rounded my-1 mt-4'
              disabled={formik.isSubmitting}
            >
              Login
            </PrimaryButton>
            <div className='text-grey-dark mt-4 text-center'>
              Doesn't have an account?&nbsp;
              <Link className='no-underline text-red-400' to='/register'>
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
