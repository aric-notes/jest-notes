import { render, screen, fireEvent } from '@testing-library/react';
import { Btn } from './03';

test('btn should have hi text', () => {
  // 准备 Arrange
  const content = 'ABC';
  const handleClick = jest.fn();
  // 执行 Act
  render(<Btn content={content} onClick={handleClick} />);
  fireEvent.click(screen.getByText('ABC'));
  // 验证 Assert
  expect(handleClick).toHaveBeenCalledTimes(1);
});