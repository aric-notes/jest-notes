const { sum, asyncSum } = require('../lib/sum');

describe('sum 模块', () => {
  describe('sum 函数', () => {
    test('基本加法', () => {
      expect(sum(2, 3)).toBe(5);
      expect(sum(-1, 1)).toBe(0);
    });

    test('字符串拼接', () => {
      expect(sum('2', '3')).toBe('23');
      expect(sum('hello', ' world')).toBe('hello world');
    });
  });

  describe('asyncSum 函数', () => {
    test('异步加法', async () => {
      const result = await asyncSum(2, 3);
      expect(result).toBe(5);
    });

    test('异步函数返回 Promise', () => {
      const promise = asyncSum(1, 1);
      expect(promise).toBeInstanceOf(Promise);
    });
  });
});