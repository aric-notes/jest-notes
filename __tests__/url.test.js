const {
  getParams,
  getParam,
  hasParam,
  addParam,
  removeParam,
  getPath,
  getHash,
  setHash,
  getOrigin,
  getHost,
  isExternal,
  buildUrl,
} = require('../lib/url');

// 简化的 window.location 模拟
const mockLocation = {
  href: 'https://example.com/path?name=john&age=25#section',
  origin: 'https://example.com',
  host: 'example.com',
  pathname: '/path',
  search: '?name=john&age=25',
  hash: '#section'
};

describe('url 模块', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true,
    });
  });

  describe('URL 参数', () => {
    test('getParams 获取所有参数', () => {
      const params = getParams();
      expect(params).toEqual({ name: 'john', age: '25' });
    });

    test('getParam 获取单个参数', () => {
      expect(getParam('name')).toBe('john');
      expect(getParam('age')).toBe('25');
      expect(getParam('missing')).toBeNull();
    });

    test('hasParam 检查参数是否存在', () => {
      expect(hasParam('name')).toBe(true);
      expect(hasParam('missing')).toBe(false);
    });

    test('addParam 添加参数', () => {
      const result = addParam('city', 'beijing');
      expect(result).toContain('city=beijing');
    });

    test('removeParam 移除参数', () => {
      const result = removeParam('name');
      expect(result).not.toContain('name=');
    });
  });

  describe('URL 路径和哈希', () => {
    test('getPath 获取路径', () => {
      expect(getPath()).toBe('/path');
    });

    test('getHash 获取哈希', () => {
      expect(getHash()).toBe('#section');
    });

    test('setHash 设置哈希', () => {
      setHash('new-section');
      expect(getHash()).toBe('#new-section');
    });
  });

  describe('URL 来源', () => {
    test('getOrigin 获取来源', () => {
      expect(getOrigin()).toBe('https://example.com');
    });

    test('getHost 获取主机', () => {
      expect(getHost()).toBe('example.com');
    });

    test('isExternal 检查外部链接', () => {
      expect(isExternal('https://external.com')).toBe(true);
      expect(isExternal('/relative/path')).toBe(false);
      expect(isExternal('')).toBe(false);
    });
  });

  describe('URL 构建', () => {
    test('buildUrl 构建带参数的 URL', () => {
      const result = buildUrl('/api/users', { page: 1, limit: 10 });
      expect(result).toContain('/api/users?page=1&limit=10');
    });

    test('buildUrl 处理空参数', () => {
      const result = buildUrl('/api', {});
      expect(result).toContain('/api');
    });
  });

  describe('综合示例', () => {
    test('URL 操作完整流程', () => {
      // 获取当前参数
      expect(getParam('name')).toBe('john');

      // 添加新参数
      const newUrl = addParam('role', 'admin');
      expect(newUrl).toContain('role=admin');

      // 检查是否为外部链接
      expect(isExternal('https://other-site.com')).toBe(true);
    });
  });
});