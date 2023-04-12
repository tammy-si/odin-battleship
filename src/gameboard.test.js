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

test('test getting potential ship coordinates with a starting 0,0 coord, 4 length, and rot direction x', () => {
    let board = createGameboard();
    expect(board.getShipCoords(0, 0, 4, "x")).toEqual([[0, 0], [1, 0], [2, 0], [3, 0]])
})

test('test getting potential ship coordinates with a starting 0,0 coord, 4 length, and rot direction y', () => {
    let board = createGameboard();
    expect(board.getShipCoords(0, 0, 4, "y")).toEqual([[0, 0], [0, 1], [0, 2], [0, 3]])
})

test('test getting potential ship coordinates with a starting 6,5 coord, 5 length, and rot direction x', () => {
    let board = createGameboard();
    expect(board.getShipCoords(6, 5, 5, "x")).toEqual([[6, 5], [7, 5], [8, 5], [9, 5], [10,5]])
})

test('test getting potential ship coordinates with a starting 5,6 coord, 5 length, and rot direction y', () => {
    let board = createGameboard();
    expect(board.getShipCoords(5, 6, 5, "y")).toEqual([[5, 6], [5, 7], [5, 8], [5, 9], [5, 10]])
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