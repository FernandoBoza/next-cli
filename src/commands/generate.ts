import { createComponent, createLayout, createPage} from "../utils/utils";

export async function generate(args: string[]) {
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
      createComponent(name, 'components')
      break;
    
    case 'cc':
    case 'client-component':
      createComponent(name, 'components', true)
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
