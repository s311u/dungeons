class Room{
    constructor(id, name, enemyId, npcId, keyId, connections, info){
        this.id = id;
        this.name = name;
        this.enemyId = enemyId;
        this.npcId = npcId;
        this.keyId = keyId;
        this.connections = connections;
        this.info = info;
        this.visited = visited; // 1 = visited, 0 = not visited
    }
}
let rooms = [
    new Room(0, "", [], [], [], [1], "", 0),
    new Room(1, "", [], [], [], [0, 2], "", 0),
    new Room(2, "", [], [], [], [1, 3], "", 0),
    new Room(3, "", [], [], [], [2, 4], "", 0),
    new Room(4, "", [], [], [], [3, 5, 6], "", 0),
    new Room(5, "", [], [], [], [4], "", 0),
    new Room(6, "", [], [], [4, 7], "", 0),
    new Room(7, "", [], [], [6, 8], "", 0),
    new Room(8, "", [], [], [7, 9, 10], "", 0),
    new Room(9, "", [], [], [8], "", 0),
    new Room(10, "", [], [], [8], "", 0),
    new Room(11, "", [], [], [12], "", 0),
    new Room(12, "", [], [], [8, 11, 13, 14], "", 0),
    new Room(13, "", [], [], [12], "", 0),
    new Room(14, "", [], [], [12], "", 0),
]
module.exports = { rooms };