import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './04';
import { act } from 'react-dom/test-utils';

test('btn should have hi text', () => {
  // 准备 Arrange
  jest.useFakeTimers();

  // 执行 Act
  render(<Button />);
  fireEvent.click(screen.getByText('你好'));

  // 验证 Assert
  expect(screen.getByText('你好')).toBeDisabled();
  act(() => {
    // 等所有的 timer 运行完
    // jest.runAllTimers();
    // 精确运行3s
    jest.advanceTimersByTime(3000);
  });
  expect(screen.getByText('你好')).toBeEnabled();
});