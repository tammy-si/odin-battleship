const createGameboard = require("./gameboard");

function createPlayer() {
    return {
        playersGameboard: createGameboard()
    }
}