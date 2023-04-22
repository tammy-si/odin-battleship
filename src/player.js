const createGameboard = require("./gameboard");

function createPlayer(parentHTMLElem, human) {
    return {
        playersGameboard: createGameboard(),
        parentDiv: parentHTMLElem,
        isHuman: human,
        isComputerTurn: false,
        nextHit: [],

        attack(opponent, row, col) {
            // opponent should be a player object. 
            // get the opponent's board so that we can attack the board
            return opponent.playersGameboard.recieveHit(row, col);
        },
        
        // random legal hit for the computer mainly
        attackRandom(opponent) {
            console.log(this.nextHit);
            // if the computer's next hit stack isn't empty, pop from it and try to attack
            if (this.nextHit.length !== 0) {
                var randomCoord = this.nextHit.pop();
            } else {
                // get all the available attack coordinates
                let availableAttackCoords = opponent.playersGameboard.getAttackableCoords();
                var randomCoord = availableAttackCoords[Math.floor(Math.random() * availableAttackCoords.length)];
            }
            // use this randomCoord to change the computer's board
            opponent.updateCSSForCoord(randomCoord[0], randomCoord[1]);
            // if random location has a ship in it. Add adjacent avaible coordinates to the nextHit stack
            if (!opponent.playersGameboard.checkCoordEmpty(randomCoord[0], randomCoord[1])) {
                let row = randomCoord[0];
                let col = randomCoord[1];
                // make sure the a adjacent coords are in bounds and haven't been hit yet
                // top middle
                if (row - 1 >= 0 && opponent.playersGameboard.checkCoordNotAttacked(row-1, col)) {
                    // add to nextHit stack so the computer can try hitting this spot next
                    this.nextHit.push([row-1, col])
                }
                // middle left
                if (col - 1 >= 0 && opponent.playersGameboard.checkCoordNotAttacked(row, col - 1)) {
                    this.nextHit.push([row, col-1])
                }
                // middle right
                if (col + 1 <= 9 && opponent.playersGameboard.checkCoordNotAttacked(row, col + 1)) {
                    this.nextHit.push([row, col+1])
                }
                // middle bottom
                if (row + 1 <= 9 && opponent.playersGameboard.checkCoordNotAttacked(row+1, col)) {
                    this.nextHit.push([row+1, col])
                }
                console.log(this.nextHit)
            }
            return opponent.playersGameboard.recieveHit(randomCoord[0], randomCoord[1]);
        },

        drawInitialGrid() {
            let grid = document.createElement('div')
            grid.classList.add('grid');
            // make a certain amount of row
            for (let r = 0; r < 10; r++) {
                let newRow = document.createElement('div');
                newRow.classList.add("row");
                for (let c = 0; c < 10; c++) {
                    let newBlock = document.createElement('div');
                    newBlock.classList.add("block");
                    // let the user click on computer blocks
                    if (!this.isHuman) {
                        newBlock.addEventListener("click", (e) => {
                            let block = e.target;
                            let rowDiv = block.parentElement;
                            // get colNum by looking for the index of block in the rowDiv
                            let colNum = Array.prototype.indexOf.call(rowDiv.children, block)
                            // get rowNum by looking for the rowDiv in the entire div
                            let gridDiv = rowDiv.parentElement;
                            let rowNum = Array.prototype.indexOf.call(gridDiv.children, rowDiv);
                            // make sure this location wasn't already attacked
                            if (this.playersGameboard.checkCoordNotAttacked(rowNum, colNum)) {
                                // change the info
                                this.attack(this, rowNum, colNum);
                                // changing the css
                                if (!this.playersGameboard.checkCoordEmpty(rowNum, colNum)) {
                                    block.classList.add('ship');
                                } 
                                block.classList.add('hit');
                                // make it the computer's turn
                                this.isComputerTurn = true;
                            }
                        })
                    // for the player's board
                    } else {
                        // also display the user's ships
                        if (!this.playersGameboard.checkCoordEmpty(r, c)) {
                            newBlock.classList.add("ship");
                        }
                    }
                    newRow.appendChild(newBlock);
                }
                grid.appendChild(newRow);
            }
            this.parentDiv.appendChild(grid);
        },


        // HTML element from the block coord
        HTMLBlockFromCoord(row, col) {
            // get the parent
            let grid = this.parentDiv.children[1];
            // get the rowElem
            let rowDiv = grid.children[row];
            // use the column to find the block
            let block = rowDiv.children[col];
            return block;
        },

        // update CSS at this coord
        updateCSSForCoord(row, col) {
            let block = this.HTMLBlockFromCoord(row, col);
            // changing the css
            if (!this.playersGameboard.checkCoordEmpty(row, col)) {
                block.classList.add('ship');
            } 
            block.classList.add('hit');
        }
    }
}

module.exports = createPlayer;