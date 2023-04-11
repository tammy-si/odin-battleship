const createShip = require('./ship');
const ship = require('./ship');

test('make sure making a ship works', () => {
    // making a ship with length 4
    let ship = createShip(4);
    expect(ship).toMatchObject({
        length: 4, 
        timesHit: 0, 
        sunk: false,
        hit: expect.any(Function), 
        isSunk: expect.any(Function)
    ,})
})

test('make sure making a ship works with a lenght of 2', () => {
    // making a ship with length 4
    let ship = createShip(2);
    expect(ship).toMatchObject({
        length: 2, 
        timesHit: 0, 
        sunk: false,
        hit: expect.any(Function), 
        isSunk: expect.any(Function)
    ,})
})

test('testing to make sure hit works with a ship of length 2', () => {
    let ship = createShip(2);
    expect(ship.getTimesHit).toBe(0);
    ship.hit();
    expect(ship.getTimesHit).toBe(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.getTimesHit).toBe(2);
    expect(ship.isSunk()).toBe(true);
    expect(ship).toMatchObject({
        length: 2, 
        timesHit: 2, 
        sunk: true,
        hit: expect.any(Function), 
        isSunk: expect.any(Function)
    ,})
})

test('testing to make sure hit works with a ship of length 4', () => {
    let ship = createShip(4);
    expect(ship.getTimesHit).toBe(0);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.getTimesHit).toBe(3);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.getTimesHit).toBe(4);
    expect(ship.isSunk()).toBe(true);
    expect(ship).toMatchObject({
        length: 4, 
        timesHit: 4, 
        sunk: true,
        hit: expect.any(Function), 
        isSunk: expect.any(Function)
    ,})
})