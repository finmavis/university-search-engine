import BottomBarItem from './BottomBarItem';

import { useUser } from 'shared/stores/user.store';
import { useFavourite } from 'shared/stores/favourite.store';

function BottomBar(): JSX.Element {
  const { user, logout } = useUser();
  const { clearAll } = useFavourite();

  function onLogout() {
    logout();
    clearAll();
  }

  return (
    <nav className='bg-gray-800 fixed block sm:hidden bottom-0 left-0 w-full z-10'>
      <div className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='relative flex-1 flex items-center justify-around sm:items-stretch sm:justify-start h-16'>
          <BottomBarItem to='/' exact className='px-2 sm:px-3 py-2'>
            Home
          </BottomBarItem>
          <BottomBarItem to='/favourite' className='px-2 sm:px-3 py-2'>
            Favourite
          </BottomBarItem>
          {!user ? (
            <BottomBarItem to='/login' className='px-2 sm:px-3 py-2'>
              Login
            </BottomBarItem>
          ) : (
            <button
              className='text-gray-300 hover:bg-gray-700 hover:text-white rounded-md text-sm font-medium px-2 sm:px-3 py-2'
              onClick={onLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default BottomBar;
