const createGameboard = require('./gameboard');

test('initilizing the gameboard', ()=> {
    let board = createGameboard();
    expect(board.getBoard).toEqual(
        [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);
})

test('test getting potential ship coordinates with a starting 0,0 (row, column coord), 4 length, and rot direction row', () => {
    let board = createGameboard();
    expect(board.getShipCoords(0, 0, 4, "row")).toEqual([[0, 0], [0, 1], [0, 2], [0, 3]])
})

test('test getting potential ship coordinates with a starting 0,0 (row, column coord), 4 length, and rot direction col', () => {
    let board = createGameboard();
    expect(board.getShipCoords(0, 0, 4, "col")).toEqual([[0, 0], [1, 0], [2, 0], [3, 0]])
})

test('test getting potential ship coordinates with a starting 5,6 (row, column coord), 5 length, and rot direction row', () => {
    let board = createGameboard();
    expect(board.getShipCoords(5, 6, 5, "row")).toEqual([[5, 6], [5, 7], [5, 8], [5, 9], [5, 10]])
})

test('test getting potential ship coordinates with a starting 6,5 (row, column coord), 5 length, and rot direction col', () => {
    let board = createGameboard();
    expect(board.getShipCoords(6, 5, 5, "col")).toEqual([[6, 5], [7, 5], [8, 5], [9, 5], [10, 5]])
})

test('ship coords [[0, 0], [1, 0], [2, 0], [3, 0]] should return true', () => {
    let board = createGameboard();
    expect(board.checkShipCoords([[0, 0], [1, 0], [2, 0], [3, 0]])).toBe(true);
})

test('ship coords [[0, 0], [0, 1], [0, 2], [0, 3]] should return true', () => {
    let board = createGameboard();
    expect(board.checkShipCoords([[0, 0], [0, 1], [0, 2], [0, 3]])).toBe(true);
})

test('ship coords [[6, 5], [7, 5], [8, 5], [9, 5], [10,5]] should return false', () => {
    let board = createGameboard();
    expect(board.checkShipCoords([[6, 5], [7, 5], [8, 5], [9, 5], [10,5]])).toBe(false);
})

test('ship coords [[5, 6], [5, 7], [5, 8], [5, 9], [5, 10]] should return false', () => {
    let board = createGameboard();
    expect(board.checkShipCoords([[5, 6], [5, 7], [5, 8], [5, 9], [5, 10]])).toBe(false);
})

test('placing a ship at [[0, 0], [1, 0], [2, 0], [3, 0]] should return true and change the gameboard', () => {
    let board = createGameboard();
    expect(board.placeShip(0, 0, 4, "col")).toBe(true);
    let currBoard = board.getBoard;
    for (let i = 0; i < 4; i++) {
        expect(currBoard[i][0]).toMatchObject({
            length: 4, 
            timesHit: 0, 
            sunk: false,
            hit: expect.any(Function), 
            isSunk: expect.any(Function)
        ,})
    }
    // make sure all the other spots are 0
    // for the first 4 rows, make sure col 1 - 9 are empty
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }
    // all the other rows and columns equal zero
    for (let i = 4; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }

    // make sure there all the same ship object
    expect((currBoard[0][0] == currBoard[1][0]) == (currBoard[0][0] == currBoard[2][0]) == (currBoard[0,0] == currBoard[3,0])).toBe(true);
});


test('make sure that if you try to place an overlapping ship it does not place', () => {
    let board = createGameboard();
    expect(board.placeShip(0, 0, 4, "col")).toBe(true);
    // placing the 2nd ship here
    expect(board.placeShip(0, 0, 4, "row")).toBe(false);
    let currBoard = board.getBoard;
    for (let i = 0; i < 4; i++) {
        expect(currBoard[i][0]).toMatchObject({
            length: 4, 
            timesHit: 0, 
            sunk: false,
            hit: expect.any(Function), 
            isSunk: expect.any(Function)
        ,})
    }
    // make sure all the other spots are 0
    // for the first 4 rows, make sure col 1 - 9 are empty
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }
    // all the other rows and columns equal zero
    for (let i = 4; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }
    
    // make sure there all the same ship object
    expect((currBoard[0][0] == currBoard[1][0]) == (currBoard[0][0] == currBoard[2][0]) == (currBoard[0,0] == currBoard[3,0])).toBe(true);
});

test('trying to place a ship out of bounds fails (horizontal)', () => {
    let board = createGameboard();
    expect(board.placeShip(4, 7, 4, "row")).toBe(false);
    let currBoard = board.getBoard;

    // make sure all the other spots are 0
    // all the other rows and columns equal zero
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }
});

test('trying to place a ship out of bounds fails (vertical)', () => {
    let board = createGameboard();
    expect(board.placeShip(8, 7, 4, "col")).toBe(false);
    let currBoard = board.getBoard;

    // make sure all the other spots are 0
    // all the other rows and columns equal zero
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            expect(currBoard[i][j]).toBe(0);
        }
    }
    
});
