import { render } from '@testing-library/react';
import Trade from '../components/09/Trade';


test('<Trade />', () => {
  // Arrange
  // randomMock = jest.spyOn(global.Math, "random");
  jest.spyOn(global.Math, 'random').mockReturnValue(0.1);

  const { container } = render(<Trade wood={50} />);

  expect(container).toMatchSnapshot()

});