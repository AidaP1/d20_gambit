<!DOCTYPE html>
<html>
    <head>
        <title>D20 Gambit</title>
        <meta charset="UTF-8">
        <script src="scripts/script.js" defer></script>
        <link href="resources/css/style.css" rel="stylesheet" type="text/css">
    </head>
    <body>
        <header>
            <h1>Care for a game?</h1>
            <aside id="how-to-play">
                <h3>How to play</h3>
                <p>D20 Gambit is a game of luck and skill! Each player is given 5 dice, and they play head-to-head
                    for three rounds. In each round, each player chooses from their remaining dice pool, rolling the dice
                    to try and get the closest match to the target number.
                <ul>
                    <li>The target number is rolled at the start and does not change</li>
                    <li>Each player gets the same set of Dice</li>
                    <li>You must play at least one dice in every round</li>
                    <li>You cannot have any dice left over at the end of the game</li>
                </ul>
                </p>
                <button id="close-aside">Close</button>
            </aside>
            <nav>
                <button id="show-aside">Instructions</button>
            </nav>
        </header>
        <main>
            <div class="target">
                <h3>Target Number:</h3> <h3 id="targetNum">0</h3>
            </div>
            <div class="game">
                <section class="partcipant">
                    <h2>Player</h2>
                    <table>
                        <tr>
                            <td>Total Score :</td>
                            <td id="playerGameScore">0</td>
                        </tr>
                        <tr>
                            <td>Remaining Dice : </td>
                            <td id="playerRemainingDice"></td>
                        </tr>
                    </table>
                    <form id="playerInputs">
                        <p>Choose your dice:</p>
                        <div id="d4-box" class="dice">
                            <label for="d4">d4</label>
                            <input id="d4" name="playerdice" type="checkbox" value="4">
                       </div>
                       <div id="d6-box" class="dice">
                            <label for="d6">d6</label>
                            <input id="d6" name="playerdice" type="checkbox" value="6">
                        </div>
                        <div id="d8-box" class="dice">
                            <label for="d8">d8</label>
                            <input id="d8" name="playerdice" type="checkbox" value="8">
                        </div>
                        <div id="d10-box"class="dice">
                            <label for="d10">d10</label>
                            <input id="d10" name="playerdice" type="checkbox" value="10">
                        </div>
                        <div id="d12-box" class="dice">
                            <label for="d12">d12</label>
                            <input id="d12" name="playerdice" type="checkbox" value="12"> 
                        </div>
                    </form>
                </section>
                <section class="partcipant">
                    <h2>Opponent</h2>
                    <table>
                        <tr>
                            <td>Total Score :</td>
                            <td id="opponentGameScore">0</td>
                        </tr>
                        <tr>
                            <td>Remaining Dice : </td>
                            <td id="opponentRemainingDice"></td>
                        </tr>
                    </table>
                </section>
            </div>
            <section class="results">
                <button id="startGame">Start</button>
                <button id="playGame">Play</button>
                <button id="roundTwo">Next Round</button>
                <button id="roundThree">Final Round</button>
                <button id="reset">Reset</button>
                <h2>Results</h2>
                <p>You Rolled a total of: </p><p id="plyrResult">0</p><br>
                <p>Your opponent rolled a total of: </p><p id="oppntResult">0</p><br>
                <h3 id="roundOutcome"></h3>
                <h1 id="finalOutcome"></h1>
            </section>
        </main>
    </body>
</html>