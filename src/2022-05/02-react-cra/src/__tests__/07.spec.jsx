// src/setupTests.js
// eslint-disable-next-line jest/no-mocks-import
import { server } from '../__mocks__/server.js';
import { Button } from '../components/07';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());


test('api sucess, will get item1/2/3', async () => {
  //  https://api.uomg.com/api
  render(<Button />);
  userEvent.click(screen.getByText('請按'));
  expect(screen.getByText('Loading........')).toBeInTheDocument();
  await waitFor(() => expect(screen.getByText('item1')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('item2')).toBeInTheDocument());
  await waitFor(() => expect(screen.getByText('item3')).toBeInTheDocument());
});

test.only('api failed', async () => {
  // mock server error
  server.use(
    rest.get('http://my-backend/fake-data', (req, res, ctx) => {
      return res(ctx.status(500), ctx.json('ERROR_MSG'));
    }),
  );
  render(<Button />);
  userEvent.click(screen.getByText('請按'));
  // await waitFor(() => expect(screen.getByText('ERROR_MSG')).toBeInTheDocument());
  //   screen.debug();
  expect(await screen.findByText('ERROR_MSG')).toBeInTheDocument();
});