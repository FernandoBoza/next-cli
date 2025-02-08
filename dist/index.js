#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generate_1 = require("./commands/generate");
const [, , command, ...args] = process.argv;
async function main() {
    switch (command) {
        case 'generate':
        case 'g':
            await (0, generate_1.generate)(args);
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
