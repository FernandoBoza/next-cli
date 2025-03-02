#!/usr/bin/env node
import { generate } from './commands/generate';
import { setup } from './commands/setup';

const [, , command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'generate':
    case 'g':
      await generate(args);
      break;
    case 'setup':
      await setup(args);
      break;

    default:
      console.log('Available commands: generate (g)');
      console.log('Usage: cli generate <type> <name> [options]');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
