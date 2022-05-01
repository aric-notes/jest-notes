import { render, screen } from '@testing-library/react';
import { BtnProps } from './btn-props';

test('btn should have hi text', () => {
  // 准备 content
  const content = 'ABC';
  // 执行 render
  render(<BtnProps content={content} />);
  // 验证
  expect(screen.getByText(content)).toBeInTheDocument();
});