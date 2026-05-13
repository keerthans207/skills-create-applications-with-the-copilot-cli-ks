#!/usr/bin/env node

// Simple Node.js CLI Calculator
// Supported operations: addition (+), subtraction (-), multiplication (*), division (/)
// Usage:
//   node src/cli.js 2 + 3        -> prints 5
//   node src/cli.js "4 * 5"      -> prints 20
//   node src/cli.js              -> starts interactive prompt

const readline = require('readline');

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

function printHelp() {
  console.log('Node.js CLI Calculator');
  console.log('Supports: +  -  *  /  (also recognizes x and ÷)');
  console.log('Usage:');
  console.log('  node src/cli.js 2 + 3');
  console.log('  node src/cli.js "4 * 5"');
  console.log('  node src/cli.js    # interactive mode');
}

function evalArgs(args) {
  // If user passed a single quoted expression like "2 + 3"
  if (args.length === 1) {
    const parts = args[0].trim().split(/\s+/);
    if (parts.length === 3) {
      return compute(parts[0], parts[1], parts[2]);
    }
  }

  if (args.length === 3) {
    return compute(args[0], args[1], args[2]);
  }

  throw new Error('Invalid arguments');
}

async function interactive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  const question = (q) => new Promise((res) => rl.question(q, res));

  console.log('Interactive mode. Enter expressions like: 2 + 3');
  console.log('Type "q" or "quit" to exit.');

  while (true) {
    const line = (await question('> ')).trim();
    if (!line) continue;
    if (/^(q|quit|exit)$/i.test(line)) break;

    const parts = line.split(/\s+/);
    try {
      if (parts.length === 3) {
        const result = compute(parts[0], parts[1], parts[2]);
        console.log(result);
      } else {
        console.log('Please enter in the form: <number> <operator> <number>');
      }
    } catch (err) {
      console.error('Error:', err.message);
    }
  }

  rl.close();
}

(async function main() {
  try {
    const rawArgs = process.argv.slice(2);
    if (rawArgs.length === 0) {
      await interactive();
      return;
    }

    if (rawArgs.includes('-h') || rawArgs.includes('--help')) {
      printHelp();
      return;
    }

    try {
      const res = evalArgs(rawArgs);
      if (res !== undefined) console.log(res);
    } catch (err) {
      // Fall back: if user passed a whole expression string, try to parse it
      console.error('Error:', err.message);
      printHelp();
      process.exitCode = 2;
    }
  } catch (err) {
    console.error('Fatal:', err && err.message ? err.message : err);
    process.exitCode = 1;
  }
})();
