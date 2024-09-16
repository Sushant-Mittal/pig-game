'use strict';

// Selecting elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const currScore0 = document.getElementById('current--0');
const currScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Initializations
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

let currentScore = 0;
let currentPlayer = 0;
let score = [0, 0];
let playing = true;

const switchPlayer = function () {
  currentPlayer++;
  currentPlayer %= 2;
  currentScore = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate a random dice roll
    const roll = Math.floor(Math.random() * 6) + 1;

    // display dice
    dice.classList.remove('hidden');
    const dicesrc = 'dice-' + roll + '.png';
    dice.src = dicesrc;

    // check fpr rolled 1 : if yes move to next player
    if (roll !== 1) {
      // Add dice to current score
      console.log(roll);
      currentScore += roll;
      if (currentPlayer == 0) currScore0.textContent = currentScore;
      else currScore1.textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // Add currentScore to score of active player
    score[currentPlayer] += currentScore;
    if (currentPlayer == 0) score0.textContent = score[currentPlayer];
    else score1.textContent = score[currentPlayer];

    // Check if score now >= 100
    // if yes, finish game
    if (score[currentPlayer] >= 100) {
      playing = false;
      dice.classList.add('hidden');
      if (currentPlayer == 0) {
        player0.classList.remove('player--active');
        player0.classList.add('player--winner');
      } else {
        player1.classList.remove('player--active');
        player1.classList.add('player--winner');
      }
    }
    // else switch player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click',function(){
    currentPlayer = 0;
    currentScore = 0;
    score = [0,0]
    score0.textContent = currentScore;
    score1.textContent = currentScore;
    currScore0.textContent = currentScore;
    currScore1.textContent = currentScore;
    playing = true;
    player0.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--winner');
    player1.classList.remove('player--active');
    dice.classList.add('hidden');
});