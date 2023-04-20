import './style.css'
const createPlayer = require('./player');

var player = createPlayer(document.querySelector('.playerGrid'), true);
// make the playerGrid
var computer = createPlayer(document.querySelector('.computerGrid'), false);

player.drawInitialGrid();
computer.drawInitialGrid();