class Room{
    constructor(id, name, enemyId, npcId, itemId, connections, info, visited){
        this.id = id;
        this.name = name;
        this.enemyId = enemyId;
        this.npcId = npcId;
        this.itemId = itemId;
        this.connections = connections;
        this.info = info;
        this.visited = visited; // 1 = visited, 0 = not visited
    }
}
let rooms = [
    new Room(0, "Entrance", [], [], [], [1], "On the face of the cliff you see a large circular stone cover, the one Mahir must have been talking about. If the stone can't be moved it's a dead end, but you know that you won't be able to outrun the beasts out in the open. Only bad choices left, so you reach the stone, and push… Painstakingly the stone gives way, and there's just enough space for you to press yourself through. The cobwebs almost fill your mouth and eyes as you stumble onto what feels like a stone floor, covered with dust. By the time you get the cobwebs off your face your eyes have accustomed themselves to the darkness. And you understand you're in a chamber with a heavy door on the opposite side to the stone covering the entrance. You can hear the beasts having reached the stone, but while quick they're not strong, and although the sound they make is enough to chill the bones, the logical part of your brain manages to conclude that they're not going to get in. ", 0),
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


class Item { //items can include keys, potions, armor and other types of objects that will be useful later on in the game
    constructor(id, name, originalLocation, inInventory){
        this.id = id;
        this.name = name;
        this.originalLocation = originalLocation;
        this.inventory = inInventory; /* 1=yes, 0=no */
    }
}

let items = [
    new Item(0, "Lock-picking kit", 0, 1)
];
module.exports = { rooms, items };