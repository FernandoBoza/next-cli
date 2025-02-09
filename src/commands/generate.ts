import {createComponent, parseGenerateArgs} from "../utils/utils";

export async function generate(args: string[]) {
  
  const { type, name, path , standalone} = parseGenerateArgs(args);
  
  if (!type || !name) {
    console.log('Usage: jbcli generate <type> <name>');
    process.exit(1);
  }
  
  console.log({type, name, path, standalone})
  
  switch (type) {
    case 'c':
    case 'sc':
    case 'component':
    case 'server-component':
      createComponent(name, path)
      break;

    case 'cc':
    case 'client-component':
      createComponent(name, path,true)
      break;

    default:
      console.log(`Unknown type: ${type}`);
      process.exit(1);
  }
}
