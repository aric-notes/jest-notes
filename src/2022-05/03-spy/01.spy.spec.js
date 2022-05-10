const fs = require('fs');

jest.spyOn(fs, 'readFileSync');

test('should read the file', () => {
  fs.readFileSync.mockImplementation((filename) => 'Hello World');

  const result = fs.readFileSync('./01.spy');
  expect(result).toBe('Hello World');
});

//npx jest ./src/2022-05/03-spy/01.spy.spec.js