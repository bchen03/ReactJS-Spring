// Jest test for jest.js

const jestModule = require('../jest');

test('adds 1 + 2 to equal 3', () => {
    expect(jestModule.sum(1, 2)).toBe(3);
  });

  test('curried sum adding 1 + 2 to equal 3', () => {
    expect(jestModule.sum_curried(1)(2)).toBe(3);
  });

