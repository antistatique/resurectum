global.requirer = require;
const inquirer = require('inquirer');
const fs = require('fs')
const path = require('path');
const chalk = require('chalk');
const utils = require('../utils');

const deployContent = require('../templates/deploy');
const branch = 'dist/frontend';

module.exports = async (context) => {
  utils.separator();  
  console.log(`🤓 I see...\n\nSo we will commit your local build into a dedicated ${chalk.white(branch)} branch\nso you can use it to deploy the assets\n`);
  await utils.delay(1500);

  const frontConfigFile = context.slug === 'current' ? 'toolbox.json' : 'gulp_config.json';
  const frontConfig = await requirer(`${process.cwd()}/${frontConfigFile}`);
  let buildPath = frontConfig.build || frontConfig.dest;  

  // Check (and update) build directory path
  const buildPathCheck = await inquirer.prompt([{
    type: 'confirm',
    name: 'res',
    prefix: '🤓',
    message: `Your build directory is ./${buildPath} ?`
  }]);

  if (!buildPathCheck.res) {
    buildPath = await inquirer.prompt([{
      type: 'input',
      name: 'res',
      prefix: '🤓',
      message: `Type your build directory path`
    }]).then(answer => `/${answer.res}`);
  }

  if (buildPath.slice(-1) === '/') buildPath = buildPath.slice(0, -1);

  // Create Docker Compose config file (or not)
  const createDeployBin = await inquirer.prompt([{
    type: 'confirm',
    name: 'res',
    prefix: '🤓',
    message: `I\'m going to create a local ${chalk.green('deploy-frontend.sh')} file.\nIs that ok ?`
  }]);

  if (createDeployBin.res) {
    const writeFile = () => new Promise((res, rej) => fs.writeFile(`${process.cwd()}/deploy-frontend.sh`, deployContent(buildPath, branch), (err) => {
      if (err) throw err;
      console.log('deploy-frontend.sh is well saved!');
      res();
    }));
    await writeFile();
  }
  
  console.log(`
🤓 Now you can use ${chalk.white('deploy-frontend.sh')} to re-deploy your local frontend build. Feel free to follow those steps:

  0. Commit your local changes (+ the new deploy-frontend.sh)
  1. Update your project state and go to the ${chalk.green('master')} branch
  2. Re-build your assets with Toolbox or my own solution
  3. $ sh ./deploy-frontend.sh
  4. Now you can use the ${chalk.green(branch)} branch to fetch the build during your deploy process
`);
};