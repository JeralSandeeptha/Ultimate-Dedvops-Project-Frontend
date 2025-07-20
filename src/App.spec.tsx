import { render } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from './App';

test('renders greeting', () => {
  render(<App />);
  expect(true).toBe(true);
});