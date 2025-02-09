import path from "path";
import * as fs from "fs";
import {clientComponentTemplate, serverComponentTemplate} from "./templates";
import {Config} from "./types";

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

/**
 * Creates a server (aka RSC) or client component
 * @param name - The name of the component
 * @param customPath - The custom path to create the component
 * @param client - Whether to create a client component
 * @param standalone - Whether to create a standalone component
 */
export function createComponent(name: string, customPath: string, client = false, standalone = false) {
  const componentDir = path.join(process.cwd(), customPath, standalone ? '' : name);
  const componentFile = createFilePath(name, componentDir, client, standalone);
  const template = client ? clientComponentTemplate(name) : serverComponentTemplate(name);
  
  if (fs.existsSync(componentDir)) {
    console.error(`Component directory already exists: ${componentDir}`);
    process.exit(1);
  }
  
  fs.mkdirSync(componentDir, { recursive: true });
  fs.writeFileSync(componentFile, template, 'utf8');
  console.log(`${client ? 'Client' : 'Server'} Component created at ${componentFile}`);
}


export function parseGenerateArgs(args: string[]) {
  const config = loadConfig();
  const [type, name, ...rest] = args;
  
  if (!type || !name) {
    throw new Error('Usage: cli generate <type> <name> [flags]');
  }

  const productFlags = ['--hotel', '--str', '--car', '--activity'];
  const product = rest.filter(arg => productFlags.includes(arg))[0]?.slice(2);
  const standalone = rest.includes('--standalone');
  let path: string;
  
  if (config){
    if (product){
      path = config.defaultPaths.components[product];
    } else {
      path = config.defaultPaths.components.global;
    }
  }
  
  return { type, name, path, standalone };
}

function loadConfig(): Config {
  try {
    const configPath = path.join(process.cwd(), 'cli.json');
    let raw = fs.readFileSync(configPath, 'utf8');
    raw = raw.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error loading config:', error);
    return undefined;
  }
}

function createFilePath(name: string, dir: string, client = false, standalone = false) {
  if (standalone){
    return path.join(dir, `${name}${client ? '.client' : ''}.tsx`);
  } else {
    return path.join(dir, `index${client ? '.client' : ''}.tsx`);
  }
}
