/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, check6;

init();

/*
*Roll Dice
 */

const btnRoll = document.querySelector('.btn-roll');
btnRoll.addEventListener('click', function () {
    if (gamePlaying) {

        //random number
        var saikoro = Math.floor(Math.random() * 6) + 1;
        var saikoro2 = Math.floor(Math.random() * 6) + 1;

        //display dice1
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + saikoro + ".png";

        //display dice2
        var diceDOM = document.querySelector('.dice2');
        diceDOM.style.display = 'block';
        diceDOM.src = "dice-" + saikoro2 + ".png";


        //１じゃなければ現在の点数アップデート
        if (check6 === 6 && saikoro === 6) {
            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            changePlayer();
        } else if (saikoro !== 1) {
            roundScore += saikoro;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            //Next Player（１が出た時の処理）

            //Round Scoreをリセット
            roundScore = 0;
            document.getElementById('current-' + activePlayer).textContent = roundScore;

            //下記の式と同じ
            // if (activePlayer === 0) {
            //     activePlayer = 1;
            // } else {
            //     activePlayer = 0;
            // }

            //Active Player Change
            changePlayer();
        }
        check6 = saikoro;

    }
});

/*
*HOLD
*/

const holdBtn = document.querySelector('.btn-hold');
holdBtn.addEventListener('click', function () {

    if (gamePlaying) {

        //現在のスコアをグローバルスコアに加える
        scores[activePlayer] += roundScore;
        roundScore = 0;

        //UI更新
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        //input the goal score
        var inputScore = document.querySelector('.input-score').value;
        var goalScore;

        if (inputScore) {
            goalScore = inputScore;
        } else {
            goalScore = 100;
        }


        //プレイヤーがゲームクリアかどうかチェック

        if (scores[activePlayer] >= goalScore) {
            document.querySelector('#name-' + activePlayer).textContent = "Winner!";
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            changePlayer();
        }
    }
});


function changePlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

    check6 = 0;

}

//New Game
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    //状態変数

    gamePlaying = true;
    check6 = 0;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').innerHTML = 0;
    document.getElementById('current-0').innerHTML = 0;
    document.getElementById('score-1').innerHTML = 0;
    document.getElementById('current-1').innerHTML = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');

    //activeクラスを全て削除後、プレイヤー１にactiveクラス付与
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');



}




