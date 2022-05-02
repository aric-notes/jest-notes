import { screen, render } from '@testing-library/react';
import Trade from '../components/09/Trade';


test('<Trade />', () => {
  // Arrange
  // randomMock = jest.spyOn(global.Math, "random");
  jest.spyOn(global.Math, 'random').mockReturnValue(0.1);
  // jest.spyOn(global.Math, 'floor')

  // Act
  render(<Trade wood={50} />);

  // Assert
  // 😱
  // expect(screen.getByText(/賣完，得到 \$ 7000/i)).toBeInTheDocument();
  expect(screen.getByTestId('sell').textContent).toBe('賣完，得到 $7000');

});