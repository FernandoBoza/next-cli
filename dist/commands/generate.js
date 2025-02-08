"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate = generate;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const utils_1 = require("../../utils");
async function generate(args) {
    const [type, name] = args;
    if (!type || !name) {
        console.log('Usage: your-cli generate <type> <name>');
        process.exit(1);
    }
    switch (type) {
        case 'c':
        case 'sc':
        case 'component':
        case 'server-component':
            createServerComponent(name);
            break;
        case 'cc':
        case 'client-component':
            createClientComponent(name);
            break;
        case 'page':
            createPage(name);
            break;
        case 'layout':
            createLayout(name);
            break;
        default:
            console.log(`Unknown type: ${type}`);
            process.exit(1);
    }
}
function createServerComponent(name) {
    const componentDir = path.join(process.cwd(), 'app', 'components', (0, utils_1.capitalize)(name));
    const componentFile = path.join(componentDir, `index.tsx`);
    if (fs.existsSync(componentDir)) {
        console.error(`Component directory already exists: ${componentDir}`);
        process.exit(1);
    }
    fs.mkdirSync(componentDir, { recursive: true });
    const template = `
// File: ${(0, utils_1.capitalize)(name)}/index.tsx created on ${(0, utils_1.formatDate)()}

export default function ${(0, utils_1.capitalize)(name)}() {
  return (
    <div>
      <h1>${(0, utils_1.capitalize)(name)} (Server Component)</h1>
    </div>
  );
}
`.trim();
    fs.writeFileSync(componentFile, template, 'utf8');
    console.log(`Server Component created at ${componentFile}`);
}
function createClientComponent(name) {
    const componentDir = path.join(process.cwd(), 'app', 'components', (0, utils_1.capitalize)(name));
    const componentFile = path.join(componentDir, `index.client.tsx`);
    if (fs.existsSync(componentDir)) {
        console.error(`Component directory already exists: ${componentDir}`);
        process.exit(1);
    }
    fs.mkdirSync(componentDir, { recursive: true });
    const template = `
// File: ${(0, utils_1.capitalize)(name)}/index.tsx created on ${(0, utils_1.formatDate)()}

"use client";

import React from 'react';

export default function ${(0, utils_1.capitalize)(name)}() {
  return (
    <div>
      <h1>${(0, utils_1.capitalize)(name)} (Client Component)</h1>
    </div>
  );
}
`.trim();
    fs.writeFileSync(componentFile, template, 'utf8');
    console.log(`Client Component created at ${componentFile}`);
}
function createPage(name) {
    // For Next.js App Router, pages typically go in `app/<pageName>/page.tsx`
    // We'll assume `name` is the route name
    const pageDir = path.join(process.cwd(), 'app', name);
    const pageFile = path.join(pageDir, 'page.tsx');
    if (fs.existsSync(pageDir)) {
        console.error(`Page directory already exists: ${pageDir}`);
        process.exit(1);
    }
    fs.mkdirSync(pageDir, { recursive: true });
    const template = `
// File: app/${name}/page.tsx
// This is a server-side page by default (if we don't mark "use client")

export default function ${pascalCase(name)}Page() {
  return (
    <main>
      <h1>${pascalCase(name)} Page</h1>
      <p>This is a Next.js 13 server-side page for the /${name} route.</p>
    </main>
  );
}

// If you want it to be a client component, you can add "use client" at the top
`.trim();
    fs.writeFileSync(pageFile, template, 'utf8');
    console.log(`Page created at ${pageFile}`);
}
function createLayout(name) {
    // Typically: app/<name>/layout.tsx
    const layoutDir = path.join(process.cwd(), 'app', name);
    const layoutFile = path.join(layoutDir, 'layout.tsx');
    if (!fs.existsSync(layoutDir)) {
        fs.mkdirSync(layoutDir, { recursive: true });
    }
    // If there's an existing layout, you might want to warn or handle it differently
    // but for simplicity, let's just override.
    const template = `
// File: app/${name}/layout.tsx
// A root layout shared by nested pages

export default function ${pascalCase(name)}Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>${pascalCase(name)} Layout</h1>
      {children}
    </section>
  );
}
`.trim();
    fs.writeFileSync(layoutFile, template, 'utf8');
    console.log(`Layout created at ${layoutFile}`);
}
// Utility to convert "my-new-page" -> "MyNewPage"
function pascalCase(str) {
    return str
        .split(/[\s-]+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join('');
}
