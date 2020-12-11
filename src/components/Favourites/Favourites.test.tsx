import faker from 'faker';
import { render, screen } from '@testing-library/react';

import { useFavourite } from 'shared/stores/favourite.store';

import Favourites from './Favourites';

jest.mock('shared/stores/favourite.store');

afterEach(() => {
  jest.clearAllMocks();
});

test('Render <Favourites /> properly if there are no favourites', () => {
  (useFavourite as jest.Mock).mockImplementation(() => {
    return {
      favourites: {},
      size: 0,
      has: jest.fn().mockReturnValue(false),
      remove: jest.fn(),
      add: jest.fn(),
    };
  });

  render(<Favourites />);

  const noFavouriteElement = screen.getByText(
    /you dont have any favorite university/i
  );
  expect(noFavouriteElement).toBeInTheDocument();
});

test('Render <Favourites /> properly if user have favourites university', () => {
  const favourite = {
    alpha_two_code: faker.address.countryCode(),
    country: faker.address.country(),
    'state-province': null,
    domains: [faker.internet.domainName()],
    name: faker.name.firstName(),
    web_pages: [faker.internet.url()],
  };
  (useFavourite as jest.Mock).mockImplementation(() => {
    return {
      favourites: {
        key: favourite,
      },
      size: 1,
      has: jest.fn().mockReturnValue(true),
      remove: jest.fn(),
      add: jest.fn(),
    };
  });

  render(<Favourites />);

  expect(useFavourite).toHaveBeenCalledTimes(1);
  const noFavouriteElement = screen.queryByText(
    /You dont have any favorite university/i
  );
  const nameElement = screen.getByText(favourite.name);
  const countryElement = screen.getByText(favourite.country);
  const webElement = screen.getByText(/web/i);
  const favouriteButton = screen.getByLabelText(/like/i);

  expect(noFavouriteElement).not.toBeInTheDocument();
  expect(nameElement).toBeInTheDocument();
  expect(countryElement).toBeInTheDocument();
  expect(webElement).toBeInTheDocument();
  expect(webElement).toHaveAttribute('href', favourite.web_pages[0]);
  expect(favouriteButton).toBeInTheDocument();
});
