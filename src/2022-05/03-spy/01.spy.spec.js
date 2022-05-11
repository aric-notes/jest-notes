const fs = require('fs');

jest.spyOn(fs, 'readFileSync');

test('should read the file', () => {
  fs.readFileSync.mockImplementation((filename) => 'Hello World');

  const result = fs.readFileSync('./01.spy');
  expect(result).toBe('Hello World');
  expect(fs.readFileSync.mock.calls.length).toBe(1);
  expect(fs.readFileSync.mock.calls[0][0]).toBe('./01.spy');
});

//npx jest ./src/2022-05/03-spy/01.spy.spec.js