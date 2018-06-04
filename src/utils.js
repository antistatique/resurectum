exports.separator = () => console.log('\n--------------------------------------------------------------------------------');

exports.end = (msg) => console.log(chalk.red(msg));

exports.delay = (time) => new Promise((res, rej) => setTimeout(() => res(), time));