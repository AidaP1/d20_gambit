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
    _order: 'sling',
    get moves () {
        return this._moves;
    },
    get currentDice () {
        return this._currentDice;
    },
    get diceTrackString () {
        return this._diceTracker.join(', ');
    },
    getMoveOrder: function () {
        let o = Math.floor(Math.random() * 4)
        switch (o) {
            case 0:
            this._order = 'normal';
            break;
            case 1:
            this._order = 'reverse';
            break;
            case 2:
            this._order = 'twist';
            break;
            default:
            this._order = 'sling';
            break;
        }
        //console.log(this._order)
    },
    getDice: function (array) { //push the dice into an array ordered highest to lowest
        array.forEach(dice => this._startingDice.push(dice));
        this._startingDice.sort((a , b) => b - a);
        this._startingDice.forEach(function (dice) {
             this._currentDice.push(dice);
             this._diceTracker.push(dice);
        })
    },
    updateDiceTrack: function (arr) {
        arr.forEach(function (item,index) {
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
        for (i = 1; i < Math.min(availDice,2); i++) { //runs the function up to twice, whilst leaving enough dice for subsequent rounds - stops opponent selling out to win 1 round

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
    getMoves: function () { //runs the nextBestMove function to create moves for each round. Then mutates the array to provide unexpected behaviour in the roll order
        for (let i = 0; i < rounds - 1; i++) {
            this.getNextBestMove(i)
        }
        this._moves.push(this._currentDice);
        this.getMoveOrder();
        let arr = [];
        this._moves.forEach(i => arr.push(i))
        if (this._order === 'reverse') {
            this._moves.reverse();
        };
        if (this._order === 'twist') {
            this._moves[0] = arr[1];
            this._moves[1] = arr[0];
        }
        if (this._order === 'sling') {
            this._moves[1] = arr[2];
            this._moves[2] = arr[1];
        }
    }    
}

const player = { //stores info about the player
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
    getArr: function () { // gets the chosen dice from the HTML checkbox
        let index;
        let roundArr = [];
        if (elPlayerD4.checked === true) {
            roundArr.push(4); 
            document.getElementById('d4-box').style.display = 'none'; // hides the box to prevent re-use
            elPlayerD4.checked = false; // unticks the box for future rounds
            index  = this._currentDice.indexOf(4); //removes from the 'remaining dice' array
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
    checkInput: function () { // verifys that the player has chosen some input
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

function getTarget () { // chosee a random number 1-20
    return Math.floor(Math.random() * 20 + 1)
}

function rollMove (diceToRollArr) { //takes the player/oponent dice for the round and rolls them
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

function updateDice() { //updaes the visible remaining dice
    elPlayerRemainingDice.innerHTML = player.currentDiceString;
    elOpponentRemainingDice.innerHTML = opponent.diceTrackString;
}

function startGame () { // deal dice, computer plans it's moves
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


function playRound1 () { // rolls a round
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

function playRound2 () { // rolls a round
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

function playFinalRound () { // rolls a round
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

function reset () { //emptys arrays,resets visual elements, etc
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
    document.getElementById('d4-box').style.display = '';
    document.getElementById('d6-box').style.display = '';
    document.getElementById('d8-box').style.display = '';
    document.getElementById('d10-box').style.display = '';
    document.getElementById('d12-box').style.display = '';
    elStartButton.style.display = 'block';
    elPlayerGameScore.innerHTML = playerGameScore;
    elOpponentGameScore.innerHTML = opponentGameScore;
    elPlyrResult.innerHTML = '0';
    elOpptResult.innerHTML = '0';
    elRoundoutcome.innerHTML = '';
    elFinalOutcome.innerHTML = '';
    elTargetNum.innerHTML = '';
}

function showInstructions () { 
    document.getElementById('how-to-play').style.visibility = 'visible';
}

function hideInstructions () {
    document.getElementById('how-to-play').style.visibility = 'hidden'
}

document.getElementById('show-aside').addEventListener('click',showInstructions);
document.getElementById('close-aside').addEventListener('click',hideInstructions);

elStartButton.addEventListener('click',startGame);
elPlayButton.addEventListener('click',playRound1);
elRoundTwo.addEventListener('click',playRound2);
elRoundThree.addEventListener('click',playFinalRound);
elResetButton.addEventListener('click',reset)