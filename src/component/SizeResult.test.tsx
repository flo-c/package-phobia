import React from 'react';
import { render, screen } from '@testing-library/react';
import SizeResult from './SizeResult';
import { Package } from '../../common/package.model';

test('renders empty size result', () => {
  render(<SizeResult
    package={null}
  />);
  const sizeResultElement = screen.getByTestId('empty-result');
  expect(sizeResultElement).toBeInTheDocument();
});

test('renders size result in B', () => {
  const pckg: Package = new Package('name', 'desc', 'vers');
  pckg.msize = 125;
  pckg.gsize = 26;
  render(<SizeResult
    package={pckg}
  />);
  const sizeResultMElement = screen.getByText('125.00B');
  expect(sizeResultMElement).toBeInTheDocument();
  const sizeResultGElement = screen.getByText('26.00B');
  expect(sizeResultGElement).toBeInTheDocument();
});

test('renders size result in kB', () => {
  const pckg: Package = new Package('name', 'desc', 'vers');
  pckg.msize = 2500;
  pckg.gsize = 800;
  render(<SizeResult
    package={pckg}
  />);
  const sizeResultMElement = screen.getByText('2.44kB');
  expect(sizeResultMElement).toBeInTheDocument();
  const sizeResultGElement = screen.getByText('0.78kB');
  expect(sizeResultGElement).toBeInTheDocument();
});

test('renders size result in MB', () => {
  const pckg: Package = new Package('name', 'desc', 'vers');
  pckg.msize = 2500000;
  pckg.gsize = 1200000;
  render(<SizeResult
    package={pckg}
  />);
  const sizeResultMElement = screen.getByText('2.38MB');
  expect(sizeResultMElement).toBeInTheDocument();
  const sizeResultGElement = screen.getByText('1.14MB');
  expect(sizeResultGElement).toBeInTheDocument();
});

test('renders size result in GB', () => {
  const pckg: Package = new Package('name', 'desc', 'vers');
  pckg.msize = 2500000000;
  pckg.gsize = 1200000000;
  render(<SizeResult
    package={pckg}
  />);
  const sizeResultMElement = screen.getByText('2.33GB');
  expect(sizeResultMElement).toBeInTheDocument();
  const sizeResultGElement = screen.getByText('1.12GB');
  expect(sizeResultGElement).toBeInTheDocument();
});

test('renders size result of TB in GB', () => {
  const pckg: Package = new Package('name', 'desc', 'vers');
  pckg.msize = 2500000000000;
  pckg.gsize = 1200000000000;
  render(<SizeResult
    package={pckg}
  />);
  const sizeResultMElement = screen.getByText('2328.31GB');
  expect(sizeResultMElement).toBeInTheDocument();
  const sizeResultGElement = screen.getByText('1117.59GB');
  expect(sizeResultGElement).toBeInTheDocument();
});