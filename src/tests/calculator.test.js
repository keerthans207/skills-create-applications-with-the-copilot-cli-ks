const { compute } = require('../calculator');

describe('Calculator basic operations', () => {
  test('2 + 3 = 5', () => {
    expect(compute('2', '+', '3')).toBe(5);
  });

  test('10 - 4 = 6', () => {
    expect(compute('10', '-', '4')).toBe(6);
  });

  test('45 * 2 = 90', () => {
    expect(compute('45', '*', '2')).toBe(90);
  });

  test('20 / 5 = 4', () => {
    expect(compute('20', '/', '5')).toBe(4);
  });
});

describe('Calculator operator variants and edge cases', () => {
  test('multiplication with x and X', () => {
    expect(compute('6', 'x', '7')).toBe(42);
    expect(compute('6', 'X', '7')).toBe(42);
  });

  test('division with ÷ symbol', () => {
    expect(compute('9', '÷', '3')).toBe(3);
  });

  test('decimal numbers', () => {
    expect(compute('2.5', '+', '0.5')).toBeCloseTo(3);
  });

  test('division by zero throws', () => {
    expect(() => compute('1', '/', '0')).toThrow('Division by zero');
  });

  test('invalid operator throws', () => {
    expect(() => compute('2', '^', '3')).toThrow('Unsupported operator: ^');
  });

  test('invalid number input throws', () => {
    expect(() => compute('a', '+', '1')).toThrow('Invalid number input');
  });
});
