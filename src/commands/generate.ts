import * as fs from 'fs';
import * as path from 'path';
import {capitalize, formatDate} from "../../utils";

export async function generate(args: string[]) {
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

function createServerComponent(name: string) {
  const componentDir = path.join(process.cwd(), 'app', 'components', capitalize(name));
  const componentFile = path.join(componentDir, `index.tsx`);
  
  if (fs.existsSync(componentDir)) {
    console.error(`Component directory already exists: ${componentDir}`);
    process.exit(1);
  }
  
  fs.mkdirSync(componentDir, { recursive: true });
  
  const template = `
// File: ${capitalize(name)}/index.tsx created on ${formatDate()}

export default function ${capitalize(name)}() {
  return (
    <div>
      <h1>${capitalize(name)} (Server Component)</h1>
    </div>
  );
}
`.trim();
  
  fs.writeFileSync(componentFile, template, 'utf8');
  console.log(`Server Component created at ${componentFile}`);
}

function createClientComponent(name: string) {
  const componentDir = path.join(process.cwd(), 'app', 'components', capitalize(name));
  const componentFile = path.join(componentDir, `index.client.tsx`);
  
  if (fs.existsSync(componentDir)) {
    console.error(`Component directory already exists: ${componentDir}`);
    process.exit(1);
  }
  
  fs.mkdirSync(componentDir, { recursive: true });
  
  const template = `
// File: ${capitalize(name)}/index.tsx created on ${formatDate()}

"use client";

import React from 'react';

export default function ${capitalize(name)}() {
  return (
    <div>
      <h1>${capitalize(name)} (Client Component)</h1>
    </div>
  );
}
`.trim();
  
  fs.writeFileSync(componentFile, template, 'utf8');
  console.log(`Client Component created at ${componentFile}`);
}

function createPage(name: string) {
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

function createLayout(name: string) {
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
function pascalCase(str: string): string {
  return str
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
