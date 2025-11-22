const {
  queryOne,
  queryAll,
  addEventListener,
  removeEventListener,
  createElement,
  appendChild,
} = require('../lib/dom');

describe('dom 模块', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  describe('DOM 查询', () => {
    test('queryOne 查找单个元素', () => {
      document.body.innerHTML = '<div id="test">内容</div>';
      const element = queryOne('#test');
      expect(element.textContent).toBe('内容');
    });

    test('queryAll 查找多个元素', () => {
      document.body.innerHTML = '<div class="item">1</div><div class="item">2</div>';
      const elements = queryAll('.item');
      expect(elements).toHaveLength(2);
    });
  });

  describe('DOM 操作', () => {
    test('createElement 创建元素', () => {
      const div = createElement('div');
      expect(div.tagName).toBe('DIV');
    });

    test('appendChild 添加子元素', () => {
      const parent = createElement('div');
      const child = createElement('span');
      child.textContent = '子元素';
      appendChild(parent, child);
      expect(parent.innerHTML).toBe('<span>子元素</span>');
    });
  });

  describe('事件处理', () => {
    test('addEventListener 添加事件', () => {
      const button = createElement('button');
      const mockFn = jest.fn();
      addEventListener(button, 'click', mockFn);
      button.click();
      expect(mockFn).toHaveBeenCalled();
    });

    test('removeEventListener 移除事件', () => {
      const button = createElement('button');
      const mockFn = jest.fn();
      addEventListener(button, 'click', mockFn);
      removeEventListener(button, 'click', mockFn);
      button.click();
      expect(mockFn).not.toHaveBeenCalled();
    });
  });

  describe('综合使用', () => {
    test('创建和操作 DOM 结构', () => {
      // 创建容器
      const container = createElement('div');
      container.className = 'container';

      // 创建标题
      const heading = createElement('h1');
      heading.textContent = '标题';
      appendChild(container, heading);

      // 添加到文档
      appendChild(document.body, container);

      // 测试结果
      expect(queryOne('.container')).toBe(container);
      expect(queryOne('h1').textContent).toBe('标题');
    });
  });
});