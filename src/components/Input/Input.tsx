import { HTMLProps } from 'react';
import clsx from 'clsx';

function Input({
  className,
  ...props
}: HTMLProps<HTMLInputElement>): JSX.Element {
  return (
    <input
      className={clsx(
        'block border border-grey-light w-full p-2 rounded',
        className
      )}
      {...props}
    />
  );
}

export default Input;
