import { Fragment } from 'react';

import NavbarItem from './NavbarItem';

import { useUser } from 'shared/stores/user.store';
import { useFavourite } from 'shared/stores/favourite.store';

const NAVBAR_ITEMS = [
  {
    to: '/',
    name: 'Home',
    exact: true,
  },
  {
    to: '/favourite',
    name: 'Favourite',
    exact: false,
  },
];

function Navigation(): JSX.Element {
  const { user, logout } = useUser();
  const { clearAll } = useFavourite();

  function onLogout() {
    logout();
    clearAll();
  }

  return (
    <nav className='bg-gray-800 hidden sm:block fixed top-0 left-0 w-full z-10'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex items-center justify-between h-16'>
          <div className='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex space-x-4'>
              {NAVBAR_ITEMS.map((item) => (
                <NavbarItem
                  key={item.to}
                  to={item.to}
                  exact={item.exact}
                  className='px-2 sm:px-3 py-2'
                >
                  {item.name}
                </NavbarItem>
              ))}
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:pr-0'>
            <div className='flex space-x-2 sm:space-x-4'>
              {!user ? (
                <Fragment>
                  <NavbarItem to='/register' className='px-2 sm:px-3 py-2'>
                    Register
                  </NavbarItem>
                  <NavbarItem to='/login' className='px-2 sm:px-3 py-2'>
                    Login
                  </NavbarItem>
                </Fragment>
              ) : (
                <button
                  className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium px-2 sm:px-3 py-2'
                  onClick={onLogout}
                >
                  Sign Out
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
