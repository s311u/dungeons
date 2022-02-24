const prompts = require('prompts');
const choices = require('./choices.js');
const characters = require('./characters.js');

async function gameLoop() {

    const actionChoices = [
        { title: 'Look around', value: 'look' },
        { title: 'Go to room', value: 'goTo' },
        { title: 'Attack', value: 'attack'},
        { title: 'Exit game', value: 'exit'}
    ];

    const response = await prompts({
      type: 'select',
      name: 'value',
      message: 'Choose your action',
      choices: actionChoices
    });
    choices.action(response.value);
    
}


process.stdout.write('\033c');

console.log('WELCOME TO THE DUNGEONS OF LORD OBJECT ORIENTUS!')
console.log('================================================')
  console.log('You walk down the stairs to the dungeons')
gameLoop();


module.exports.gameLoop = gameLoop;