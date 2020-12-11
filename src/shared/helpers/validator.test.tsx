import { isValidEmail } from './validator';

test('should return valid with correct email address', () => {
  expect(isValidEmail('a@a.com')).toBe(true);
  expect(isValidEmail('sad2@example.com')).toBe(true);
  expect(isValidEmail('sad2@edu.tech')).toBe(true);
  expect(isValidEmail('.com@sacjsancjsa.com')).toBe(true);
});

test('should return invalid with incorrect email address', () => {
  expect(isValidEmail('sda78dsa8iugsa8gc7')).toBe(false);
  expect(isValidEmail('@@@@.com')).toBe(false);
  expect(isValidEmail('1234323-3217csahc-sa89cs9a')).toBe(false);
  expect(isValidEmail('https://scajncjsa489.com@csacs')).toBe(false);
});
