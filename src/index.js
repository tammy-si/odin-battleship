import './style.css'
const createPlayer = require('./player');

function startGame() {
    var isPlayerTurn = true;
    var gameover = false;
    var player = createPlayer(document.querySelector('.playerGrid'), true);
    // make the playerGrid
    var computer = createPlayer(document.querySelector('.computerGrid'), false);

    let playerShipsToPlace = [2,3,3,4,5];
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

    // place player boats

    player.playersGameboard.placeShip(0, 0, 4, "row");
    player.playersGameboard.placeShip(0, 0, 4, "col");
    player.playersGameboard.placeShip(1, 5, 5, "col");
    player.playersGameboard.placeShip(8, 4, 3, "row");
    player.playersGameboard.placeShip(2, 2, 2, "row");
    player.playersGameboard.placeShip(9, 9, 1, "col");

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

    player.drawInitialGrid();
    computer.drawInitialGrid();
}

startGame();

const axisButton = document.querySelector('.axis')

axisButton.addEventListener("click", ()=> {
    if (axisButton.value == 'row') {
        axisButton.textContent = "Axis: Y";
        axisButton.value = 'col'
    } else {
        axisButton.textContent = "Axis: X";
        axisButton.value = 'row'
    }
})