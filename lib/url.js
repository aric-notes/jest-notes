const getParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

const getParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

const hasParam = (key) => {
  const params = new URLSearchParams(window.location.search);
  return params.has(key);
};

const addParam = (key, value) => {
  const url = new URL(window.location.href);
  url.searchParams.set(key, value);
  return url.toString();
};

const removeParam = (key) => {
  const url = new URL(window.location.href);
  url.searchParams.delete(key);
  return url.toString();
};

const getPath = () => {
  return window.location.pathname;
};

const getHash = () => {
  return window.location.hash;
};

const setHash = (hash) => {
  window.location.hash = hash === '' ? '' : (hash.startsWith('#') ? hash : `#${hash}`);
};

const getOrigin = () => {
  return window.location.origin;
};

const getHost = () => {
  return window.location.host;
};

const isExternal = (url) => {
  if (!url) return false;
  try {
    const urlObj = new URL(url);
    return urlObj.origin !== window.location.origin;
  } catch {
    return false;
  }
};

const buildUrl = (path, params = {}) => {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      url.searchParams.set(key, String(value));
    }
  });
  return url.toString();
};

export {
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
};