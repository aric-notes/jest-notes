import { render } from '@testing-library/react';
import { Button } from '../components/05';

test('btn should have hi text', () => {
  // 准备 Arrange

  // 执行 Act
  const { container } = render(<Button />);

  // 断言 Assert
  expect(container).toMatchSnapshot();
});