import path from "path";
import * as fs from "fs";
import {clientComponentTemplate, layoutTemplate, pageTemplate, serverComponentTemplate} from "./templates";

export function capitalize(str: string) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function formatDate() {
  const date = new Date();
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options);
}

export function pascalCase(str: string): string {
  return str
    .split(/[\s-]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}

export function createComponent(name: string, type: 'components' | 'page' | 'layout', client = false) {
  const componentDir= path.join(process.cwd(), 'app', type, capitalize(name))
  const componentFile = path.join(componentDir, client ? 'index.client.tsx' : 'index.tsx')
  const template = client ? clientComponentTemplate(name) : serverComponentTemplate(name);
  
  if (fs.existsSync(componentDir)) {
    console.error(`Component directory already exists: ${componentDir}`);
    process.exit(1);
  }
  
  fs.mkdirSync(componentDir, { recursive: true });
  fs.writeFileSync(componentFile, template, 'utf8');
  console.log(`${client ? 'Client' : 'Server'} Component created at ${componentFile}`);
}

export function createPage(name: string) {
  // For Next.js App Router, pages typically go in `app/<pageName>/page.tsx`
  // We'll assume `name` is the route name
  const pageDir = path.join(process.cwd(), 'app', name);
  const pageFile = path.join(pageDir, 'page.tsx');
  
  if (fs.existsSync(pageDir)) {
    console.error(`Page directory already exists: ${pageDir}`);
    process.exit(1);
  }
  
  fs.mkdirSync(pageDir, { recursive: true });
  
  const template = pageTemplate(name);
  
  fs.writeFileSync(pageFile, template, 'utf8');
  console.log(`Page created at ${pageFile}`);
}

export function createLayout(name: string) {
  // Typically: app/<name>/layout.tsx
  const layoutDir = path.join(process.cwd(), 'app', name);
  const layoutFile = path.join(layoutDir, 'layout.tsx');
  
  if (!fs.existsSync(layoutDir)) {
    fs.mkdirSync(layoutDir, { recursive: true });
  }
  
  // If there's an existing layout, you might want to warn or handle it differently
  // but for simplicity, let's just override.
  const template = layoutTemplate(name);
  
  fs.writeFileSync(layoutFile, template, 'utf8');
  console.log(`Layout created at ${layoutFile}`);
}