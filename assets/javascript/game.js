var listOfGames =["megaman","firefighter"];
var wrongGuess = [];
var rightGuess = [];
var screenGuess = document.getElementById("replacetext");
var target = listOfGames[Math.floor(Math.random() * listOfGames.length)];

console.log(target)
var targetDist = [...new Set(target)]
console.log(targetDist)
// document.onkeypress = function(event) {
//     console.log(event.key);
//     if (target.indexOf(event.key) === -1 && wrongGuess.indexOf(event.key) === -1) {
//         wrongGuess.push(event.key);
//     }else{
//         console.log(wrongGuess);
//     }
// }
document.onkeypress = function(event) {
    // console.log(event.key);
    if (targetDist.includes(event.key) && !rightGuess.includes(event.key)) {
        rightGuess.push(event.key);
        console.log("right",rightGuess);
    }else if(!wrongGuess.includes(event.key) && !rightGuess.includes(event.key)){
        wrongGuess.push(event.key);
        console.log("wrong",wrongGuess);
    }else{
        console.log("Already Guessed that letter");
    }
    document.querySelector("#replacetext").innerHTML = wrongGuess;
    if(targetDist.length === rightGuess.length){
        console.log("you win");
    }
}