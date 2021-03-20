const DiceRoller = {
    d4() {
        return Math.floor(Math.random() * 3 + 1)
    }
}

module.exports = DiceRoller;