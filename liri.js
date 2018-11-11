require('dotenv').config();
let fs = require('fs');
let inquirer = require('inquirer');
let csvParse = require('csv-parse/lib/sync');

let keys = require('./keys');

function parse(input) {
  let [commandPlusArgs] = csvParse(input, { delimiter: ' ' }) || [];

  return commandPlusArgs;
}

function validate(input) {
  let commandFilenames = fs.readdirSync('commands');
  let commands = commandFilenames
    .map((filename) => filename.replace('.js', ''));
  let usage = `Usage: ${commands.join('|')} ARG ...`;

  let [firstInput] = parse(input) || [];
  let commandExists = firstInput && commands.includes(firstInput);

  return commandExists || usage;
}

+function main() {
  inquirer
    .prompt([{
      name: 'input',
      type: 'input',
      message: '>',
      prefix: '',
      validate: validate
    }])
    .then(({ input }) => {
      let [command, ...args] = parse(input);

      return require('./commands/' + command)(keys, args);
    })
    .then(output => {
      console.log(output.ok || output.err)

      if (output.ok)
        fs.appendFileSync('log.txt', output.ok);
    })
    .catch(e => console.log(e.name + ": " + e.message))
    .finally(main);
}()