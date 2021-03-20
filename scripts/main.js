class Opponent {
    constructor(name,direction,modifier) {
        this._name = name;
        this._direction = direction;
        this._modifier = modifier;
    }
    taunt() {
        return 'You suck!';
    }
};

module.exports = Opponent;