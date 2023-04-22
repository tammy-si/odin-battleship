import './style.css'
const createPlayer = require('./player');

const axisButton = document.querySelector('.axis');
var computer;

function startGame() {
    var isPlayerTurn = true;
    var gameover = false;
    var player = createPlayer(document.querySelector('.playerGrid'), true);
    // make the playerGrid
    computer = createPlayer(document.querySelector('.computerGrid'), false);

    var playerShipsToPlace = [2,3,3,4,5];
    let computerShipsToPlace = [2,3,3,4,5];

    // place the computer ships randomly
    for (let i = 0; i < 5; i++) {
        let directions = ['row', 'col'];
        // length of the next ship to place and a random direction
        let length = computerShipsToPlace.pop();
        let randomDir = directions[Math.floor(Math.random() * 2)];
        // look through every coord in the computer's gameboard to possible spot where a ship of length and dir could fit
        let possibleCoords = computer.playersGameboard.allCoordsShipFit(length, randomDir);
        // pick a random coord and place the ship there
        let randCoord = possibleCoords[Math.floor(Math.random() * possibleCoords.length)];
        computer.playersGameboard.placeShip(randCoord[0], randCoord[1], length, randomDir);
    }
    
    drawPlaceShipBoard(playerShipsToPlace[playerShipsToPlace.length - 1], 'row', player, playerShipsToPlace);


    // the game loop. Runs the computer move and checks for gameover
    const game = setInterval(() => {
        if (computer.isComputerTurn) {
            computer.attackRandom(player);
            // make it no longer the computers turn
            computer.isComputerTurn = false;
        }
        // check if the computer has any ships left
        if (computer.playersGameboard.allShipsSunk) {
            document.querySelector(".result").style.display = "flex"; 
            document.querySelector("#winner").textContent = "Player won";
            clearInterval(game);
        };
        // check if the player has any ships left
        if (player.playersGameboard.allShipsSunk) {
            document.querySelector(".result").style.display = "flex"; 
            document.querySelector("#winner").textContent = "Computer won";
            clearInterval(game);
        };
    }, 100)

    axisButton.addEventListener("click", ()=> {
        if (axisButton.value == 'row') {
            axisButton.textContent = "Axis: Y";
            axisButton.value = 'col'
        } else {
            axisButton.textContent = "Axis: X";
            axisButton.value = 'row';
        }
        drawPlaceShipBoard(playerShipsToPlace[playerShipsToPlace.length - 1], axisButton.value, player, playerShipsToPlace);
    })
}

startGame();

// draws out the board when the player is trying to place a ship
function drawPlaceShipBoard(length, axis, player, playerShipsToPlace) {
    const placeGrid = document.querySelector(".place-grid");
    // clear the grid
    placeGrid.innerHTML = '';
    // redraw the grid and add appropiate event listeners
    placeGrid.classList.add('grid');
    // make a certain amount of row
    for (let r = 0; r < 10; r++) {
        let newRow = document.createElement('div');
        newRow.classList.add("row");
        for (let c = 0; c < 10; c++) {
            let newBlock = document.createElement('div');
            newBlock.classList.add("block");
            if (!player.playersGameboard.checkCoordEmpty(r, c)) {
                newBlock.classList.add('ship');
            }
            newRow.appendChild(newBlock);
        }
        placeGrid.appendChild(newRow);
    }

    // get all the coords where the ship would fit
    let possibleCoords = player.playersGameboard.allCoordsShipFit(length, axis);
    
    // add event listeners for all the possible Coords
    for (let i = 0; i < possibleCoords.length; i++) {
        // go through all possible coords and add event listeners to the blocks
        // get the rowElem
        let rowDiv = placeGrid.children[possibleCoords[i][0]];
        // use the column to find the block
        let block = rowDiv.children[possibleCoords[i][1]];
        block.addEventListener("click", ()=> {
            player.playersGameboard.placeShip(possibleCoords[i][0], possibleCoords[i][1], length, axis);
            // make sure there are ships left to place
            if (playerShipsToPlace.length >= 1) {
                let nextShipLength = playerShipsToPlace.pop();
                drawPlaceShipBoard(playerShipsToPlace[playerShipsToPlace.length - 1], axis, player, playerShipsToPlace);
            }
            // get out of place ship mode
            if (playerShipsToPlace.length == 0) {
                document.querySelector(".place-boat").style.display = 'none';
                player.drawInitialGrid();
                computer.drawInitialGrid();
            }
        })
        // make hover effect
        block.addEventListener("mouseover", ()=> {
            let shipCoords = player.playersGameboard.getShipCoords(possibleCoords[i][0], possibleCoords[i][1], length, axis);
            for (let j = 0; j < shipCoords.length; j++) {
                let rowDiv = placeGrid.children[shipCoords[j][0]];
                // use the column to find the block
                let block = rowDiv.children[shipCoords[j][1]];     
                block.classList.add("hovered");
            }
        })
        // end the hover effect
        block.addEventListener('mouseout', ()=> {
            let shipCoords = player.playersGameboard.getShipCoords(possibleCoords[i][0], possibleCoords[i][1], length, axis);
            for (let k = 0; k < shipCoords.length; k++) {
                let rowDiv = placeGrid.children[shipCoords[k][0]];
                // use the column to find the block
                let block = rowDiv.children[shipCoords[k][1]];     
                block.classList.remove("hovered");
            }
        })
    }
}