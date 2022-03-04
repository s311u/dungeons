const items = require('./rooms.js')
const main = require('./index.js');

function randomNumber(){
    return(Math.floor(Math.random() * 100))
}
class Character {
    constructor(name, healthPoints, damagePoints, successRate, attackAsset){// name of character, healthpoints, damagepoints dealt to other characters, success rate
        this.name = name;
        this.health = healthPoints;
        this.dp = damagePoints;
        this.sr = successRate;
        this.ass = attackAsset;
    }
}

class Player extends Character{
    constructor(name, health, dp, sr, position, ass, inventory, armor) { //adding position and inventory to player class name
        super(name, health, dp, sr, ass);
        this.pos = position;
        this.inventory = inventory;
        this.armor = armor;
    }
    attack(id){
        if (randomNumber() < this.sr){
            console.log(this.name + " bravely attacks " + enemies[id].name + " with their " + this.ass)
            console.log(this.name + " hits " + enemies[id].name + " with " + this.dp + " points")
            enemies[id].health -= this.dp;
            if(enemies[id].health <= 0){
                console.log(enemies[id].name + " is hit and destroyed!")
                enemies[id].status--;
            }
        }else{
            console.log(this.name + "'s attack misses the " + enemies[id].name)
        }
        if(enemies[id].hostile == 0){
            console.log("Why did you attack " + enemies[id].name + "? It will not harm you!")
        }
    }
    async findItem(id){
        console.log()
        options = [{ title: "Yes", value: addToInventory() },
                   { title: "No", value: notAdded() }];
        const response = await prompts({
            type: 'select',
            name: 'value',
            message: "Do you want to pick up the " + items.items[id].name + "?",
            choices: options
        })
        function notAdded() {
            main.gameLoop()
        }
        function addToInventory() {
            this.inventory.push(id)
            console.log("You shove the " + items.items[id].name + " up your travelsack!"); //tms viesti ilmoitus
            main.gameLoop()    
        }
    }
}
let player = new Player("Player", 10, 2, 75, 0, "shiny sword", [0],[]);

class Enemy extends Character{
    constructor(id, name, health, dp, sr, ass, status, hostile){ //adding id to enemy class name
        super(name, health, dp, sr, ass);
        this.id = id;
        this.status = status;
        this.hostile = hostile; //1=yes, 0=no
    }

    attack(x){
        if(this.status == 1 && this.hostile == 1) {
            console.log(x.name + " sees a " + this.name)
            if (this.health > 0){
                console.log("\n\n" + this.name + " attacks " + x.name + " with its " + this.ass);
                if (randomNumber() < this.sr){
                    x.health -= this.dp;
                    if(x.health > 0){
                        console.log(this.name + " hits " + x.name + " with " + this.dp + " leaving " + x.name + " with " + x.health + "\n");
                    }else {
                        console.log(this.name + " hits " + x.name + " with " + this.dp + " killing " + x.name);
                        console.log("Game over!");
                        process.exit();    
                    };
                }else {

                    console.log(this.name + " misses " + x.name + "!\n")
                }
            }
        }else if(this.status == 1 && this.hostile == 0) {
            console.log(x.name + " sees a " + this.name)
        }
    }
}

let enemies = [
    new Enemy(0,"Selina", 10, 1, 1, "her smooth brain", 1, 0)
];


module.exports = {enemies, player}