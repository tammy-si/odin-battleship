const createGameboard = require("./gameboard");

function createPlayer(parentHTMLElem, human) {
    return {
        playersGameboard: createGameboard(),
        parentDiv: parentHTMLElem,
        isHuman: human,

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
                            console.log(rowNum, colNum);
                        })
                    }
                    newRow.appendChild(newBlock);
                }
                grid.appendChild(newRow);
            }
            this.parentDiv.appendChild(grid);
        }
    }
}

module.exports = createPlayer;