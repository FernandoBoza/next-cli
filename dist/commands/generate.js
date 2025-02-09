"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const utils_1 = require("../utils");
async function generate(args) {
    const [type, name] = args;
    if (!type || !name) {
        console.log('Usage: jbcli generate <type> <name>');
        process.exit(1);
    }
    switch (type) {
        case 'c':
        case 'sc':
        case 'component':
        case 'server-component':
            (0, utils_1.createComponent)(name, 'components');
            break;
        case 'cc':
        case 'client-component':
            (0, utils_1.createComponent)(name, 'components', true);
            break;
        case 'page':
            (0, utils_1.createPage)(name);
            break;
        case 'layout':
            (0, utils_1.createLayout)(name);
            break;
        default:
            console.log(`Unknown type: ${type}`);
            process.exit(1);
    }
}
