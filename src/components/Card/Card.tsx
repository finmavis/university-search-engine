import { MouseEvent } from 'react';

function Card({
  name,
  country,
  web,
  isFavourite,
  onClickFavorite,
}: CardProps): JSX.Element {
  return (
    <div className='bg-gray-100 border border-gray-300 rounded-lg p-4 flex flex-col shadow-md'>
      <div className='mb-6'>
        <h4 className='text-xl font-semibold'>{name}</h4>
        <p className='text-sm font-medium text-gray-500 mt-2'>{country}</p>
      </div>
      <div className='flex space-x-3 text-sm font-medium mt-auto'>
        <div className='flex-auto flex space-x-3'>
          <a
            href={web}
            target='_blank'
            rel='noopener noreferrer'
            className='flex flex-1 items-center justify-center rounded-md bg-black text-white'
          >
            Web
          </a>
          <button
            className={`flex-none flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 ${
              isFavourite ? 'text-red-500' : 'text-gray-400'
            }`}
            type='button'
            aria-label='like'
            onClick={onClickFavorite}
          >
            <svg width='20' height='20' fill='currentColor'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

interface CardProps {
  name: string;
  country: string;
  web: string;
  isFavourite: boolean;
  onClickFavorite: (event: MouseEvent<HTMLButtonElement>) => void;
}

export default Card;
