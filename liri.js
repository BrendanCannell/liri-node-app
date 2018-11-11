require('dotenv').config();
let fs = require('fs');
let inquirer = require('inquirer');
let csvParse = require('csv-parse/lib/sync');

let keys = require('./keys');

function parse(input) {
  let [commandPlusArgs] = csvParse(input, { delimiter: ' ' }) || [];

  return commandPlusArgs;
}

function inputCommand(input) {
  let [command] = parse(input) || [];

  return command;
}

function validCommand(command) {
  let commandFiles = fs.readdirSync('commands');

  return commandFiles.indexOf(command + '.js') !== -1
}

function main() {
  inquirer
    .prompt([{
      name: 'input',
      type: 'input',
      message: '>',
      prefix: '',
      validate: (input) => {
        let command = inputCommand(input);

        return command
          ? validCommand(command) || "Unknown command: " + command
          : "Invalid input"
      }
    }])
    .then(({ input }) => {
      let [command, ...args] = parse(input);

      return require('./commands/' + command)(keys, args);
    })
    .then(output =>
      console.log(output)
    )
    .then(main);
}

main();