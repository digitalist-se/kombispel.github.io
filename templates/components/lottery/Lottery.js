/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket

var userNumbers = [9,5,2,5,3]
// All the correct numbers

var winningNumbers = {
first: [
  [6,5,4,5,7]
],
second: [
  [4,5,2,8,4],
  [6,5,4,5,7],
  [9,3,8,8,6],
  [1,5,3,3,4]
],
third: [
  [3,4,5,3,4],
  [1,3,4,9,2],
  [3,3,6,7,8],
  [0,5,2,8,4],
  [6,5,4,5,7],
  [3,3,6,8,6],
  [3,3,8,7,4]
]
}

var correctNumbers = [
  [3,4,5,3,4], // 1 rätt
  [1,3,4,9,2], // 1 rätt
  [3,3,6,7,8], // Alla rätt
  [0,5,2,8,4], // Alla Fel
  [1,1,6,5,3], // Alla Fel
  [3,3,6,8,6], // 0, 1, 2 rätt
  [3,3,8,7,4]  // 0, 1, 3 rätt
]
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
var correctAmount = [];
var winning = false;

var correctAmount2 = {
  first: [],
  second: [],
  third: []
};

for (var key in winningNumbers) {

  for (var i = 0; i < winningNumbers[key].length; i++) {
    let correct = 0;
    // console.log(winningNumbers[key][i]);
    for (var  j= 0; j < winningNumbers[key][i].length; j++) {
      // console.log(winningNumbers[key][i][j]);
      if(winningNumbers[key][i][j] === userNumbers[j])
      {
          correct++;
      }
    }
    correctAmount2[key].push(correct);
  }
}

console.log(correctAmount2);




// Function to push the value to the array
checkArray = (x) => {
  let correct = 0;
  for (var i = 0; i < correctNumbers[x].length; i++) {
      if(correctNumbers[x][i] === userNumbers[i]) {
      correct++;
      }
    }
    correctAmount.push(correct);
}



// Call the function
for (var i = 0; i < correctNumbers.length; i++) {
checkArray(i);
}
// console.log(correctAmount);
// console.log(correctAmount);


// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);
if(highestNumber === userNumbers.length) {
  winning = true;
}
// The array that we are gonna use in the animation and compare with
var drawArray = correctNumbers[correctAmount.indexOf(highestNumber)];


// console.log(drawArray);

// console.log(drawArray+" är den närmaste och den vi kommer utgå från");

/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var lotteryNumbers = document.getElementsByClassName('Lottery-number');

var spinnInterval = 200; // Interval for spinn start for each number

for (var i = 0; i < userNumbers.length; i++) {
  for (var j = 0; j < 10; j++) {
  var number = document.createElement("div");
  if(j == userNumbers[i]) {
  number.innerHTML = j;
  // number.className = "";
  } else {
  // number.className = "";
  number.innerHTML = j;
  }
  lotteryNumbers[i].appendChild(number)
  }
}

/////////////////////////////////////////////
// START ROLLING THE NUMBERS
/////////////////////////////////////////////
var counter = 0;

var startInterval = true; // Set to true if the spinner should start at the same time

function rollNumbers() {

if(startInterval) {

    if(counter<lotteryNumbers.length)
      {
        lotteryNumbers[counter].className = "Lottery-number Lottery-number--spinning";
        setTimeout(function()
        {
          rollNumbers()
        }, spinnInterval
      );
         counter++;
      }
} else {
  for (var i = 0; i < lotteryNumbers.length; i++) {
    lotteryNumbers[i].className = "Lottery-number Lottery-number--spinning";
  }
}
}


var y = 0;
var spinnTime = 2500; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( userNumbers[0] / 10);

function correct() {

  var stop = 4000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < userNumbers.length)
    {
      if(userNumbers[y+1] > userNumbers[y]) {
        diff = userNumbers[y+1] - userNumbers[y];
      }
      else {
        diff = 10 - (userNumbers[y] - userNumbers[y+1]);
      }

      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);

      lotteryNumbers[y].className = "Lottery-number";

      if(userNumbers[y] === drawArray[y]) {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+userNumbers[y]+"</div>";
      } else {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-wrong'>"+userNumbers[y]+"</div>";
      }

      setTimeout(function()
      {
        correct()
      },
      stop
    );
       y++;
    }
}


var startButton = document.getElementsByClassName("Start-lottery--js")[0];

startButton.addEventListener("click",function() {
  rollNumbers();
  setTimeout(function(){ correct(); }, spinnTime+ratio);
})









});
