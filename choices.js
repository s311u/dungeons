const roomsFile = require('./rooms.js');
const characters = require('./characters.js');
const main = require('./index.js');
const prompts = require('prompts');

function action(choice) {
    let connectedRooms = [];
    for (let i = 0; i < roomsFile.rooms[characters.player.pos].connections.length; i++) {
        connectedRooms.push(roomsFile.rooms[roomsFile.rooms[characters.player.pos].connections[i]].name)
    }
    switch (choice) {
        case "look":
            console.log("You are in the " + roomsFile.rooms[characters.player.pos].name + "\n\n" + roomsFile.rooms[characters.player.pos].info);
            console.log("\nThere are doorways leading to: ")
            for (let i = 0; i < connectedRooms.length; i++) {
                console.log(connectedRooms[i])
            }
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
                        characters.enemies[roomsFile.rooms[characters.player.pos].enemyId[0]].attack(characters.player);
                    }

                    if (response.value == 0 && characters.enemies[0].status == 0){
                        console.log(characters.player.health);
                        characters.player.health = 10;
                        console.log("your health is " + characters.player.health);
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
            } 
            
            if(aliveEnemies.length >= 1) {
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
                        message: "Which enemy do you want to attack?",
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

        case "check":
            let actionChoices = [
                { title: "Check armor", value: "armor"}
            ];

            break;

        case "exit":
            process.exit();
    }
}

module.exports.action = action;