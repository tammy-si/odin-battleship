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
            return this.board
        },

        placeShip(init_x, init_y, shipLength, dir) {
            let shipCoords = this.getShipCoords();
            // check if every coordinate of the ship would fit in range and is empty
            if (!(this.checkShipCoords(shipCoords))) {
                // if the ship doesn't fit we just return false and don't continue placing the ship onto the board
                return false;
            }
        },

        // get ship coords with in the initial
        getShipCoords(init_x, init_y, shipLength, dir) {
            let shipCoords = []
            for (let i = 0; i < shipLength; i++) {
                // if it's in x direction change the x value
                if (dir == 'x') {
                    shipCoords.push([init_x + i, init_y])
                // y direction, make the ship coordinates go down
                } else {
                    shipCoords.push([init_x, init_y + i])
                }
            }
            return shipCoords;
        },

        // check ship coords
        checkShipCoords(shipCoords) {
            for (let i = 0; i < shipCoords.length; i++) {
                let x = shipCoords[i][0];
                let y = shipCoords[i][1];
                if(x < 0 || x > 9 || y < 0 || y > 9 || !(this.checkCoordEmpty(x, y))) {
                    return false
                }
            }
            return true;
        },

        // make sure that the coordinate is empty (has a zero, not a ship)
        checkCoordEmpty(x_coord, y_coord) {
            return (this.getBoard[x_coord][y_coord] == 0)
        }
    }
}

module.exports = createGameboard;