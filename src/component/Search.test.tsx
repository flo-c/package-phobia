import React from 'react';
import { render, screen } from '@testing-library/react';
import Search from './Search';
import { Package } from '../../common/package.model';

test('renders form input without value', () => {
  render(<Search
    searchedPackage={null}
    suggest={() => {}}
  />);
  const inputElement = screen.getByPlaceholderText(/Find package/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.attributes.getNamedItem('value')?.value).toBeUndefined();
});

test('renders form input with value', () => {
  const pckg: Package = new Package('react', 'description of react', '17.0.1');
  render(<Search
    searchedPackage={pckg}
    suggest={() => {}}
  />);
  const inputElement = screen.getByPlaceholderText(/Find package/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement.attributes.getNamedItem('value')?.value).toBe('react@17.0.1');
});