# Jest 学习笔记

## 📚 概述

这是一个 Jest 测试框架的学习项目，包含了三个核心模块的完整测试用例。

## 🏗️ 项目结构

```
jest-notes/
├── lib/                    # 源代码模块
│   ├── sum.js             # 数学运算模块
│   ├── dom.js             # DOM 操作模块
│   └── url.js             # URL 处理模块
├── __tests__/             # 测试文件目录
│   ├── sum.test.js        # 数学运算测试
│   ├── dom.test.js        # DOM 操作测试
│   └── url.test.js        # URL 处理测试
├── docs/
│   └── notes.md           # 本笔记文件
├── jest.config.js         # Jest 配置文件
└── package.json           # 项目配置
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 运行所有测试
npm test

# 监听模式运行测试
npm run test:watch
```

## 📝 核心概念

### 1. 测试结构

```javascript
describe('模块名', () => {
  describe('功能分组', () => {
    test('具体测试用例', () => {
      // 测试代码
      expect(结果).toBe(期望值);
    });
  });
});
```

### 2. 常用断言方法

```javascript
// 基本比较
expect(value).toBe(expected);           // 严格相等 (===)
expect(value).toEqual(expected);        // 深度相等
expect(value).toBeTruthy();             // 真值
expect(value).toBeFalsy();              // 假值

// 数组和字符串
expect(array).toHaveLength(n);          // 数组长度
expect(string).toContain(substring);    // 包含子串
expect(array).toContain(item);          // 包含元素

// 对象和类型
expect(value).toBeInstanceOf(Class);    // 实例类型
expect(object).toHaveProperty('key');   // 属性存在
expect(fn).toHaveBeenCalled();         // 函数被调用
```

### 3. 异步测试

```javascript
// async/await 方式
test('异步函数测试', async () => {
  const result = await asyncFunction();
  expect(result).toBe(expected);
});

// Promise 方式
test('Promise 测试', () => {
  return promiseFunction().then(result => {
    expect(result).toBe(expected);
  });
});
```

## 🔧 模块详解

### sum.js - 数学运算模块

#### 功能说明
- `sum(a, b)`: 基础加法运算
- `asyncSum(a, b)`: 异步加法（1秒延迟）

#### 学习要点
```javascript
// 基本测试
test('基本加法', () => {
  expect(sum(2, 3)).toBe(5);
  expect(sum(-1, 1)).toBe(0);
});

// 字符串拼接行为
test('字符串拼接', () => {
  expect(sum('2', '3')).toBe('23'); // JavaScript 的 + 操作符行为
  expect(sum('hello', ' world')).toBe('hello world');
});

// 异步测试
test('异步加法', async () => {
  const result = await asyncSum(2, 3);
  expect(result).toBe(5);
});

// 类型检查
test('异步函数返回 Promise', () => {
  const promise = asyncSum(1, 1);
  expect(promise).toBeInstanceOf(Promise);
});
```

### dom.js - DOM 操作模块

#### 功能说明
- `queryOne(selector)`: 查找单个元素
- `queryAll(selector)`: 查找多个元素
- `createElement(tagName)`: 创建元素
- `appendChild(parent, child)`: 添加子元素
- `addEventListener(element, event, handler)`: 添加事件监听
- `removeEventListener(element, event, handler)`: 移除事件监听

#### 学习要点
```javascript
// DOM 查询
test('queryOne 查找单个元素', () => {
  document.body.innerHTML = '<div id="test">内容</div>';
  const element = queryOne('#test');
  expect(element.textContent).toBe('内容');
});

// 元素创建
test('createElement 创建元素', () => {
  const div = createElement('div');
  expect(div.tagName).toBe('DIV');
});

// 事件处理
test('addEventListener 添加事件', () => {
  const button = createElement('button');
  const mockFn = jest.fn(); // Jest 提供的 mock 函数

  addEventListener(button, 'click', mockFn);
  button.click();
  expect(mockFn).toHaveBeenCalled();
});

// 综合使用
test('创建和操作 DOM 结构', () => {
  const container = createElement('div');
  container.className = 'container';

  const heading = createElement('h1');
  heading.textContent = '标题';
  appendChild(container, heading);

  appendChild(document.body, container);

  expect(queryOne('.container')).toBe(container);
  expect(queryOne('h1').textContent).toBe('标题');
});
```

### url.js - URL 处理模块

#### 功能说明
- `getParams()`: 获取所有 URL 参数
- `getParam(key)`: 获取指定参数
- `hasParam(key)`: 检查参数是否存在
- `addParam(key, value)`: 添加参数
- `removeParam(key)`: 移除参数
- `getPath()`: 获取路径
- `getHash()`: 获取哈希值
- `setHash(hash)`: 设置哈希值
- `getOrigin()`: 获取来源
- `getHost()`: 获取主机
- `isExternal(url)`: 检查是否为外部链接
- `buildUrl(path, params)`: 构建 URL

#### 学习要点
```javascript
// 参数操作
test('URL 参数操作', () => {
  // 获取参数
  expect(getParam('name')).toBe('john');
  expect(hasParam('name')).toBe(true);

  // 添加参数
  const newUrl = addParam('city', 'beijing');
  expect(newUrl).toContain('city=beijing');

  // 移除参数
  const removedUrl = removeParam('name');
  expect(removedUrl).not.toContain('name=');
});

// URL 构建
test('buildUrl 构建带参数的 URL', () => {
  const result = buildUrl('/api/users', { page: 1, limit: 10 });
  expect(result).toContain('/api/users?page=1&limit=10');
});

// Mock 测试环境
beforeEach(() => {
  Object.defineProperty(window, 'location', {
    value: mockLocation,
    writable: true,
    configurable: true,
  });
});
```

## 🛠️ Jest 配置

### jest.config.js
```javascript
/** @type {import('jest').Config} */
export default {
  testEnvironment: 'jsdom' // 使用 jsdom 环境测试 DOM 操作
};
```

### package.json
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "jest-environment-jsdom": "^29.7.0"
  }
}
```

## 📋 测试最佳实践

### 1. 测试命名
- 使用中文描述，便于理解
- 描述应该清楚表达测试的目的
- 格式：`test('功能描述', () => {})`

### 2. 测试结构
- 使用 `describe` 分组相关测试
- 使用 `beforeEach` 准备测试环境
- 每个测试应该独立，不依赖其他测试

### 3. 断言选择
- `toBe()` 用于原始值比较
- `toEqual()` 用于对象/数组比较
- `toContain()` 用于包含检查
- `toHaveBeenCalled()` 用于函数调用验证

### 4. Mock 使用
```javascript
// Mock 函数
const mockFn = jest.fn();

// Mock 返回值
mockFn.mockReturnValue('test');

// Mock 实现
mockFn.mockImplementation(() => 'custom');
```

## 🎯 学习建议

1. **从简单开始** - 先理解基本断言和测试结构
2. **实践为主** - 尝试修改和扩展现有测试
3. **关注概念** - 理解测试驱动开发(TDD)思想
4. **查阅文档** - 参考 [Jest 官方文档](https://jestjs.io/)
5. **持续练习** - 在实际项目中应用测试技巧

## 📖 延伸阅读

- [Jest 官方文档](https://jestjs.io/)
- [JavaScript 测试最佳实践](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [测试驱动开发](https://en.wikipedia.org/wiki/Test-driven_development)

---

*最后更新: 2025年*