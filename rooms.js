class Room{
    constructor(id, name, enemyId, connections, info){
        this.id = id;
        this.name = name;
        this.enemyId = enemyId;
        this.connections = connections;
        this.info = info;
    }
}
let rooms = [
    new Room(0, "Dungeon entrance", [],[1], "big and damp room with broken statues all around"),
    new Room(1, "Hallway", [0,2],[0, 2], "long and dark hallway with dark pools of water on the floor and some fungus growing on the walls"),
    new Room(2, "Chamber", [1],[1, 3], "small chamber, which is illuminated by glowing portal of somekind"),
    new Room(3, "Portal", [], [2], "")
]
module.exports = { rooms };