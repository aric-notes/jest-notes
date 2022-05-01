import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../components/06';


// 普通的情况
describe('btn should have diff style when diff type', () => {
  // 准备 Arrange
  const t1 = 'A';
  const t2 = 'B';
  const t3 = 'C';
  const t4 = 'D';

  // 执行 Act

  // 断言 Assert
  test('t1 will get style: primary', () => {
    render(<Button type={t1}>{t1}</Button>);
    expect(screen.getByText('Hi')).toHaveClass('eb-bg-green-500');
  });

  test('t2 will get style: primary', () => {
    render(<Button type={t2}>{t2}</Button>);
    expect(screen.getByText('Hi')).toHaveClass('eb-bg-blue-500');
  });

  test('t3 will get style: primary', () => {
    render(<Button type={t3}>{t3}</Button>);
    expect(screen.getByText('Hi')).toHaveClass('eb-bg-red-500');
  });

  test('t4 will get style: primary', () => {
    render(<Button type={t4}>{t4}</Button>);
    expect(screen.getByText('Hi')).toHaveClass('other');
  });
});


// 用 test.each 来批量测试
describe.each([
  ['A', 'eb-bg-green-500'],
  ['B', 'eb-bg-blue-500'],
  ['C', 'eb-bg-red-500'],
  ['D', 'other'],
])('array as ds: btn should have diff style when diff type', (type, className) => {
  // 准备 Arrange
  const t = type;
  const c = className;

  // 执行 Act

  // 断言 Assert
  test(`t will get style: ${c}`, () => {
    render(<Button type={t}>{t}</Button>);
    expect(screen.getByText('Hi')).toHaveClass(c);
  });
});

// test.each use object as data source
describe.each([
  { type: 'A', className: 'eb-bg-green-500' },
  { type: 'B', className: 'eb-bg-blue-500' },
  { type: 'C', className: 'eb-bg-red-500' },
  { type: 'D', className: 'other' },
])('object as ds: btn should have diff style when diff type', ({ type, className }) => {
  // 准备 Arrange
  const t = type;
  const c = className;

  // 执行 Act

  // 断言 Assert
  test(`t will get style: ${c}`, () => {
    render(<Button type={t}>{t}</Button>);
    expect(screen.getByText('Hi')).toHaveClass(c);
  });
});

// test.each use markdown string as data source
describe.each`
  type | className
  ${'A'} | ${'eb-bg-green-500'}
  ${'B'} | ${'eb-bg-blue-500'}
  ${'C'} | ${'eb-bg-red-500'}
  ${'D'} | ${'other'}
`('markdown as ds: btn should have diff style when diff type', ({ type, className }) => {
  // 准备 Arrange
  const t = type;
  const c = className;

  // 执行 Act

  // 断言 Assert
  test(`t will get style: ${c}`, () => {
    render(<Button type={t}>{t}</Button>);
    expect(screen.getByText('Hi')).toHaveClass(c);
  });
});