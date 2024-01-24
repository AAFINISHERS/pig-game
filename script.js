'use strict';
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let current0 = document.getElementById('current--0');
let current1 = document.getElementById('current--1');

let playable = true;
let score = [0, 0];
let player = 0;
let currentScore = 0;
const switchPlayer = function () {
  currentScore = 0;
  player = player === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};

const reset = function () {
  score = [0, 0];
  currentScore = 0;
  console.log(score);
  score0.textContent = 0;
  score1.textContent = 0;
  activePlayer0.classList.add('player--active');
  activePlayer1.classList.remove(`player--active`);
  document
    .querySelector(`.player--${player}`)
    .classList.remove('player--winner');
  // taking the decision if the player is 1 then don't switch
  player = player === 1 ? 0 : 0;

  current0.textContent = 0;
  current1.textContent = 0;
  diceEl.classList.add('hidden');
};

score0.textContent = 0;
score1.textContent = 0;

diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  let dice = Math.trunc(Math.random() * 6) + 1;
  if (playable) {
    // GIVING THE DICE NO. AND STORING IT IN THE CURRENT SCORE

    if (dice !== 1) {
      currentScore += dice;
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      document.getElementById(`current--${player}`).textContent = currentScore;

      // switching the player when the dice is 1
    } else if (dice === 1) {
      currentScore = 0;
      document.getElementById(`current--${player}`).textContent = currentScore;
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;
      switchPlayer();
    }
  }
  // functioning the for the hold button
});

btnHold.addEventListener('click', function () {
  score[player] += currentScore;
  console.log(score[player]);
  document.getElementById(`score--${player}`).textContent = score[player];
  currentScore = 0;
  document.getElementById(`current--${player}`).textContent = currentScore;
  if (score[player] >= 100) {
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    diceEl.classList.add('hidden');
    playable = false;
  } else {
    switchPlayer();
  }
});
btnNew.addEventListener('click', function () {
  reset();
  playable = true;
});
