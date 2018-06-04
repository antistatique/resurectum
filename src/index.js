global.requirer = require;
const chalk = require('chalk');

const utils = require('./utils');
const getContext = require('./actions/getContext');
const rootQuestion = require('./scenarios/root');

(async () => {
  const context = await getContext();
  console.log(`\n🤓 Ok, I assume that your project is ${chalk.green(context.desc)}\n`);
  
  await utils.delay(1000);
  await rootQuestion('What is the situation here ?', context)

  console.log('\n🤓 Ok, see you !\n');  
})();