import { UniversityType, useFavourite } from 'shared/stores/favourite.store';

import Card from 'components/Card/Card';

function Favourites(): JSX.Element {
  const { favourites, size, has, remove, add } = useFavourite();

  function onClickFavorite(university: UniversityType) {
    const isExists = has(`${university.name}-${university.alpha_two_code}`);

    if (isExists) {
      remove(university);
    } else {
      add(university);
    }
  }

  return (
    <section className='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
      <h2 className='text-center text-2xl font-bold mt-8 mb-4'>
        Your favorite university
      </h2>
      <div>
        {size === 0 ? (
          <p className='text-center text-base'>
            You dont have any favorite university
          </p>
        ) : (
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {Object.entries(favourites).map(([key, university]) => (
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
      </div>
    </section>
  );
}
export default Favourites;
