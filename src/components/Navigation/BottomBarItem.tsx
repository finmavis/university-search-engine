import { NavLink, NavLinkProps } from 'react-router-dom';
import clsx from 'clsx';

function BottombarItem({
  to,
  children,
  className,
  activeClassName,
  ...props
}: NavLinkProps): JSX.Element {
  return (
    <NavLink
      to={to}
      className={clsx(
        'text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium',
        className
      )}
      activeClassName={clsx('bg-gray-900 text-white', activeClassName)}
      {...props}
    >
      {children}
    </NavLink>
  );
}

export default BottombarItem;
