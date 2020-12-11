import { Fragment } from 'react';

function Skeleton({ amount = 4 }: SkeletonProps): JSX.Element {
  return (
    <Fragment>
      {Array.from({ length: amount }).map((_, index) => (
        <div
          key={index}
          className='border border-gray-300 shadow-md rounded-md p-4 max-w-sm w-full mx-auto'
        >
          <div className='animate-pulse'>
            <div className='flex-1 space-y-4'>
              <div className='h-6 bg-gray-100 rounded w-full'></div>
              <div className='h-4 bg-gray-100 rounded w-full'></div>
              <div className='h-10 bg-gray-100 rounded w-full'></div>
            </div>
          </div>
        </div>
      ))}
    </Fragment>
  );
}

interface SkeletonProps {
  amount?: number;
}

export default Skeleton;
