const prompts = require('prompts');
const choices = require('./choices.js');
const characters = require('./characters.js');
const roomsFile = require('./rooms.js')

async function gameLoop() {

    const actionChoices = [
        { title: 'Check inventory', value: 'check' },
        { title: 'Look around', value: 'look' },
        { title: 'Go to room', value: 'goTo' },
        { title: 'Attack', value: 'attack' },
        { title: 'Exit game', value: 'exit' }
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

console.log('===================================================')
gameLoop();


module.exports.gameLoop = gameLoop;