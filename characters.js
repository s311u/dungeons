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
    constructor(name, health, dp, sr, position, ass, inventory){ //adding position and inventory to player class name
        super(name, health, dp, sr, ass);
        this.pos = position;
        this.inventory = inventory;
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
    }
}
let player = new Player("Player", 10, 2, 75, 0, "shiny sword", []);

class Enemy extends Character{
    constructor(id, name, health, dp, sr, ass, status){ //adding id to enemy class name
        super(name, health, dp, sr, ass);
        this.id = id;
        this.status = status;
    }
    attack(x){
        if(this.status == 1) {
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
        }
    }
}

let enemies = [
    new Enemy(0, "Sewer Rat", 2, 1, 50, "sharp teeth", 1), // status: 1 => alive, 0 => dead
    new Enemy(1, "Giant Dragon", 4, 8, 90, "sharp claws and fiery breath", 1),
    new Enemy(2, "Otto", 10, 5, 65, "superior intellectual capacity", 1)
];


module.exports = {enemies, player}