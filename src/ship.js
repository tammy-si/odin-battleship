function createShip(length) {
    return {
        // length of the ship, how many times the ship has been hit, and if the ship has been sunk
        length: length,
        timesHit: 0,
        sunk: false,

        hit() {
            this.timesHit += 1;
        },

        isSunk() {
            if (this.getTimesHit == this.length) {
                this.sunk = true
            }
            return this.sunk;
        },

        get getTimesHit() {
            return this.timesHit;
        }
    }
}

module.exports = createShip;

