const inquirer = require('inquirer');
const utils = require('../utils');

const local = require('./local');
const deploy = require('./deploy');

const rootQuestion = (message, context, resolve = null) => new Promise(async (res, rej) => {
  const situation = await inquirer.prompt([{
    type: 'list',
    name: 'res',
    prefix: '🤓',    
    message,
    choices: [
      {
        name: 'I cannot rebuild my local frontend assets',
        value: 'local',
      },
      {
        name: 'My deploy process is broken because of frontend, local build is fine',
        value: 'deploy',
      },
      {
        name: 'Nothing works, resurectum sucks',
        value: 'sucks',
      },
      {
        name: 'Nothing, everything\'s fine',
        value: 'fine',
      },
    ],
  }]);

  switch (situation.res) {
    case 'local':
      await local(context);
      await utils.separator();
      rootQuestion('Quelque chose d\'autre ?', context, resolve || res);
      break;

    case 'deploy':
      await deploy(context);
      await utils.separator();
      rootQuestion('Quelque chose d\'autre ?', context, resolve || res);
      break;

    case 'sucks':
      console.log(`\n😕 Sorry, maybe it's time to call ${chalk.cyan('Yann')}`);
      await utils.delay(1000);
      if (resolve) resolve();
      res();
      break;
  
    default:
      if (resolve) resolve();
      res();  
      break;
  }
});

module.exports = rootQuestion;