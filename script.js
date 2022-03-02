// array of level objects
let levels = [];
levels.push(new level(1, 60, 1, 100));
levels.push(new level(2, 45, 1, 100));
levels.push(new level())

// create a new level
let level1 = new level(1, 60, 1, 100);
console.log(level1);


// save the user's username to localStorage
const txtUsername = document.getElementById("username");
const saveButton = document.getElementById("saveButton");
saveButton.addEventListener('click', ()=> {
  let username = txtUsername.value;
  localStorage.setItem("username", username);
});

let username = localStorage.getItem("username");
txtUsername.value = username;

// variables to storethe HTML elements we need in our script
const txtGuess = document.getElementById("guess");
const btnSubmit = document.getElementById("submit");
const scoreProgress = document.getElementById("scoreProgress");
const olUserGuesses = document.getElementById("guesses");
const spanSecret = document.getElementById("secret");
const spanAttemptsRemaining = document.getElementById("attemptsRemaining");

// generate a random number between 1-100 when the page is loaded
const numSecret = Math.floor(Math.random() * 100) + 1;


// score will be based on number of attemps
// user will be given 10 points at the beginning 
// and will lose 1 point for each incorrect guess
let numScore = 10;

function determineOutcome()
{
  let numGuess = Number(txtGuess.value);
  if (Number.isInteger(numGuess) && numGuess >= 1 && numGuess <= 100) {
    if (numGuess === numSecret) {
      alert("you win!");
      spanSecret.textContent = numSecret;
    }
    else if (numGuess < numSecret) {
      numScore--;
      scoreProgress.value = numScore;
			spanAttemptsRemaining.textContent = numScore;
      let li = document.createElement('li');
      li.textContent = `${numGuess} is too low`;
      olUserGuesses.appendChild(li);
    }
    else {
      numScore--;
      scoreProgress.value = numScore;
      let li = document.createElement('li');
      li.textContent = `${numGuess} is too high`;
      olUserGuesses.appendChild(li);
    }
  }
  else {
    alert("Please enter a valid whole number");
  }
  txtGuess.value = "";
  if (numScore === 0) {
		spanSecret.textContent = numSecret;
    alert("game over");
  }
}


// determine if the user's guess was too high, too low, or a match 
// when the button is clicked
btnSubmit.addEventListener('click', () => {
  determineOutcome();
});

txtGuess.addEventListener('keydown', (e)=> {
  if (e.key === 'Enter')
  {
    determineOutcome();
  }
});
