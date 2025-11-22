const queryOne = (selector) => {
  return document.querySelector(selector);
};

const queryAll = (selector) => {
  return document.querySelectorAll(selector);
};

const addEventListener = (element, event, handler) => {
  element.addEventListener(event, handler);
};

const removeEventListener = (element, event, handler) => {
  element.removeEventListener(event, handler);
};

const createElement = (tagName) => {
  return document.createElement(tagName);
};

const appendChild = (parent, child) => {
  parent.appendChild(child);
};

module.exports = {
  queryOne,
  queryAll,
  addEventListener,
  removeEventListener,
  createElement,
  appendChild,
};
