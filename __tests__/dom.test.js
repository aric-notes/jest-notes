const {
  queryOne,
  queryAll,
  addEventListener,
  removeEventListener,
  createElement,
  appendChild,
} = require('../lib/dom');

describe('dom module', () => {
  beforeEach(() => {
    // Clean up DOM before each test
    document.body.innerHTML = '';
  });

  describe('queryOne', () => {
    test('should return null when no matching element exists', () => {
      expect(queryOne('#nonexistent')).toBeNull();
      expect(queryOne('.nonexistent')).toBeNull();
      expect(queryOne('div.nonexistent')).toBeNull();
    });

    test('should return the first matching element', () => {
      document.body.innerHTML = `
        <div class="test">First</div>
        <div class="test">Second</div>
        <div class="other">Other</div>
      `;

      const element = queryOne('.test');
      expect(element).not.toBeNull();
      expect(element.textContent).toBe('First');
      expect(element.className).toBe('test');
    });

    test('should handle ID selectors', () => {
      document.body.innerHTML = `
        <div id="unique">Content</div>
        <div>Other</div>
      `;

      const element = queryOne('#unique');
      expect(element).not.toBeNull();
      expect(element.textContent).toBe('Content');
    });

    test('should handle tag selectors', () => {
      document.body.innerHTML = `
        <p>Paragraph 1</p>
        <span>Span</span>
        <p>Paragraph 2</p>
      `;

      const element = queryOne('p');
      expect(element).not.toBeNull();
      expect(element.textContent).toBe('Paragraph 1');
    });

    test('should handle complex selectors', () => {
      document.body.innerHTML = `
        <div class="container">
          <span class="item">Item 1</span>
          <span class="item special">Item 2</span>
        </div>
      `;

      const element = queryOne('.container .special');
      expect(element).not.toBeNull();
      expect(element.textContent).toBe('Item 2');
    });
  });

  describe('queryAll', () => {
    test('should return empty NodeList when no matching elements exist', () => {
      const result = queryAll('.nonexistent');
      expect(result).toHaveLength(0);
    });

    test('should return all matching elements', () => {
      document.body.innerHTML = `
        <div class="item">Item 1</div>
        <div class="item">Item 2</div>
        <div class="item">Item 3</div>
        <div class="other">Other</div>
      `;

      const elements = queryAll('.item');
      expect(elements).toHaveLength(3);
      expect(elements[0].textContent).toBe('Item 1');
      expect(elements[1].textContent).toBe('Item 2');
      expect(elements[2].textContent).toBe('Item 3');
    });

    test('should return NodeList that can be converted to array', () => {
      document.body.innerHTML = `
        <span>1</span>
        <span>2</span>
        <span>3</span>
      `;

      const elements = queryAll('span');
      const array = Array.from(elements);
      expect(array).toHaveLength(3);
      expect(array.map(el => el.textContent)).toEqual(['1', '2', '3']);
    });
  });

  describe('addEventListener', () => {
    test('should add event listener to element', () => {
      const button = document.createElement('button');
      const mockHandler = jest.fn();

      addEventListener(button, 'click', mockHandler);

      button.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test('should work with different event types', () => {
      const input = document.createElement('input');
      const mockHandler = jest.fn();

      addEventListener(input, 'input', mockHandler);

      input.value = 'test';
      input.dispatchEvent(new Event('input'));

      expect(mockHandler).toHaveBeenCalledTimes(1);
    });

    test('should handle event object passed to handler', () => {
      const button = document.createElement('button');
      const mockHandler = jest.fn();

      addEventListener(button, 'click', mockHandler);

      button.click();
      expect(mockHandler).toHaveBeenCalledWith(expect.any(Event));
    });
  });

  describe('removeEventListener', () => {
    test('should remove event listener from element', () => {
      const button = document.createElement('button');
      const mockHandler = jest.fn();

      addEventListener(button, 'click', mockHandler);
      button.click();
      expect(mockHandler).toHaveBeenCalledTimes(1);

      removeEventListener(button, 'click', mockHandler);
      button.click();
      expect(mockHandler).toHaveBeenCalledTimes(1); // Should not increase
    });

    test('should handle removing non-existent listener gracefully', () => {
      const button = document.createElement('button');
      const mockHandler = jest.fn();

      expect(() => {
        removeEventListener(button, 'click', mockHandler);
      }).not.toThrow();
    });
  });

  describe('createElement', () => {
    test('should create element with valid tag name', () => {
      const div = createElement('div');
      expect(div.tagName).toBe('DIV');
      expect(div.nodeType).toBe(Node.ELEMENT_NODE);
    });

    test('should create different types of elements', () => {
      const button = createElement('button');
      const input = createElement('input');
      const span = createElement('span');

      expect(button.tagName).toBe('BUTTON');
      expect(input.tagName).toBe('INPUT');
      expect(span.tagName).toBe('SPAN');
    });

    test('should create elements that can be manipulated', () => {
      const div = createElement('div');
      div.textContent = 'Hello World';
      div.className = 'test-class';

      expect(div.textContent).toBe('Hello World');
      expect(div.className).toBe('test-class');
    });
  });

  describe('appendChild', () => {
    test('should append child to parent', () => {
      const parent = createElement('div');
      const child = createElement('span');
      child.textContent = 'Child content';

      appendChild(parent, child);

      expect(parent.children).toHaveLength(1);
      expect(parent.firstChild).toBe(child);
      expect(child.parentElement).toBe(parent);
      expect(parent.innerHTML).toBe('<span>Child content</span>');
    });

    test('should append multiple children', () => {
      const parent = createElement('ul');
      const child1 = createElement('li');
      const child2 = createElement('li');
      const child3 = createElement('li');

      child1.textContent = 'Item 1';
      child2.textContent = 'Item 2';
      child3.textContent = 'Item 3';

      appendChild(parent, child1);
      appendChild(parent, child2);
      appendChild(parent, child3);

      expect(parent.children).toHaveLength(3);
      expect(Array.from(parent.children).map(el => el.textContent))
        .toEqual(['Item 1', 'Item 2', 'Item 3']);
    });

    test('should handle nested structures', () => {
      const container = createElement('div');
      const wrapper = createElement('div');
      const text = createElement('p');

      text.textContent = 'Nested text';
      appendChild(wrapper, text);
      appendChild(container, wrapper);

      expect(container.querySelector('p')).toBe(text);
      expect(container.innerHTML).toBe('<div><p>Nested text</p></div>');
    });
  });

  describe('integration tests', () => {
    test('should create and manipulate DOM structure', () => {
      // Create a complete DOM structure
      const container = createElement('div');
      container.className = 'container';

      const heading = createElement('h1');
      heading.textContent = 'Test Page';
      appendChild(container, heading);

      const list = createElement('ul');
      list.className = 'items';

      for (let i = 1; i <= 3; i++) {
        const item = createElement('li');
        item.textContent = `Item ${i}`;
        item.className = 'item';
        appendChild(list, item);
      }

      appendChild(container, list);

      // Add event listener to items
      const mockHandler = jest.fn();
      const items = queryAll('.item');
      items.forEach(item => {
        addEventListener(item, 'click', mockHandler);
      });

      // Append to document body for testing
      appendChild(document.body, container);

      // Test the structure
      expect(queryOne('.container')).toBe(container);
      expect(queryAll('.item')).toHaveLength(3);
      expect(queryOne('h1').textContent).toBe('Test Page');

      // Test event handling - convert NodeList to array and click first item
      const itemsArray = Array.from(items);
      if (itemsArray.length > 0) {
        itemsArray[0].click();
        expect(mockHandler).toHaveBeenCalledTimes(1);

        // Remove event listener
        removeEventListener(itemsArray[0], 'click', mockHandler);
        itemsArray[0].click();
        expect(mockHandler).toHaveBeenCalledTimes(1); // Should not increase
      }
    });
  });
});