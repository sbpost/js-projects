'use strict';

// To change the selector content, access and assign:
/* document.querySelector('.message').textContent = 'Correct number!';
document.querySelector('.number').textContent = 99;
document.querySelector('.score').textContent = 13;

document.querySelector('.guess').value = 300;
 */

// Define the "secret number" (the number we have to guess)
// Random number between 1 and 20. (+1 because otherwise it
// is between 0 and 19)
let secret_number = Math.trunc(Math.random() * 20) + 1;
document.querySelector('.number').textContent = '?';

let score = 20;
let highscore = 0;
document.querySelector('.score').textContent = score;

// Handling click events requires event handlers:
// One way is to create an event listener.

// We want to listen for an event on the guessing button
document.querySelector('.check').addEventListener(
  // type of event:
  'click',
  // event handler function:
  function () {
    const guess = Number(document.querySelector('.guess').value);

    // We can also do DOM manipulation inside the event
    // handler.
    // document.querySelector('.message').textContent = `You guessed ${guess}!`;

    // GAME LOGIC
    // If there is no guess (0 is falsy) it is converted to false
    let text_cont;
    if (!guess) {
      text_cont = 'NO number!';
    } else if (guess === secret_number) {
      // If player wins:
      // Give them message:
      text_cont = "That's correct! You won!";
      // Change view
      document.querySelector('body').style.backgroundColor = '#60b347';
      // Change width of number
      document.querySelector('.number').style.width = '30rem';
      // Show winning number
      document.querySelector('.number').textContent = secret_number;
      // If higher than highscore, change highscore
      if (score > highscore) {
        document.querySelector('.highscore').textContent = score;
      }
    } else if (guess < secret_number) {
      if (score > 1) {
        text_cont = 'That is too low.';
        score--;
      } else {
        text_cont = 'YOU LOST!';
        score = 0;
      }
    } else if (guess > secret_number) {
      if (score > 1) {
        text_cont = 'That is too high.';
        score--;
      } else {
        text_cont = 'YOU LOST!';
        score = 0;
      }
    }
    document.querySelector('.message').textContent = text_cont;
    document.querySelector('.score').textContent = score;
  }
);

// Add new event listener that resets game
document.querySelector('.again').addEventListener(
  // type of event:
  'click',
  // event handler function:
  function () {
    // reset css
    // Change bg color
    document.querySelector('body').style.backgroundColor = '#222';
    // Change width of number
    document.querySelector('.number').style.width = '15rem';

    // reset text
    document.querySelector('.message').textContent = 'Start guessing...';
    // reset score
    score = 20;
    document.querySelector('.score').textContent = score;

    // choose new random number
    secret_number = Math.trunc(Math.random() * 20) + 1;

    // hide random number
    document.querySelector('.number').textContent = '?';

    // empty guess
    document.querySelector('.guess').value = '';
  }
);
