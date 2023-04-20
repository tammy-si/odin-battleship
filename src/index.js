import './style.css'
const createPlayer = require('./player');

var player = createPlayer(document.querySelector('.playerGrid'), true);
// make the playerGrid
var computer = createPlayer(document.querySelector('.computerGrid'), false);

player.playersGameboard.placeShip(0, 0, 4, "row");
player.playersGameboard.placeShip(0, 0, 4, "col");
player.playersGameboard.placeShip(1, 5, 5, "col");
player.playersGameboard.placeShip(8, 4, 3, "row");


player.drawInitialGrid();
computer.drawInitialGrid();
