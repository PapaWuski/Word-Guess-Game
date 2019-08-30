var listOfGames = [
  "noctis lucis caelum",
  "regis lucis caelum cxiii",
  "lunafreya nox fleuret",
  "gladiolus amicitia",
  "ignis scientia",
  "prompto argentum",
  "ardyn izunia",
  "iedolas aldercapt",
  "ravus nox fleuret",
  "verstael besithia",
  "loqi and caligo",
  "cor leonis",
  "shiva",
  "iris amicitia",
  "cid and cindy",
  "aranea highwind",
  "nyx ulric",
  "libertus ostium",
  "titus drautos",
  "somnus lucis caelum",
  "gilgamesh",
  "aera mirus fleuret",
  "bahamut"
];
var win = 0;
var lose = 0;
var tries = 10;
var wrongGuess = [];
var rightGuess = [];
var screenGuess = document.getElementById("replacetext");
var target = listOfGames[Math.floor(Math.random() * listOfGames.length)];
var container = document.getElementById("tracker");
var board = [];
var targetDist = [...new Set(target)];
console.log(target);
console.log(targetDist);

function resetBoard() {
  board = [];
  for (let i = 0; i < target.length; i++) {
    if (target[i] === " ") {
      board.push("&nbsp;");
    } else {
      board.push("_");
    }
  }
  console.log(board);
  if (targetDist.indexOf(" ") !== -1) {
    targetDist.splice(targetDist.indexOf(" "), 1);
  }
  document.querySelector("#gametext").innerHTML = board.join(" ");
}

function appendLetter(letter) {
  for (let i = 0; i < target.length; i++) {
    if (target[i] === letter) {
      board[i] = letter.toUpperCase();
      document.querySelector("#gametext").innerHTML = board.join(" ");
    }
  }
}

function resetGame() {
  target = listOfGames[Math.floor(Math.random() * listOfGames.length)];
  targetDist = [...new Set(target)];
  resetBoard();
  console.log(target);
  console.log(targetDist);
  tries = 10;
  wrongGuess = [];
  rightGuess = [];
  document.querySelector("#attempts").innerHTML = tries;
  document.querySelector("#uiGuess").innerHTML = wrongGuess;
}

function logScore(endGame) {
  var paragraph = document.createElement("P");
  paragraph.innerText = `Game#: ${win + lose}| ${endGame}
                        Goal: ${target.toUpperCase()}
                        Guesses Remaining: ${tries}`;
  if (endGame === "Win") {
    paragraph.setAttribute("class", "bg-primary text-light p-1");
  } else {
    paragraph.setAttribute("class", "bg-danger text-light p-1");
  }

  container.insertBefore(paragraph, container.firstChild);
}

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
  var userInput = event.key.toLowerCase();
  if (targetDist.includes(userInput) && !rightGuess.includes(userInput)) {
    rightGuess.push(userInput);
    appendLetter(userInput);
    console.log("right", rightGuess);
  } else if (
    !wrongGuess.includes(userInput) &&
    !rightGuess.includes(userInput)
  ) {
    tries--;
    wrongGuess.push(userInput);
    document.querySelector("#attempts").innerHTML = tries;
    document.querySelector("#uiGuess").innerHTML = wrongGuess
      .join(" ")
      .toUpperCase();
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
resetBoard();
