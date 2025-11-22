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

// Mock window.location
const createMockLocation = (overrides = {}) => ({
  href: 'https://example.com/path/to/page?param1=value1&param2=value2#section1',
  origin: 'https://example.com',
  host: 'example.com',
  hostname: 'example.com',
  pathname: '/path/to/page',
  search: '?param1=value1&param2=value2',
  hash: '#section1',
  protocol: 'https:',
  port: '',
  ...overrides
});

describe('url module', () => {
  beforeEach(() => {
    // Mock window.location before each test
    const mockLocation = createMockLocation();
    Object.defineProperty(window, 'location', {
      value: mockLocation,
      writable: true,
      configurable: true,
    });
  });

  describe('getParams', () => {
    test('should return all URL parameters as object', () => {
      const params = getParams();
      expect(params).toEqual({
        param1: 'value1',
        param2: 'value2',
      });
    });

    test('should return empty object when no parameters', () => {
      window.location.search = '';
      const params = getParams();
      expect(params).toEqual({});
    });

    test('should handle empty parameter values', () => {
      window.location.search = '?param1=&param2=value2';
      const params = getParams();
      expect(params).toEqual({
        param1: '',
        param2: 'value2',
      });
    });

    test('should handle encoded values', () => {
      window.location.search = '?name=John%20Doe&city=New%20York';
      const params = getParams();
      expect(params).toEqual({
        name: 'John Doe',
        city: 'New York',
      });
    });

    test('should handle multiple values for same parameter (last one wins)', () => {
      window.location.search = '?tags=tag1&tags=tag2&tags=tag3';
      const params = getParams();
      expect(params).toEqual({
        tags: 'tag3',
      });
    });
  });

  describe('getParam', () => {
    test('should return parameter value when parameter exists', () => {
      expect(getParam('param1')).toBe('value1');
      expect(getParam('param2')).toBe('value2');
    });

    test('should return null when parameter does not exist', () => {
      expect(getParam('nonexistent')).toBeNull();
    });

    test('should return empty string for parameter with no value', () => {
      window.location.search = '?empty=&param=value';
      expect(getParam('empty')).toBe('');
    });

    test('should handle parameter names with special characters', () => {
      window.location.search = '?user-name=test&user_id=123';
      expect(getParam('user-name')).toBe('test');
      expect(getParam('user_id')).toBe('123');
    });
  });

  describe('hasParam', () => {
    test('should return true when parameter exists', () => {
      expect(hasParam('param1')).toBe(true);
      expect(hasParam('param2')).toBe(true);
    });

    test('should return false when parameter does not exist', () => {
      expect(hasParam('nonexistent')).toBe(false);
    });

    test('should return true for parameter with empty value', () => {
      window.location.search = '?empty=&param=value';
      expect(hasParam('empty')).toBe(true);
    });
  });

  describe('addParam', () => {
    test('should add new parameter to URL', () => {
      const result = addParam('newParam', 'newValue');
      expect(result).toContain('newParam=newValue');
      expect(result).toContain('param1=value1');
      expect(result).toContain('param2=value2');
    });

    test('should update existing parameter', () => {
      const result = addParam('param1', 'updatedValue');
      expect(result).toContain('param1=updatedValue');
      expect(result).toContain('param2=value2');
      expect(result).not.toContain('param1=value1');
    });

    test('should handle special characters in values', () => {
      const result = addParam('search', 'hello world');
      expect(result).toContain('search=hello+world'); // URLSearchParams uses + for spaces
    });

    test('should preserve hash fragment', () => {
      const result = addParam('param', 'value');
      expect(result).toContain('#section1');
    });

    test('should work with empty current URL parameters', () => {
      // Create a fresh mock with no search parameters
      const emptyMockLocation = createMockLocation({
        search: '',
        href: 'https://example.com/path/to/page#section1'
      });
      Object.defineProperty(window, 'location', {
        value: emptyMockLocation,
        writable: true,
        configurable: true,
      });

      const result = addParam('test', 'value');
      expect(result).toBe('https://example.com/path/to/page?test=value#section1');
    });
  });

  describe('removeParam', () => {
    test('should remove existing parameter from URL', () => {
      const result = removeParam('param1');
      expect(result).not.toContain('param1=');
      expect(result).toContain('param2=value2');
    });

    test('should return unchanged URL when parameter does not exist', () => {
      const result = removeParam('nonexistent');
      expect(result).toContain('param1=value1');
      expect(result).toContain('param2=value2');
    });

    test('should remove last parameter leaving question mark', () => {
      // Create a fresh mock with only one parameter
      const singleParamMockLocation = createMockLocation({
        search: '?onlyParam=value',
        href: 'https://example.com/path/to/page?onlyParam=value#section1'
      });
      Object.defineProperty(window, 'location', {
        value: singleParamMockLocation,
        writable: true,
        configurable: true,
      });

      const result = removeParam('onlyParam');
      expect(result).toBe('https://example.com/path/to/page#section1');
    });

    test('should preserve hash fragment', () => {
      const result = removeParam('param1');
      expect(result).toContain('#section1');
    });
  });

  describe('getPath', () => {
    test('should return the current path', () => {
      expect(getPath()).toBe('/path/to/page');
    });

    test('should handle root path', () => {
      // Create a fresh mock with root path
      const rootPathMockLocation = createMockLocation({ pathname: '/' });
      Object.defineProperty(window, 'location', {
        value: rootPathMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getPath()).toBe('/');
    });

    test('should handle path with query parameters and hash', () => {
      // Create a fresh mock with different pathname
      const searchPathMockLocation = createMockLocation({ pathname: '/search/results' });
      Object.defineProperty(window, 'location', {
        value: searchPathMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getPath()).toBe('/search/results');
    });
  });

  describe('getHash', () => {
    test('should return the current hash including #', () => {
      expect(getHash()).toBe('#section1');
    });

    test('should return empty string when no hash', () => {
      window.location.hash = '';
      expect(getHash()).toBe('');
    });

    test('should return hash with special characters', () => {
      window.location.hash = '#section-with-dashes_and_underscores';
      expect(getHash()).toBe('#section-with-dashes_and_underscores');
    });
  });

  describe('setHash', () => {
    test('should set hash when provided without #', () => {
      setHash('newsection');
      expect(window.location.hash).toBe('#newsection');
    });

    test('should set hash when provided with #', () => {
      setHash('#another-section');
      expect(window.location.hash).toBe('#another-section');
    });

    test('should clear hash when provided empty string', () => {
      setHash('');
      expect(window.location.hash).toBe('');
    });

    test('should handle hash with special characters', () => {
      setHash('section with spaces');
      expect(window.location.hash).toBe('#section with spaces');
    });
  });

  describe('getOrigin', () => {
    test('should return the current origin', () => {
      expect(getOrigin()).toBe('https://example.com');
    });

    test('should work with different origins', () => {
      // Create a fresh mock with different origin
      const localOriginMockLocation = createMockLocation({ origin: 'http://localhost:3000' });
      Object.defineProperty(window, 'location', {
        value: localOriginMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getOrigin()).toBe('http://localhost:3000');
    });

    test('should work with port numbers', () => {
      // Create a fresh mock with port number
      const portMockLocation = createMockLocation({ origin: 'https://example.com:8080' });
      Object.defineProperty(window, 'location', {
        value: portMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getOrigin()).toBe('https://example.com:8080');
    });
  });

  describe('getHost', () => {
    test('should return the current host', () => {
      expect(getHost()).toBe('example.com');
    });

    test('should work with port numbers', () => {
      // Create a fresh mock with port number in host
      const portHostMockLocation = createMockLocation({ host: 'localhost:3000' });
      Object.defineProperty(window, 'location', {
        value: portHostMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getHost()).toBe('localhost:3000');
    });

    test('should work with subdomains', () => {
      // Create a fresh mock with subdomain
      const subdomainMockLocation = createMockLocation({ host: 'api.example.com' });
      Object.defineProperty(window, 'location', {
        value: subdomainMockLocation,
        writable: true,
        configurable: true,
      });
      expect(getHost()).toBe('api.example.com');
    });
  });

  describe('isExternal', () => {
    test('should return true for external URLs', () => {
      expect(isExternal('https://external.com')).toBe(true);
      expect(isExternal('http://other-site.org')).toBe(true);
    });

    test('should return false for internal URLs', () => {
      // Mock URL has origin 'https://example.com'
      // URLs with the same origin are considered internal
      expect(isExternal('https://example.com')).toBe(false);
      expect(isExternal('https://example.com/path')).toBe(false);
      expect(isExternal('/relative/path')).toBe(false);  // Relative paths are internal
      expect(isExternal('./relative')).toBe(false);
    });

    test('should return false for relative URLs', () => {
      expect(isExternal('/relative/path')).toBe(false);
      expect(isExternal('./relative')).toBe(false);
    });

    test('should return false for empty or invalid URLs', () => {
      expect(isExternal('')).toBe(false);
      expect(isExternal(null)).toBe(false);
      expect(isExternal(undefined)).toBe(false);
      expect(isExternal('not-a-url')).toBe(false);
    });

    test('should handle different origins', () => {
      window.location.origin = 'http://localhost:3000';
      expect(isExternal('http://localhost:3000/api')).toBe(false);
      expect(isExternal('https://api.example.com')).toBe(true);
    });
  });

  describe('buildUrl', () => {
    test('should build URL with parameters', () => {
      const result = buildUrl('/api/users', { page: 1, limit: 10 });
      expect(result).toContain('/api/users?page=1&limit=10');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/api\/users\?page=1&limit=10$/);
    });

    test('should build URL with string values', () => {
      const result = buildUrl('/search', { q: 'javascript', type: 'tutorial' });
      expect(result).toContain('/search?q=javascript&type=tutorial');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/search\?q=javascript&type=tutorial$/);
    });

    test('should handle special characters in parameters', () => {
      const result = buildUrl('/search', { query: 'hello world' });
      expect(result).toContain('/search?query=hello+world'); // URLSearchParams uses + for spaces
      expect(result).toMatch(/^https?:\/\/[^\/]+\/search\?query=hello\+world$/);
    });

    test('should ignore null and undefined values', () => {
      const result = buildUrl('/api', {
        param1: 'value1',
        param2: null,
        param3: undefined,
        param4: 'value4'
      });
      expect(result).toContain('/api?param1=value1&param4=value4');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/api\?param1=value1&param4=value4$/);
    });

    test('should handle empty parameters object', () => {
      const result = buildUrl('/path', {});
      expect(result).toContain('/path');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/path$/);
    });

    test('should convert numbers to strings', () => {
      const result = buildUrl('/api', { id: 123, count: 0 });
      expect(result).toContain('/api?id=123&count=0');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/api\?id=123&count=0$/);
    });

    test('should handle boolean values', () => {
      const result = buildUrl('/api', { active: true, deleted: false });
      expect(result).toContain('/api?active=true&deleted=false');
      expect(result).toMatch(/^https?:\/\/[^\/]+\/api\?active=true&deleted=false$/);
    });

    test('should work with absolute paths', () => {
      const result = buildUrl('https://api.example.com/v1/users', { page: 1 });
      expect(result).toBe('https://api.example.com/v1/users?page=1');
    });
  });

  describe('integration tests', () => {
    test('should work with complex URL manipulation scenario', () => {
      // Start with initial URL - check that our mock is working
      const params = getParams();
      expect(params).toEqual(expect.objectContaining({
        param1: 'value1',
        param2: 'value2'
      }));

      // Add a new parameter
      const urlWithNewParam = addParam('search', 'test query');
      expect(urlWithNewParam).toContain('search=test+query'); // URLSearchParams uses + for spaces

      // Check parameter existence
      expect(hasParam('search')).toBe(false); // Original URL unchanged

      // Build URL with parameters
      const builtUrl = buildUrl('/api/data', {
        format: 'json',
        include: 'details',
        page: 2
      });
      expect(builtUrl).toContain('format=json');
      expect(builtUrl).toContain('include=details');
      expect(builtUrl).toContain('page=2');

      // Test external URL detection
      expect(isExternal('https://api.example.com')).toBe(true);
      expect(isExternal('/relative/path')).toBe(false);
    });

    test('should handle edge case with all URL functions', () => {
      // Test path and hash
      expect(getPath()).toBe('/path/to/page'); // From our mock
      expect(getHash()).toBe('#section1'); // From our mock

      // Set new hash
      setHash('new-hash');
      expect(getHash()).toBe('#new-hash');

      // Test origin and host
      expect(getOrigin()).toBe('https://example.com'); // From our mock
      expect(getHost()).toBe('example.com'); // From our mock
    });
  });
});