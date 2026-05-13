// Calculator module
// Supported operations: addition (+), subtraction (-), multiplication (*), division (/)
// Also accepts: x, X for multiply and ÷ for division symbol

function compute(a, operator, b) {
  const x = Number(a);
  const y = Number(b);
  if (!isFinite(x) || !isFinite(y) || Number.isNaN(x) || Number.isNaN(y)) {
    throw new Error('Invalid number input');
  }
  switch (operator) {
    case '+':
      return x + y;
    case '-':
      return x - y;
    case '*':
    case 'x':
    case 'X':
      return x * y;
    case '/':
    case '÷':
      if (y === 0) throw new Error('Division by zero');
      return x / y;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

module.exports = { compute };
