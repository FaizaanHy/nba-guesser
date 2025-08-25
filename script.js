// ================================
// SECTION 1: Load Data
// ================================
let players = [];
let currentPlayer;

fetch("data/players.json")
  .then(response => response.json())
  .then(data => {
    players = data;
    pickRandomPlayer();
  });

// ================================
// SECTION 2: Pick Random Player
// ================================
function pickRandomPlayer() {
  const randomIndex = Math.floor(Math.random() * players.length);
  currentPlayer = players[randomIndex];

  // Display image (blurred at first)
  const img = document.getElementById("player-image");
  img.src = currentPlayer.image;

  img.style.filter = "blur(20px)"; // always blur at start of new round


  // Display stats
  document.getElementById("ppg").textContent = "PPG: " + currentPlayer.ppg;
  document.getElementById("apg").textContent = "APG: " + currentPlayer.apg;
  document.getElementById("rpg").textContent = "RPG: " + currentPlayer.rpg;
}

// ================================
// SECTION 3: Handle Guess
// ================================
document.getElementById("submit-btn").addEventListener("click", () => {
  const userGuess = document.getElementById("guess-input").value.trim().toLowerCase();
  const correctAnswer = currentPlayer.name.toLowerCase();

  if (userGuess === correctAnswer) {
  document.getElementById("feedback").textContent = "✅ Correct! It's " + currentPlayer.name;
  
  const img = document.getElementById("player-image");
  img.style.filter = "none"; // reveal image

  document.getElementById("play-again-btn").style.display = "inline-block"; // show button
} else {
  document.getElementById("feedback").textContent = "❌ Try again!";
}

});

// ================================
// SECTION 4: Play Again Function
// ================================
function playAgain() {
  document.getElementById("guess-input").value = ""; // clear input
  document.getElementById("feedback").textContent = ""; // clear feedback
  document.getElementById("play-again-btn").style.display = "none"; // hide button

  pickRandomPlayer(); // load a new player
}

document.getElementById("play-again-btn").addEventListener("click", playAgain);


