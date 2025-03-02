import readline from 'node:readline';
import { execSync } from 'node:child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export async function setup(args: string[]) {
  const isTailwind = args.includes('tailwind');
  const isShadCn = args.includes('shadcn');

  if (isTailwind) {
    console.log('Setting up Tailwind');
    rl.question('Do you want to install Tailwind V4? (y/n) \n', (resp) => {
      if (['y', 'yes'].includes(resp.toLowerCase().trim())) {
        console.log('Installing Tailwind V4');

        // Run the command to install Tailwind V4
        // execSync('npm install tailwindcss@next');

        // Look for main, index, or app css file
        // Add the import statement for Tailwind V4
        // execSync('echo "@import \'tailwindcss/base\';" >> src/main.css');
        // execSync('echo "@import \'tailwindcss/components\';" >> src/main.css');
        // execSync('echo "@import \'tailwindcss/utilities\';" >> src/main.css');
      } else {
        console.log('Installing Tailwind V3');
      }
      rl.close();
    });
  } else if (isShadCn) {
    console.log('Setting up Shadcn');
  } else {
    console.log('Usage: cli setup <type>');
    process.exit;
  }
}
