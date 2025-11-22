const sum = (a, b) => {
  return a + b;
};

const asyncSum = async (a, b) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(a + b);
    }, 1000);
  });
};

module.exports = { sum, asyncSum };