/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer;

scores = [0, 0];
roundScore = 0;
activePlayer = 0;

saikoro = Math.floor(Math.random() * 6);

document.querySelector('.dice').style.display = 'none';

document.getElementById('score-0').innerHTML = 0;
document.getElementById('current-0').innerHTML = 0;
document.getElementById('score-1').innerHTML = 0;
document.getElementById('current-1').innerHTML = 0;


//Roll Dice
const btnRoll = document.querySelector('.btn-roll');

//無名関数（再利用できない
btnRoll.addEventListener('click', function () {

    //random number
    var saikoro = Math.floor(Math.random() * 6) + 1;

    //display dice
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = "dice-" + saikoro + ".png";

    //１じゃなければ現在の点数アップデート
    if (saikoro !== 1) {
        roundScore += saikoro;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        //Next Player（１が出た時の処理）

        //Round Scoreをリセット
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        //三項演算子（もしactivePlayer===0なら？should be 1 /else:should be 0
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

        //下記の式と同じ
        // if (activePlayer === 0) {
        //     activePlayer = 1;
        // } else {
        //     activePlayer = 0;
        // }

        //Active Player Change
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');

        document.querySelector('.dice').style.display = 'none';


    }

});
