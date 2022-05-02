import { render, screen, fireEvent, renderHook } from '@testing-library/react';
import DemoCounter, { useCounter } from '../components/08';
import { act } from 'react-dom/test-utils';

test('counter hook testing', () => {
  // 准备 Arrange

  // 执行 Act
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  // 断言 Assert
  expect(result.current.count).toBe(1);
  act(() => {
    result.current.increment();
    result.current.increment();
  });
  expect(result.current.count).toBe(3);
});
