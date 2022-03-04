const roomsFile = require('./rooms.js');
const characters = require('./characters.js');
const main = require('./index.js');
const prompts = require('prompts');

function action(choice) {
    let connectedRooms = [];
    for (let i = 0; i < roomsFile.rooms[characters.player.pos].connections.length; i++) {
        connectedRooms.push(roomsFile.rooms[roomsFile.rooms[characters.player.pos].connections[i]].name)
    }
    function displayArmor(){
        if (characters.player.armor.length == 0){
            console.log("You're not wearing armor! Better change that soon, I hear there are monsters wandering these halls.") //tms
        } else{
            console.log("You're wearing ");
            for(let i=0; i < characters.player.armor.length; i++){
                console.log(characters.player.armor[i])
            }
        }
        console.log("hi")
    }
    switch (choice) {
        case "check":
            
            async function chooseInventory() {
                let actionChoices = [
                    { title: "View armor", value: displayArmor() },
                ];

                for (let i = 0; i < characters.player.inventory.length; i++) {
                    actionChoices.push({
                        title: roomsFile.items[characters.player.inventory[i]].name,
                        value: roomsFile.items[characters.player.inventory[i]].id
                    })
                }

                const response = await prompts({
                    type: 'select',
                    name: 'value',
                    message: 'Which item do you wish to examine?', //tms
                    choices: actionChoices
                })

                roomsFile.items[response.value]
                
                main.gameLoop();
            }
            chooseInventory();
            break;

        case "look":
            console.log(characters.player.name + " looks around");
            console.log(characters.player.name + " is in the " + roomsFile.rooms[characters.player.pos].name + " and it is a " + roomsFile.rooms[characters.player.pos].info);
            console.log("\nThere are doorways leading to: ")
            for (let i = 0; i < connectedRooms.length; i++) {
                console.log(connectedRooms[i])
            }
            console.log("\n\n");
            console.log(roomsFile.rooms[characters.player.pos].enemyId)
            
            if (roomsFile.rooms[characters.player.pos].enemyId.length != 0) {
                for (let i = 0; i < roomsFile.rooms[characters.player.pos].enemyId.length; i++)
                characters.enemies[roomsFile.rooms[characters.player.pos].enemyId[i]].attack(characters.player);
            }
            main.gameLoop();
            break;

        case "goTo":
            async function chooseRoom() {
                let actionChoices = [];
                for (let i = 0; i < connectedRooms.length; i++) {
                    actionChoices.push({
                        title: roomsFile.rooms[roomsFile.rooms[characters.player.pos].connections[i]].name,
                        value: roomsFile.rooms[roomsFile.rooms[characters.player.pos].connections[i]].id
                    })
                }

                const response = await prompts({
                    type: 'select',
                    name: 'value',
                    message: 'Which room are you going to?',
                    choices: actionChoices
                })


                if(response.value == 3){
                    console.log('Congratulations ' + characters.player.name + "! You made it through the dungeon alive!\n--------------------")
                    process.exit();
                }else{
                console.log(characters.player.name + ' moves to ' + roomsFile.rooms[response.value].name + '\n-----------------------');
                characters.player.pos = response.value;
                    if(roomsFile.rooms[characters.player.pos].enemyId.length > 0) {
                    for (let i = 0; i < roomsFile.rooms[characters.player.pos].enemyId.length; i++)
                    characters.enemies[roomsFile.rooms[characters.player.pos].enemyId[i]].attack(characters.player);
                }
               
            }
                main.gameLoop();
            }
            chooseRoom();

            break;

        case "attack":
            let aliveEnemies = [];
            for (let i = 0; i < roomsFile.rooms[characters.player.pos].enemyId.length; i++){
                if(characters.enemies[roomsFile.rooms[characters.player.pos].enemyId[i]].status == 1){
                    aliveEnemies.push(characters.enemies[roomsFile.rooms[characters.player.pos].enemyId[i]])
                }
            } if(aliveEnemies.length >= 1) {
                async function chooseEnemy() {
                    let actionChoices = [];
                    for (let i = 0; i < aliveEnemies.length; i++) {
                        actionChoices.push({
                            title:aliveEnemies[i].name,
                            value:aliveEnemies[i].id
                        })
                    }

                    const response = await prompts({
                        type: 'select',
                        name: 'value',
                        message: "What do you want to attack?",
                        choices: actionChoices
                    })

                    characters.player.attack(response.value)
                    
                    main.gameLoop()
                }
                chooseEnemy();
                aliveEnemies = null;
            } else {console.log("It's safe here, no enemies to attack"); 
            main.gameLoop()}
            
            break;

        case "exit":
            process.exit();
    }
}

module.exports.action = action;
