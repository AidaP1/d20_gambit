const diceArr  = [4,6,8,10,12]; // dice available for the game
const rounds = 3;
let targetNum = 4; //to be replaced with a random d20 roll


const opponent = {
    _startingDice: [],
    _currentDice: [],
    _moves: [],
    _modifier: 0.5,
    _order: 'normal',
    getDice: function (array) { //push the dice into an array ordered highest to lowest
        array.forEach(dice => this._startingDice.push(dice));
        this._startingDice.sort((a , b) => b - a);
        this._startingDice.forEach(dice => this._currentDice.push(dice));
    },
    getNextBestDice: function (outstandingTgt) { //finds the dice with the lowest delta to the outstanding target, after opponent modifier
        let champ = null; //champion/challenger approach
        let champDiff = 100;
        for (let i = 0; i < this._currentDice.length; i++) {
            let challenger = this._currentDice[i];
            let challengerRoll = challenger / 2 + this._modifier;
            if (champDiff > Math.abs(outstandingTgt - challengerRoll)) {
                champ = challenger;
                champDiff = Math.abs(outstandingTgt - challengerRoll);
                
            }
        }
        return champ;
    },
    getNextBestMove: function (round) {
        let availDice = this._currentDice.length - (rounds - round - 1); // you must roll in every round. This ensures you don't use too many dice
        //console.log(availDice) //test
        let outstandingTgt = targetNum;
        let thisMove = [];
        let firstDice = this.getNextBestDice(outstandingTgt);
        thisMove.push(firstDice);
        console.log(thisMove)
            this._currentDice.indexOf
        for (i = 1; i < this._currentDice.length; i++) {
            let current = thisMove.reduce((acc,currVal) => acc + currVal);
            let option = this.getNextBestDice(outstandingTgt);
            if (Math.abs(targetNum - current) > Math.abs(targetNum - current - option)) {
                thisMove.push
            }
        }
    },
}

opponent.getDice(diceArr);
opponent.getNextBestMove(1);
