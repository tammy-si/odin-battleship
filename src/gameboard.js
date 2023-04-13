const createShip = require("./ship");

function createGameboard() {
    // make a 2d board to keep track of where the ships and empty spaces are
    return {
        board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],

        coordsHit: [],

        get getBoard() {
            return this.board;
        },

        set setBoard(board) {
            this.board = board;
        },

        placeShip(init_row, init_col, shipLength, dir) {
            let shipCoords = this.getShipCoords(init_row, init_col, shipLength, dir);
            // check if every coordinate of the ship would fit in range and is empty
            if (!(this.checkShipCoords(shipCoords))) {
                // if the ship doesn't fit we just return false and don't continue placing the ship onto the board
                return false;
            }

            // ship fits, make a new ship 
            let newShip = createShip(shipLength);
            // add the ship to the board
            let currBoard = this.getBoard;
            for (let i = 0; i < shipCoords.length; i++) {
                let row = shipCoords[i][0];
                let col = shipCoords[i][1];
                currBoard[row][col] = newShip;
            }
            console.log(currBoard)
            this.setBoard = currBoard;
            return true;
        },

        // get ship coords with in the initial
        getShipCoords(init_row, init_col, shipLength, dir) {
            let shipCoords = []
            for (let i = 0; i < shipLength; i++) {
                // if it's in row direction change the col value to go right
                if (dir == 'row') {
                    shipCoords.push([init_row, init_col + i])
                // col direction, make the ship coordinates go down by going down rows
                } else {
                    shipCoords.push([init_row + i, init_col])
                }
            }
            return shipCoords;
        },

        // check ship coords
        checkShipCoords(shipCoords) {
            for (let i = 0; i < shipCoords.length; i++) {
                let row = shipCoords[i][0];
                let col = shipCoords[i][1];
                if(row < 0 || row > 9 || col < 0 || col > 9 || !(this.checkCoordEmpty(row, col))) {
                    return false
                }
            }
            return true;
        },

        // make sure that the coordinate is empty (has a zero, not a ship)
        checkCoordEmpty(row, col) {
            return (this.getBoard[row][col] == 0)
        }
    }
}

module.exports = createGameboard;