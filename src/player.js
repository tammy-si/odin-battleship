const createGameboard = require("./gameboard");

function createPlayer() {
    return {
        playersGameboard: createGameboard(),
        
        attack(opponent, row, col) {
            // opponent should be a player object. 
            // get the opponent's board so that we can attack the board
            return opponent.playersGameboard.recieveHit(row, col);
        }
    }
}

module.exports = createPlayer;