import './style.css'
const createPlayer = require('./player');

function startGame() {
    var isPlayerTurn = true;
    var gameover = false;
    var player = createPlayer(document.querySelector('.playerGrid'), true);
    // make the playerGrid
    var computer = createPlayer(document.querySelector('.computerGrid'), false);

    player.playersGameboard.placeShip(0, 0, 4, "row");
    player.playersGameboard.placeShip(0, 0, 4, "col");
    player.playersGameboard.placeShip(1, 5, 5, "col");
    player.playersGameboard.placeShip(8, 4, 3, "row");
    player.playersGameboard.placeShip(2, 2, 2, "row");
    player.playersGameboard.placeShip(9, 9, 1, "col");



    computer.playersGameboard.placeShip(0, 0, 4, "row");
    computer.playersGameboard.placeShip(0, 0, 4, "col");
    computer.playersGameboard.placeShip(1, 5, 5, "col");
    computer.playersGameboard.placeShip(8, 4, 3, "row");
    computer.playersGameboard.placeShip(2, 2, 2, "row");
    computer.playersGameboard.placeShip(2, 2, 2, "row");
    computer.playersGameboard.placeShip(9, 9, 1, "col");

    const game = setInterval(() => {
        console.log(computer.isComputerTurn)

        if (computer.isComputerTurn) {
            computer.attackRandom(player);
            // make it no longer the computers turn
            computer.isComputerTurn = false;
        }
        // check if the computer has any ships left
        if (computer.playersGameboard.allShipsSunk) {
            console.log("player won");
            clearInterval(game);
        };
        // check if the player has any ships left
        if (player.playersGameboard.allShipsSunk) {
            console.log("computer won")
            clearInterval(game);
        };
    }, 100)

    player.drawInitialGrid();
    computer.drawInitialGrid();
}

startGame();

