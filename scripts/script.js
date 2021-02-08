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
const elPlayButton = document.getElementById('playGame');
const elRoundTwo = document.getElementById('roundTwo');
const elRoundThree = document.getElementById('roundThree');
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
    _moves: [],
    _modifier: 0.5,
    _order: 'normal',
    get moves () {
        return this._moves;
    },
    get currentDice () {
        return this._currentDice.join(' ');
    },
    getDice: function (array) { //push the dice into an array ordered highest to lowest
        array.forEach(dice => this._startingDice.push(dice));
        this._startingDice.sort((a , b) => b - a);
        this._startingDice.forEach(dice => this._currentDice.push(dice));
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
    getDice: function (array) { //push the dice into an array ordered highest to lowest
        array.forEach(dice => this._startingDice.push(dice));
        this._startingDice.sort((a , b) => b - a);
        this._startingDice.forEach(dice => this._currentDice.push(dice));
    },
    getArr: function () {
        let roundArr = [];
        if (elPlayerD4.checked === true) {
            roundArr.push(4);
            document.getElementById('d4-box').style.display = 'none';
            elPlayerD4.checked = false;
        }
        if (elPlayerD6.checked === true) {
            roundArr.push(6);
            document.getElementById('d6-box').style.display = 'none';
            elPlayerD6.checked = false;
        }
        if (elPlayerD8.checked === true) {
            roundArr.push(8);
            document.getElementById('d8-box').style.display = 'none';
            elPlayerD8.checked = false;
        }
        if (elPlayerD10.checked === true) {
            roundArr.push(10);
            document.getElementById('d10-box').style.display = 'none';
            elPlayerD10.checked = false;
        }
        if (elPlayerD12.checked === true) {
            roundArr.push(12);
            document.getElementById('d12-box').style.display = 'none';
            elPlayerD12.checked = false;
        }
        //console.log(`plr round arr: ${roundArr}`)
        return roundArr;
    },
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
    let opponentRoll = rollMove(opponent.moves[round - 1])
    let opponentRoundScore = Math.abs(target - opponentRoll);
    elPlyrResult.innerHTML = playerRoll;
    elOpptResult.innerHTML = opponentRoll;
    //tests
    console.log(playerRoll);
    console.log(opponentRoll);
    if (playerRoundScore === opponentRoundScore) {
        return 'draw'
    } else if (playerRoundScore < opponentRoundScore) {
        playerGameScore += 1;
        elPlayerGameScore.innerHTML = playerGameScore;
        return 'player wins the round'
    } else {
        opponentGameScore += 1;
        elOpponentGameScore.innerHTML = opponentGameScore;
        return 'opponent wins the round'
    }
}


function determineWinner (plyrscr,optscr) { //score comparison
    if (plyrscr === optscr) {
        return 'Draw'
    } else if (plyrscr > optscr) {
        return  'Player Wins the Game!'
    } else {
        return 'Opponent Wins the Game!'
    }
}

targetNum = getTarget()
elTargetNum.innerHTML = targetNum;

function playRound1 () {
    elPlayButton.style.display = 'none';
    player.getDice(diceArr);
    opponent.getDice(diceArr);
    opponent.getMoves();
    const playerArr = player.getArr()
    const roundOutcome = playRound(1, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    elRoundTwo.style.display = 'block';
}

function playRound2 () {
    elRoundTwo.style.display = 'none';
    const playerArr = player.getArr()
    const roundOutcome = playRound(2, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    elRoundThree.style.display = 'block';
}

function playFinalRound () {
    elRoundThree.style.display = 'none';
    const playerArr = player.getArr()
    const roundOutcome = playRound(2, targetNum, playerArr);
    elRoundoutcome.innerHTML = roundOutcome;
    const winner = determineWinner(playerGameScore,opponentGameScore)
    elFinalOutcome.innerHTML = winner;
}

elPlayButton.addEventListener('click',playRound1);
elRoundTwo.addEventListener('click',playRound2);
elRoundThree.addEventListener('click',playFinalRound);