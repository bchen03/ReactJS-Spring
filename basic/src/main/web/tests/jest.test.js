// Jest test for /tests/jest.test.js using CommonJS module.exports

const jestModule = require('../jest');

describe('Jest Tests', () => {

    test('Test #1: sum(1, 2) = 3', () => {
        expect(jestModule.sum(1, 2)).toBe(3);
    });

    test('Test #2: sum_curried(1)(2) = 3', () => {
        expect(jestModule.sum_curried(1)(2)).toBe(3);
    });

});
