const { execSync } = require('child_process');
const fs = require('fs');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute command: ${command}`);
    process.exit(1);
  }
}

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('package.json not found. Please ensure you are in the correct directory.');
  process.exit(1);
}

// Install dependencies
console.log('Installing dependencies...');
runCommand('npm install');

// Start development server
console.log('Starting development server...');
runCommand('npm run dev');