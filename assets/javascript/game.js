var listOfGames = ["megaman", "firefighter"];
var win = 0;
var lose = 0;
var tries = 10;
var wrongGuess = [];
var rightGuess = [];
var screenGuess = document.getElementById("replacetext");
var target = listOfGames[Math.floor(Math.random() * listOfGames.length)];
var container = document.getElementById("tracker");

function resetGame() {
    target = listOfGames[Math.floor(Math.random() * listOfGames.length)];
  console.log(target);
  tries = 10;
  wrongGuess = [];
  rightGuess = [];
  document.querySelector("#attempts").innerHTML = tries;
  document.querySelector("#uiGuess").innerHTML = wrongGuess;
}

function logScore(endGame) {
  var paragraph = document.createElement("P");
  paragraph.textContent = `Game#: ${win + lose} |
    ${endGame} | Goal: ${target} `;
  if (endGame === "Win") {
    paragraph.setAttribute("class", "bg-primary text-light p-1");
  } else {
    paragraph.setAttribute("class", "bg-danger text-light p-1");
  }

  container.appendChild(paragraph);
}
console.log(target);
var targetDist = [...new Set(target)];
console.log(targetDist.join(" "));

document.onkeypress = function(event) {
  // console.log(event.key);
  if (
    !(
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    )
  ) {
    console.log("invalid letter");
    return;
  }
  if (targetDist.includes(event.key) && !rightGuess.includes(event.key)) {
    rightGuess.push(event.key);
    console.log("right", rightGuess);
  } else if (
    !wrongGuess.includes(event.key) &&
    !rightGuess.includes(event.key)
  ) {
    tries--;
    wrongGuess.push(event.key);
    document.querySelector("#attempts").innerHTML = tries;
    document.querySelector("#uiGuess").innerHTML = wrongGuess.join(" ");
    console.log("wrong", wrongGuess);
    if (tries === 0) {
      lose++;
      document.querySelector("#loseScore").innerHTML = lose;
      logScore("Lose");
      resetGame();
    }
  } else {
    console.log("Already Guessed that letter");
  }
  if (targetDist.length === rightGuess.length) {
    console.log("you win");
    win++;
    document.querySelector("#winScore").innerHTML = win;
    logScore("Win");
    resetGame();
  }
};
