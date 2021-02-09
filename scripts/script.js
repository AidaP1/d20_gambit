const elTargetNum = document.getElementById('targetNum');
const elPlayerGameScore = document.getElementById('playerGameScore');
const elPlayerRemainingDice = document.getElementById('playerRemainingDice');
const elOpponentGameScore = document.getElementById('opponentGameScore');
const elOpponentRemainingDice = document.getElementById('opponentRemainingDice');
const elPlayerD4 = document.getElementById('d4');
const elPlayerD6 = document.getElementById('d6');
const elPlayerD8 = document.getElementById('d8');
const elPlayerD10 = document.getElementById('d10');
const elPlayerD12 = document.getElementById('d12');
const elStartButton = document.getElementById('startGame');
const elPlayButton = document.getElementById('playGame');
const elRoundTwo = document.getElementById('roundTwo');
const elRoundThree = document.getElementById('roundThree');
const elResetButton = document.getElementById('reset');
const elPlyrResult = document.getElementById('plyrResult');
const elOpptResult = document.getElementById('oppntResult');
const elRoundoutcome = document.getElementById('roundOutcome');
const elFinalOutcome = document.getElementById('finalOutcome');

const diceArr  = [4,6,8,10,12]; // dice available for the game
const rounds = 3;
let targetNum;

let playerGameScore = 0;
let opponentGameScore = 0;

const opponent = {
    _startingDice: [],
    _currentDice: [],
    _diceTracker: [],
    _moves: [],
    _modifier: 0.5,
    _order: 'normal',
    get moves () {
        return this._moves;
    },
    get currentDice () {
        return this._currentDice;
    },
    get diceTrackString () {
        return this._diceTracker.join(', ');
    },
    getDice: function (array) { //push the dice into an array ordered highest to lowest
        array.forEach(dice => this._startingDice.push(dice));
        this._startingDice.sort((a , b) => b - a);
        this._startingDice.forEach(dice => this._currentDice.push(dice));
        this._startingDice.forEach(dice => this._diceTracker.push(dice));
    },
    updateDiceTrack: function (arr) {
        arr.forEach(function (item) {
            let i = opponent._diceTracker.indexOf(item);
            opponent._diceTracker.splice(i,1);
        })
    },
    guessRoll: function (sides) {
        return sides / 2 + this._modifier
    },
    getNextBestDice: function (outstandingTgt) { //finds the dice with the lowest delta to the outstanding target, after opponent modifier
        let champ = null; //champion/challenger approach
        let champDiff = 100;
        for (let i = 0; i < this._currentDice.length; i++) {
            let challenger = this._currentDice[i];
            let challengerRoll = this.guessRoll(challenger);
            if (champDiff > Math.abs(outstandingTgt - challengerRoll)) {
                champ = challenger;
                champDiff = Math.abs(outstandingTgt - challengerRoll);
            }
        }
        return champ;
    },
    getNextBestMove: function (round) {
        let availDice = this._currentDice.length - (rounds - round - 1); // you must roll in every round. This ensures you don't use too many dice
        let outstandingTgt = targetNum; // start by needing the full amount as the target, this will reduce with each dice added
        let thisMove = []; // store the roll
        let thisScore = []; // store the running (expected) score for the move
        let firstDice = this.getNextBestDice(outstandingTgt); //needs to run once before the loop (cant roll no dice)
        thisMove.push(firstDice);
        thisScore.push(this.guessRoll(firstDice))
        let index = this._currentDice.indexOf(firstDice);
        if (index > -1) {
            this._currentDice.splice(index,1);
        }
        for (i = 1; i < availDice; i++) { //runs the function as many times as possible whilst leaving enough dice for subsequent rounds

            let current = thisScore.reduce((acc,currVal) => acc + currVal);
            let option = this.getNextBestDice(outstandingTgt);
            if (Math.abs(targetNum - current) > Math.abs(targetNum - current - this.guessRoll(option))) {
                thisMove.push(option)
                thisScore.push(this.guessRoll(option))
                index = this._currentDice.indexOf(option);
                if (index > -1) {  //removes the chosen dice from the available pool
                    this._currentDice.splice(index,1);
                }
                outstandingTgt -= current // update so that we can target the remainder
            } else {
                break; //exit the function if it's no longer beneficial to add dice
            }  
        }
        this._moves.push(thisMove);
    },
    getMoves: function () {
        for (let i = 0; i < rounds - 1; i++) {
            this.getNextBestMove(i)
        }
        this._moves.push(this._currentDice);
        if (this._order === 'reverse') {
            this._moves.reverse();
        }
    }    
}

const player = {
    _startingDice: [],
    _currentDice: [],
    _usedDice: [],
    get currentDice() {
        return this._currentDice;
    },
    get currentDiceString () {
        return this._currentDice.join(', ');
    },

    getDice: function (array) { //push the dice into an array ordered highest to lowest
        if (this._startingDice.length === 0) {
            array.forEach(dice => this._startingDice.push(dice));
            this._startingDice.sort((a , b) => b - a);
            this._startingDice.forEach(dice => this._currentDice.push(dice));
        }
    },
    getArr: function () {
        let index;
        let roundArr = [];
        if (elPlayerD4.checked === true) {
            roundArr.push(4);
            document.getElementById('d4-box').style.display = 'none';
            elPlayerD4.checked = false;
            index  = this._currentDice.indexOf(4);
            this._currentDice.splice(index,1);
        }
        if (elPlayerD6.checked === true) {
            roundArr.push(6);
            document.getElementById('d6-box').style.display = 'none';
            elPlayerD6.checked = false;
            index  = this._currentDice.indexOf(6);
            this._currentDice.splice(index,1);
        }
        if (elPlayerD8.checked === true) {
            roundArr.push(8);
            document.getElementById('d8-box').style.display = 'none';
            elPlayerD8.checked = false;
            index  = this._currentDice.indexOf(8);
            this._currentDice.splice(index,1);
        }
        if (elPlayerD10.checked === true) {
            roundArr.push(10);
            document.getElementById('d10-box').style.display = 'none';
            elPlayerD10.checked = false;
            index  = this._currentDice.indexOf(10);
            this._currentDice.splice(index,1);
        }
        if (elPlayerD12.checked === true) {
            roundArr.push(12);
            document.getElementById('d12-box').style.display = 'none';
            elPlayerD12.checked = false;
            index  = this._currentDice.indexOf(12);
            this._currentDice.splice(index,1);
        }
        //console.log(`plr round arr: ${roundArr}`)
        //console.log('player current dice:' + this._currentDice)
        return roundArr;
        
    },
    checkInput: function () {
        let checkArr = [];
        if (elPlayerD4.checked === true) {
            checkArr.push(4);
        }
        if (elPlayerD6.checked === true) {
            checkArr.push(6);
        }
        if (elPlayerD8.checked === true) {
            checkArr.push(8);
        }
        if (elPlayerD10.checked === true) {
            checkArr.push(10);
        }
        if (elPlayerD12.checked === true) {
            checkArr.push(12);
        }
        return checkArr;
    }
}

function getTarget () {
    return Math.floor(Math.random() * 20 + 1)
}

function rollMove (diceToRollArr) {
    let scoreArr = [];
    diceToRollArr.forEach(function (dice) {
        let roll = Math.floor(Math.random() * dice + 1)
        scoreArr.push(roll);
    })
    let score = scoreArr.reduce((a,b) => a + b);
    return score;
}

function playRound (round,target,playerArr) { //rolls dice for each and plays
    let playerRoll = rollMove(playerArr);
    let playerRoundScore = Math.abs(target - playerRoll); 
    //console.log('opponent moves a: ' + opponent.moves[round - 1]);
    let opponentRoll = rollMove(opponent.moves[round - 1]);
    opponent.updateDiceTrack(opponent.moves[round - 1]);
    let opponentRoundScore = Math.abs(target - opponentRoll);
    elPlyrResult.innerHTML = playerRoll;
    elOpptResult.innerHTML = opponentRoll;
    //tests
    //console.log('player roll: ' + playerRoll);
    //console.log('opponent moves b: ' + opponent.moves[round - 1]);
    //console.log('opponent roll: ' + opponentRoll);
    if (playerRoundScore === opponentRoundScore) {
        return 'The round was a draw'
    } else if (playerRoundScore < opponentRoundScore) {
        playerGameScore += 1;
        elPlayerGameScore.innerHTML = playerGameScore;
        return 'Player wins the round'
    } else {
        opponentGameScore += 1;
        elOpponentGameScore.innerHTML = opponentGameScore;
        return 'opponent wins the round'
    }
}


function determineWinner (plyrscr,optscr) { //score comparison
    if (plyrscr === optscr) {
        return 'It is a Draw'
    } else if (plyrscr > optscr) {
        return  'Player Wins the Game!'
    } else {
        return 'Opponent Wins the Game!'
    }
}

function checkInput (round) { //checks that the player has selected a valid number of dice to roll
    if (elPlayerD4.checked === false && elPlayerD6.checked === false && elPlayerD8.checked === false && elPlayerD10.checked === false && elPlayerD12.checked === false) {
        return 'You need to roll at least 1 dice!'
    };
    const plannedRoll = player.checkInput();
    //console.log(`plyr currdice: ${player.checkInput.length}`)
    if (player.currentDice.length - plannedRoll.length < (rounds - round)) {
        return 'You can\'t roll that many dice - you won\'t have enough left!'
    }
    if (round === 3) {
        let checkAllUsed = player.checkInput()
        if (checkAllUsed.length !== player.currentDice.length) {
            return 'You can\'t finish with dice left - use them!'
        }
    }
    return 'valid';
}

function updateDice() {
    elPlayerRemainingDice.innerHTML = player.currentDiceString;
    elOpponentRemainingDice.innerHTML = opponent.diceTrackString;
}

function startGame () {
    targetNum = getTarget()
    //targetNum = 1; // test low numbers
    elTargetNum.innerHTML = targetNum;
    player.getDice(diceArr);
    opponent.getDice(diceArr);
    opponent.getMoves();
    updateDice();
    elStartButton.style.display = 'none';
    elPlayButton.style.display = 'block';
    document.getElementById('playerInputs').style.visibility = 'visible';
    //console.log(`opponent moves ${opponent.moves[0]}`)
    //console.log(`opponent moves ${opponent.moves[1]}`)
    //console.log(`opponent moves ${opponent.moves[2]}`)
}


function playRound1 () {
    const validRound = checkInput(1)
    if (validRound !== 'valid') {
        alert(validRound)
        return validRound;
    }
    elPlayButton.style.display = 'none';
    const playerArr = player.getArr()
    const roundOutcome = playRound(1, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    elRoundTwo.style.display = 'block';
    updateDice()
}

function playRound2 () {
    const validRound = checkInput(2)
    if (validRound !== 'valid') {
        alert(validRound)
        return validRound;
    }
    elRoundTwo.style.display = 'none';
    const playerArr = player.getArr()
    const roundOutcome = playRound(2, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    elRoundThree.style.display = 'block';
    updateDice()
}

function playFinalRound () {
    const validRound = checkInput(3)
    if (validRound !== 'valid') {
        alert(validRound)
        return validRound;
    }
    elRoundThree.style.display = 'none';
    const playerArr = player.getArr()
    const roundOutcome = playRound(3, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    const winner = determineWinner(playerGameScore,opponentGameScore)
    elFinalOutcome.innerHTML = winner;
    elResetButton.style.display = 'block';
    updateDice()
}

function reset () {
    elResetButton.style.display = 'none';
    opponent._startingDice.length = 0;
    opponent._currentDice.length = 0;
    opponent._diceTracker.length = 0;
    opponent._moves.length = 0;
    playerGameScore = 0;
    opponentGameScore = 0;
    player._startingDice.length = 0;
    player._currentDice.length = 0;
    player._usedDice.length = 0;
    elStartButton.style.display = 'block';
    elPlayerD4.style.display = '';
    elPlayerD6.style.display = '';
    elPlayerD8.style.display = '';
    elPlayerD10.style.display = '';
    elPlayerD12.style.display = '';
}


elStartButton.addEventListener('click',startGame);
elPlayButton.addEventListener('click',playRound1);
elRoundTwo.addEventListener('click',playRound2);
elRoundThree.addEventListener('click',playFinalRound);
elResetButton.addEventListener('click',reset)