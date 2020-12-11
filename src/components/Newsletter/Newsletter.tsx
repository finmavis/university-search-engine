import { useFormik, FormikErrors, FormikHelpers } from 'formik';

import ErrorHint from 'components/ErrorHint/ErrorHint';
import Input from 'components/Input/Input';
import { isValidEmail } from 'shared/helpers/validator';
import Modal from 'components/Modal/Modal';
import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

interface NewslatterFormValues {
  email: string;
}

function validate(
  values: NewslatterFormValues
): FormikErrors<NewslatterFormValues> {
  const errors: FormikErrors<NewslatterFormValues> = {};

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
}

function Newslatter(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [cookies, setCookies] = useCookies();
  const timeoutRef = useRef<number | null>();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: (
      values: NewslatterFormValues,
      actions: FormikHelpers<NewslatterFormValues>
    ) => {
      actions.setSubmitting(true);
      const json = JSON.stringify(values);
      const blob = new Blob([json], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.download = 'users.json';
      a.href = url;
      a.click();
    },
  });

  useEffect(() => {
    const isSubscribe = cookies.isShowNewsletter;
    const timeout = timeoutRef.current as number;
    if (!isSubscribe) {
      timeoutRef.current = window.setTimeout(() => {
        setIsOpen(true);
        setCookies('isShowNewsletter', true);
      }, 10000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [setCookies, cookies.isShowNewsletter]);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsOpen(false);
      }}
    >
      <p className='text-center text-white'>
        Stay up to date with our latest news and products.
      </p>
      <form onSubmit={formik.handleSubmit}>
        <div className='flex space-x-4'>
          <Input
            name='email'
            type='email'
            className='flex-1 rounded px-4 py-2 w-full'
            placeholder='your@email.address'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <button
            className='bg-blue-400 hover:bg-blue-400 rounded text-white py-2 p-4 transition ease-in-out duration-200'
            type='submit'
          >
            Sign up
          </button>
        </div>
        {formik.errors.email && formik.touched.email && (
          <ErrorHint className='text-sm'>{formik.errors.email}</ErrorHint>
        )}
      </form>
      <p className='text-center italic font-base text-gray-300 text-sm'>
        Your email is safe with us, we don't spam
      </p>
    </Modal>
  );
}

export default Newslatter;
