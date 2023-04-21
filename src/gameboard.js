const createShip = require("./ship");

function createGameboard() {
    // make a 2d board to keep track of where the ships and empty spaces are
    return {
        // ships are placed here
        board: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        //  2d array to keep track of which coords have recieved attacks
        // 0 hasn't. 1 has
        coordsAttacked: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ],
        shipsLeft: 5,

        get getBoard() {
            return this.board;
        },

        get getAttacks() {
            return this.coordsAttacked;
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
        },

        // for checking which coords attacked. if this returns true that means that the user is allowed to attack here
        checkCoordNotAttacked(row, col) {
            return (this.getAttacks[row][col] == 0);
        }, 

        getBoardCoord(row, col) {
            return this.board[row][col];
        },

        recieveHit(row, col) {
            // check if the coord has been attacked already. If so return false
            if (!this.checkCoordNotAttacked(row, col)) {
                return false;
            }
            // else, check if there is a ship in the location
            if (!this.checkCoordEmpty(row, col)) {
                // there's a ship. Get the ship and hit it
                let ship = this.getBoardCoord(row, col);
                ship.hit();
                // if the ship is sunk, lower the game boards' ship
                if (ship.isSunk()) {
                    this.shipsLeft -= 1;
                }
            } 
            // mark the coord as attacked
            this.coordsAttacked[row][col] = 1;
            console.log(this.coordsAttacked);
            return true;
        },

        // gets all [row, col] coordinates that's still avaiable for attack
        getAttackableCoords() {
            let attackCoords = this.getAttacks;
            let returnArr = [];
            for (let r = 0; r < 10; r++) {
                for(let c = 0; c < 10; c++) {
                    if (attackCoords[r][c] == 0) {
                        returnArr.push([r, c])
                    }
                }
            }
            return returnArr;
        },
    }
}

module.exports = createGameboard;