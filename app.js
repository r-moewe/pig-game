/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

saikoro = Math.floor(Math.random() * 6);



//Roll Dice
const btnRoll = document.querySelector('.btn-roll');

//無名関数（再利用できない
btnRoll.addEventListener('click', function () {
    if (gamePlaying) {


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

            //下記の式と同じ
            // if (activePlayer === 0) {
            //     activePlayer = 1;
            // } else {
            //     activePlayer = 0;
            // }

            //Active Player Change
            changePlayer();
        }
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

        //プレイヤーがゲームクリアかどうかチェック

        if (scores[activePlayer] >= 20) {
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

}

//New Game
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    //状態変数

    gamePlaying = true;

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




