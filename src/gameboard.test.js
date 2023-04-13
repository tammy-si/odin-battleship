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

// test('placing a ship at [[0, 0], [1, 0], [2, 0], [3, 0]] should return true and change the gameboard', () => {
//     let board = createGameboard();
//     expect(board.placeShip(0, 0, 4, "x")).toBe(true);
//     let currBoard = board.getBoard;
//     for (let i = 0; i < 4; i++) {
//         expect(currBoard[i][0]).toMatchObject({
//             length: 4, 
//             timesHit: 0, 
//             sunk: false,
//             hit: expect.any(Function), 
//             isSunk: expect.any(Function)
//         ,})
//     }
//     console.log(currBoard)
//     // make sure there all the same ship object
//     expect(currBoard[0][0] == currBoard[1][0] == currBoard[2][0] == currBoard[3][0]).toBe(true);
// });
