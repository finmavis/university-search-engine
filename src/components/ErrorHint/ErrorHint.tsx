import { HTMLProps } from 'react';
import clsx from 'clsx';

function ErrorHint({
  className,
  children,
  ...props
}: HTMLProps<HTMLParagraphElement>): JSX.Element {
  return (
    <p className={clsx('text-red-700', className)} {...props}>
      {children}
    </p>
  );
}

export default ErrorHint;
