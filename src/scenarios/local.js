const path = require('path');
const fs = require('fs')
const inquirer = require('inquirer');
const chalk = require('chalk');
const spawn = require('cross-spawn');
const utils = require('../utils');

const content = {
  fabricator: require('../templates/fabricator'),
  old: require('../templates/old'),
  mixed: require('../templates/mixed'),
  current: require('../templates/current'),
};

module.exports = async (context) => {
  utils.separator();  
  console.log(`🤓 I see... First thing first, you will need ${chalk.green('Docker')} installed locally to continue.\nGet started on https://docs.docker.com/docker-for-mac/\n`);
  await utils.delay(1500);  

  // Create Docker Compose config file (or not)
  const createDockerCompose = await inquirer.prompt([{
    type: 'confirm',
    name: 'res',
    prefix: '🤓',
    message: `I\'m going to create à local ${chalk.green('docker-compose.yml')} file.\nIs that ok ?`
  }]);

  if (createDockerCompose.res) {
    const writeFile = () => new Promise((res, rej) => fs.writeFile(`${process.cwd()}/docker-compose.yml`, content[context.slug], (err) => {
      if (err) throw err;
      console.log('docker-compose.yml is well saved!');
      res();
    }));
    await writeFile();
  }

  // Start Docker service
  await utils.delay(1000);
  utils.separator();
  console.log(`🤓 Now that Docker is up and running, in the future,\n you can use the following commands :
  - ${chalk.white('docker-compose up resurectum_server')} (start the dev server)
  - ${chalk.white('docker-compose up resurectum_builder')} (start the production build task)\n`);

  const commands = await inquirer.prompt([{
    type: 'list',
    name: 'res',
    prefix: '🤓',    
    message: 'Which process you want to start ?',
    choices: [
      {
        name: 'Build my assets',
        value: 'builder',
      },
      {
        name: 'Start the dev server',
        value: 'server',
      },
      {
        name: 'None',
        value: false,
      },
    ],
  }]);

  if (commands.res) {
    await spawn.sync('docker-compose', ['up', `resurectum_${commands.res}`], { stdio: 'inherit' });
  }
};