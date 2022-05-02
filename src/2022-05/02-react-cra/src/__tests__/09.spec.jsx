import { screen, render } from '@testing-library/react';
import Demo from '../components/09';



test('Demo', () => {
  // Arrange
  jest.mock('../components/09/Trade', () => () => 'FakeTradeComponent123');

  // Act
  render(<Demo />);

  // Assert
  expect(
    screen.getByRole('heading', {
      name: /100個木頭可以做什麼？/i,
    }),
  ).toBeInTheDocument();

  expect(screen.getByText(/FakeTradeComponent/i)).toBeInTheDocument();

  expect(
    screen.getByRole('heading', {
      name: /50個木頭拿去裝飾/i,
    }),
  ).toBeInTheDocument();
  expect(screen.getByText(/拿去裝飾小花園的圍籬/i)).toBeInTheDocument();
});
