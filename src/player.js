const createGameboard = require("./gameboard");

function createPlayer() {
    return {
        playersGameboard: createGameboard(),
        
        attack(opponent, row, col) {
            // opponent should be a player object. 
            // get the opponent's board so that we can attack the board
            return opponent.playersGameboard.recieveHit(row, col);
        },
        
        // random legal hit
        attackRandom(opponent) {
            // get all the available attack coordinates
            let availableAttackCoords = opponent.playersGameboard.getAttackableCoords();
            let randomCoord = availableAttackCoords[Math.floor(Math.random() * availableAttackCoords.length)];
            return opponent.playersGameboard.recieveHit(randomCoord[0], randomCoord[1]);
        }
    }
}

module.exports = createPlayer;