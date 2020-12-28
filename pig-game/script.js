"use strict";

// Grab score elements:
// The two are basically the same (second is a theoretically a bit faster).
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

// Grab button elements:
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Set initial scores
score0El.textContent = 0;
score1El.textContent = 0;
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;

// Hide dice image on startup
document.querySelector(".dice").classList.add("hidden");

// Implement dice-roll functionality:
// 1. User rolls dice
// 2. Display dice roll
// 3. Is it a one?
// 4. No -> add dice to current score + display
// 4. Yes -> switch player + reset score + display

// Create swtich player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // do visual change:
  // toggle adds class if it is present, removes if it is
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    // Generate random roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice roll
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    // Is it a one?
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      // grab active player using the template literal
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// On hold, save current score to total score + switch player
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    // add current score to score of active player
    scores[activePlayer] += currentScore;
    currentScore = 0;
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score >= 100. if yes, finish game
    if (scores[activePlayer] >= 20) {
      // Finish the game - assign player winner class
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      // Hide dice
      diceEl.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  // All the below should be wrapped in a "newGame" function, but
  // i can't be bothered.
  // Set scores to starting conditions
  scores[0] = 0;
  scores[1] = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--winner");
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove("player--active");

  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add("player--active");
});
