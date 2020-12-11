import { Fragment, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { UniversityType, useFavourite } from 'shared/stores/favourite.store';
import { useUser } from 'shared/stores/user.store';

import Card from 'components/Card/Card';
import Input from 'components/Input/Input';
import PrimaryButton from 'components/Button/Primary.button';

import { getUniversity } from 'shared/helpers/api';
import Skeleton from 'components/Skeleton/Skeleton';

function HomePage(): JSX.Element {
  const [search, setSearch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [universityList, setUniversityList] = useState<UniversityType[]>([]);
  const { has, add, remove } = useFavourite();
  const { user } = useUser();
  const history = useHistory();

  async function onClickSearch() {
    if (search.length === 0) return;
    setIsLoading(true);
    const results = await getUniversity(search);
    setUniversityList(results);
    setIsLoading(false);
  }

  function onChangeSearch(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value);
  }

  function onClickFavorite(university: UniversityType) {
    if (!user) {
      history.push('/register');
      return;
    }

    const isExists = has(`${university.name}-${university.alpha_two_code}`);

    if (isExists) {
      remove(university);
    } else {
      add(university);
    }
  }

  return (
    <Fragment>
      <section className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='flex mx-auto items-center justify-center text-center sm:mt-12'>
          <h1 className='text-xl tracking-tight font-bold text-gray-900 sm:text-2xl md:text-3xl'>
            Do you need a list of universities and their domain names?
            <span className='block text-2xl sm:text-3xl md:text-4xl text-red-400 mt-4 mb-4'>
              You found it!
            </span>
          </h1>
        </div>
      </section>
      <section className='max-w-3xl mx-auto px-2 sm:px-6 lg:px-8'>
        <div className='shadow-lg py-2 px-4 sm:px-6 flex rounded-full border-gray-200 border-solid border'>
          <span className='w-auto flex justify-end items-center text-grey'>
            <svg
              className='h-4 w-4 fill-current'
              id='Capa_1'
              x='0px'
              y='0px'
              viewBox='0 0 56.966 56.966'
            >
              <path d='M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z' />
            </svg>
          </span>
          <Input
            className='rounded mx-2 sm:mx-4'
            type='text'
            placeholder="Try 'Middle'"
            value={search}
            onChange={onChangeSearch}
          />
          <PrimaryButton
            disabled={search.length === 0}
            type='submit'
            onClick={onClickSearch}
          >
            <p className='font-semibold text-xl'>Search</p>
          </PrimaryButton>
        </div>
      </section>
      <section className='max-w-7xl mx-auto px-2 sm:px-6 py-8 sm:py-16 lg:px-8'>
        {isLoading ? (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            <Skeleton amount={4} />
          </div>
        ) : universityList.length === 0 && search.length > 0 ? (
          <p className='text-lg text-center text-gray-700'>
            The university you looking for doesn't exists!
          </p>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {universityList.map((university) => (
              <Card
                key={`${university.name}-${university.alpha_two_code}`}
                name={university.name}
                country={university.country}
                web={university.web_pages[0]}
                isFavourite={has(
                  `${university.name}-${university.alpha_two_code}`
                )}
                onClickFavorite={() => onClickFavorite(university)}
              />
            ))}
          </div>
        )}
      </section>
    </Fragment>
  );
}
export default HomePage;
