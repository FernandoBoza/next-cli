import {createComponent, parseGenerateArgs} from "../utils/utils";

export async function generate(args: string[]) {
  
  const { type, name, path , standalone} = parseGenerateArgs(args);
  
  if (!type || !name) {
    console.log('Usage: cli generate <type> <name>');
    process.exit(1);
  }
  
  switch (type) {
    case 'c':
    case 'sc':
    case 'component':
    case 'server-component':
      createComponent(name, path, false, standalone)
      break;

    case 'cc':
    case 'client-component':
      createComponent(name, path,true, standalone)
      break;

    default:
      console.log(`Unknown type: ${type}`);
      process.exit(1);
  }
}
