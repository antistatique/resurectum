const inquirer = require('inquirer');

exports.separator = () => console.log('\n--------------------------------------------------------------------------------');

const confirm = () => new Promise(async (res, rej) => {
  const isDone = await inquirer.prompt([{
    type: 'confirm',
    name: 'res',
    prefix: '🤓',
    message: 'Done ?'
  }]);

  if (!isDone.res) console.log('\n😏');
  res();
});

exports.confirm = confirm;

exports.end = (msg) => console.log(chalk.red(msg));

exports.delay = (time) => new Promise((res, rej) => setTimeout(() => res(), time));