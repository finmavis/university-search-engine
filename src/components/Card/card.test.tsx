import { render, screen, fireEvent } from '@testing-library/react';
import Card from './Card';

import faker from 'faker';

test('render Card component properly', () => {
  const handleClick = jest.fn();
  const payload = {
    name: faker.name.firstName(),
    country: faker.address.country(),
    web: faker.internet.url(),
    isFavourite: false,
    onClickFavorite: handleClick,
  };

  render(<Card {...payload} />);

  const nameElement = screen.getByText(payload.name);
  const countryElement = screen.getByText(payload.country);
  const webButton = screen.getByLabelText('like');
  expect(nameElement).toBeInTheDocument();
  expect(countryElement).toBeInTheDocument();
  expect(webButton).toBeInTheDocument();

  fireEvent.click(webButton);
  expect(handleClick).toHaveBeenCalledTimes(1);
});
