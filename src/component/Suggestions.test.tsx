import React from 'react';
import { render, screen } from '@testing-library/react';
import Suggestions from './Suggestions';
import { Package } from '../../common/package.model';

test('renders empty suggestions', () => {
  render(<Suggestions
    suggestions={[]}
    select={() => {}}
  />);
  const suggestionElement = screen.getByTestId('hidden-suggestions');
  expect(suggestionElement).toBeInTheDocument();
});

test('renders suggestions', () => {
  const pckg1: Package = new Package('sugg1', 'suggdesc1', 'suggvers1');
  const pckg2: Package = new Package('sugg2', 'suggdesc2', 'suggvers2');
  const pckg3: Package = new Package('sugg3', 'suggdesc3', 'suggvers3');
  render(<Suggestions
    suggestions={[pckg1, pckg2, pckg3]}
    select={() => {}}
  />);

  const suggElm1A = screen.getByText('sugg1');
  expect(suggElm1A).toBeInTheDocument();
  expect(suggElm1A.tagName).toBe('H5');
  const suggElm1B = screen.getByText('suggdesc1');
  expect(suggElm1B).toBeInTheDocument();
  expect(suggElm1B.tagName).toBe('P');
  const suggElm1C = screen.getByText('suggvers1');
  expect(suggElm1C).toBeInTheDocument();
  expect(suggElm1C.tagName).toBe('SMALL');

  const suggElm2A = screen.getByText('sugg2');
  expect(suggElm2A).toBeInTheDocument();
  expect(suggElm2A.tagName).toBe('H5');
  const suggElm2B = screen.getByText('suggdesc2');
  expect(suggElm2B).toBeInTheDocument();
  expect(suggElm2B.tagName).toBe('P');
  const suggElm2C = screen.getByText('suggvers2');
  expect(suggElm2C).toBeInTheDocument();
  expect(suggElm2C.tagName).toBe('SMALL');

  const suggElm3A = screen.getByText('sugg3');
  expect(suggElm3A).toBeInTheDocument();
  expect(suggElm3A.tagName).toBe('H5');
  const suggElm3B = screen.getByText('suggdesc3');
  expect(suggElm3B).toBeInTheDocument();
  expect(suggElm3B.tagName).toBe('P');
  const suggElm3C = screen.getByText('suggvers3');
  expect(suggElm3C).toBeInTheDocument();
  expect(suggElm3C.tagName).toBe('SMALL');

});