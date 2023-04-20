const createPlayer = require('./player');

test('trying to create a player and a computer player', ()=> {
    let player = createPlayer();
    let computer = createPlayer();
    player.playersGameboard.placeShip(0, 0, 4, 'row');
    player.playersGameboard.placeShip(1, 0, 3, 'col');
    computer.playersGameboard.placeShip(0, 0, 4, 'row');
    computer.playersGameboard.placeShip(1, 0, 3, 'col');
})

test('testing out a player attacking an enemy board', () => {
    let player = createPlayer();
    let computer = createPlayer();
    player.playersGameboard.placeShip(0, 0, 4, 'row');
    player.playersGameboard.placeShip(1, 0, 3, 'col');
    computer.playersGameboard.placeShip(0, 0, 4, 'row');
    computer.playersGameboard.placeShip(1, 0, 3, 'col');
    expect(player.attack(computer, 0, 0)).toBe(true);
    expect(computer.playersGameboard.getAttacks[0][0]).toEqual(1);
    expect(computer.playersGameboard.getBoard[0][0].getTimesHit).toBe(1);
});

test('testing out a player attacking an enemy board on the same place failing', () => {
    let player = createPlayer();
    let computer = createPlayer();
    player.playersGameboard.placeShip(0, 0, 4, 'row');
    player.playersGameboard.placeShip(1, 0, 3, 'col');
    computer.playersGameboard.placeShip(0, 0, 4, 'row');
    computer.playersGameboard.placeShip(1, 0, 3, 'col');
    expect(player.attack(computer, 0, 0)).toBe(true);
    expect(computer.playersGameboard.getAttacks[0][0]).toEqual(1);
    expect(computer.playersGameboard.getBoard[0][0].getTimesHit).toBe(1);
    expect(player.attack(computer, 0, 0)).toBe(false);
    expect(computer.playersGameboard.getAttacks[0][0]).toEqual(1);
    expect(computer.playersGameboard.getBoard[0][0].getTimesHit).toBe(1);
});

test('testing out a computer making a random attack', () => {
    let player = createPlayer();
    let computer = createPlayer();
    player.playersGameboard.placeShip(0, 0, 4, 'row');
    player.playersGameboard.placeShip(1, 0, 3, 'col');
    computer.playersGameboard.placeShip(0, 0, 4, 'row');
    computer.playersGameboard.placeShip(1, 0, 3, 'col');
    expect(player.playersGameboard.getAttackableCoords().length).toBe(100);
    computer.attackRandom(player);
    expect(player.playersGameboard.getAttackableCoords().length).toBe(99);
});