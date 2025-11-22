const { sum, asyncSum } = require('../lib/sum');

describe('sum module', () => {
  describe('sum', () => {
    test('should add two positive numbers', () => {
      expect(sum(2, 3)).toBe(5);
      expect(sum(10, 20)).toBe(30);
    });

    test('should add two negative numbers', () => {
      expect(sum(-2, -3)).toBe(-5);
      expect(sum(-10, -20)).toBe(-30);
    });

    test('should add positive and negative numbers', () => {
      expect(sum(5, -3)).toBe(2);
      expect(sum(-5, 3)).toBe(-2);
    });

    test('should handle zero', () => {
      expect(sum(0, 0)).toBe(0);
      expect(sum(0, 5)).toBe(5);
      expect(sum(5, 0)).toBe(5);
    });

    test('should handle floating point numbers', () => {
      expect(sum(1.5, 2.5)).toBe(4);
      expect(sum(-1.5, 2.5)).toBe(1);
    });

    test('should handle decimal numbers', () => {
      expect(sum(0.1, 0.2)).toBeCloseTo(0.3);
    });

    test('should handle very large numbers', () => {
      expect(sum(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
    });

    test('should handle string concatenation', () => {
      expect(sum('2', '3')).toBe('23'); // JavaScript concatenates strings
      expect(sum('hello', ' world')).toBe('hello world');
    });

    test('should handle undefined inputs', () => {
      expect(sum(undefined, 5)).toBeNaN();
      expect(sum(5, undefined)).toBeNaN();
      expect(sum(undefined, undefined)).toBeNaN();
    });
  });

  describe('asyncSum', () => {
    test('should add two positive numbers asynchronously', async () => {
      const result = await asyncSum(2, 3);
      expect(result).toBe(5);
    });

    test('should add two negative numbers asynchronously', async () => {
      const result = await asyncSum(-2, -3);
      expect(result).toBe(-5);
    });

    test('should add positive and negative numbers asynchronously', async () => {
      const result = await asyncSum(5, -3);
      expect(result).toBe(2);
    });

    test('should handle zero asynchronously', async () => {
      const result = await asyncSum(0, 5);
      expect(result).toBe(5);
    });

    test('should handle floating point numbers asynchronously', async () => {
      const result = await asyncSum(1.5, 2.5);
      expect(result).toBe(4);
    });

    test('should return a Promise', () => {
      const promise = asyncSum(2, 3);
      expect(promise).toBeInstanceOf(Promise);
    });

    test('should resolve within reasonable time', async () => {
      const startTime = Date.now();
      await asyncSum(2, 3);
      const endTime = Date.now();
      expect(endTime - startTime).toBeGreaterThanOrEqual(1000);
      expect(endTime - startTime).toBeLessThan(1200); // Allow some buffer
    });

    test('should handle multiple concurrent calls', async () => {
      const promises = [
        asyncSum(1, 2),
        asyncSum(3, 4),
        asyncSum(5, 6)
      ];
      const results = await Promise.all(promises);
      expect(results).toEqual([3, 7, 11]);
    });
  });
});