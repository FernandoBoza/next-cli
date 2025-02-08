#!/usr/bin/env node
import { generate } from './commands/generate';

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'generate':
    case 'g':
      await generate(args);
      break;
    
    default:
      console.log('Available commands: generate (g)');
      console.log('Usage: your-cli generate <type> <name> [options]');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
