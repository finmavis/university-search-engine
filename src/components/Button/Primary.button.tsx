import { DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

function PrimaryButton({
  className,
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>): JSX.Element {
  return (
    <button
      className={clsx(
        `bg-red-400 hover:bg-red-400 rounded text-white py-1 px-2 sm:px-4 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-200`,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
