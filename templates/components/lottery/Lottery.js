/////////////////////////////////////////////
// API
/////////////////////////////////////////////
var xmlhttp = new XMLHttpRequest();
var url = "api/test.json";

xmlhttp.onreadystatechange = function() {
  if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    var lotteryNumbers = JSON.parse(xmlhttp.responseText);
// Instances of api response
    var correctNumbers = lotteryNumbers.correctNumbers;
    var myNumbers = lotteryNumbers.myNumbers;
/////////////////////////////////////////////
// Variables which will be reset
/////////////////////////////////////////////
    var winning = false;
    var objectCounter = 0;
    var correctAmount; // Will be an array
    var winningsOnTicket = 0;
/////////////////////////////////////////////
// SET INITIAL STATE OF APPLICATION
/////////////////////////////////////////////
// Get single element by classname
function getClass(className) {
  return document.getElementsByClassName(className)[0];
}
// Set My Lottery-number
var myLotteryNumber = getClass("Lottery-mynumber--js")
myLotteryNumber.innerHTML = myNumbers.toString().replace(/^[,]$|[,]+/g,"");
// Lottery status
var lotteryStatus = getClass("js-Lottery-status")
var lotteryRow = getClass("js-Lottery-row");
// Set Lottery-row
var lotteryNumbers = document.getElementsByClassName('js-Lottery-number');
var lotteryHeader = getClass("js-Lottery-price-header");
// Backgrounds
var rotateBG = getClass("js-Lottery-starburst-bg");

function startLottery () {
  lotteryStatus.innerHTML = "<span class='js-Lottery-ongoing'>Dragning pågår</span><span class='js-Lottery-spinner--small'></span>";
  rotateBG.className = "js-Lottery-starburst-bg"

  // Clear numbers after first iteration
    for (var i = 0; i < lotteryNumbers.length; i++) {
      lotteryNumbers[i].innerHTML = "";
    }
  // Add new numbers
  for (var i = 0; i < lotteryNumbers.length; i++) {
    for (var l = 0; l < 2; l++) {
      for (var j = 0; j < 10; j++) {
      var number = document.createElement("div");
      number.innerHTML = j;
      lotteryNumbers[i].appendChild(number)
      }
    }
  }
 // CHANGE THE HEADER
lotteryHeader.className = "js-Lottery-price-header";
lotteryHeader.innerHTML = correctNumbers[objectCounter].header+" kr!";
lotteryMessage.innerHTML = "";
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
correctAmount = [];
// Function to push the value to the array
function checkArray(winningNumbers) {
  // console.log(winningNumbers);
  var correct = 0;

  if(objectCounter == (correctNumbers.length-1)) {
    for (var i = 0; i < winningNumbers.length; i++) {
        if(i < 3) { // ALWAYS CORRECT FOR THE FIRST THREE
            correct++;
        } else {
          if(winningNumbers[i] === myNumbers[i]) {
          correct++;
          }
        }
    }
  } else {
    for (var i = 0; i < winningNumbers.length; i++) {
          if(winningNumbers[i] === myNumbers[i]) {
          correct++;
        }
    }
  }
  correctAmount.push(correct);
}
// Call the function
for (var i = 0; i < correctNumbers[objectCounter].numbers.length; i++) {
  checkArray(correctNumbers[objectCounter].numbers[i])
}
// Check which number is the highest in the array
 function getMaxOfArray(numArray) { return  Math.max.apply(null, numArray) };
// Get the number
var highestNumber = getMaxOfArray(correctAmount);

if(highestNumber === myNumbers.length) {
  winning = true;
  winningsOnTicket++;
} else {
  winning = false;
}
// The array that the drawing will be based on
var drawArray = correctNumbers[objectCounter].numbers[correctAmount.indexOf(highestNumber)];
var spinnInterval = 100; // Interval for spinn start for each number
var counter = 0;
var startInterval = true; // Set to true if the spinner should start at the same time
/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
function rollNumbers () {
if(startInterval) {
    if(counter<lotteryNumbers.length)
      {
        lotteryNumbers[counter].className = "js-Lottery-number js-Lottery-number--spinning";
        setTimeout(function()
        {
          rollNumbers()
        }, spinnInterval
      );
         counter++;
      }
} else {
  for (var i = 0; i < lotteryNumbers.length; i++) {
    lotteryNumbers[i].className = "js-Lottery-number js-Lottery-number--spinning";
  }
}
}
var y = 0;
var spinnTime = 1700; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( drawArray[0] / 10);
function correct () {
  var stop = 2000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < drawArray.length)
    {
      /////////////////////////////////////////////
      // LOGIC FOR WHEN EACH NUMBER SHOULD STOP
      /////////////////////////////////////////////
      if(drawArray[y+1] > drawArray[y]) {
        diff = drawArray[y+1] - drawArray[y];
      }
      else {
        diff = 10 - (drawArray[y] - drawArray[y+1]);
      }
      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);
      lotteryNumbers[y].className = "js-Lottery-number";
      /////////////////////////////////////////////
      // COLOR OF EACH NUMBER
      /////////////////////////////////////////////
      if(objectCounter == (correctNumbers.length-1)) { // IF ITS THE LAST ROUND THE FIRST THE FIRST THREE NUMBERS SHOULD BE DISREGARDED
        if(y<3) {
          lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+drawArray[y]+"</div>";
        } else {
          colorNumber(y)
        }
      } else {
        colorNumber(y)
      }
      setTimeout( function()
      {
        correct()
      },
      stop
    );
       y++;
    } else {
      drawingDone()
    }
}
function colorNumber(i) {
  if(drawArray[i] === myNumbers[i]) {
    lotteryNumbers[i].innerHTML = "<div class='Lottery-correct'>"+drawArray[i]+"</div>";
  } else {
    lotteryNumbers[i].innerHTML = "<div class='Lottery-wrong'>"+drawArray[i]+"</div>";
  }
}
rollNumbers();
setTimeout( function(){ correct(); }, spinnTime+ratio);
}


/////////////////////////////////////////////
// END STARTLOTTERY FUNCTION
/////////////////////////////////////////////
var lotteryBtn = getClass("js-Start-lottery-btn");
lotteryBtn.addEventListener("click",function() {
  startLottery();
  this.className += " Hide-element";
})

/////////////////////////////////////////////
// GET DOM
/////////////////////////////////////////////
var messageContainer = getClass("Lottery-message-container");
var lotteryMessage = getClass("js-Lottery-message");
var winningLinks = getClass("js-Lottery-winnings-links");
var extraChance = getClass("js-Lottery-extrachance-container");

var ticket = getClass("Tickets-ticket");
var status = "";
/////////////////////////////////////////////
// *
// WHEN A DRAWING ROUND IS DONE
// *
/////////////////////////////////////////////
function drawingDone()  {
  // Let the numberheader fadeout
  // lotteryHeader.className += " Hide-element";

  if(winning) {
    status = "Vinst!"
    rotateBG.className += " Lottery-rotate-bg"
  } else {
    status = "Ingen vinst!"
  }
  lotteryHeader.innerHTML = status;


  /////////////////////////////////////////////
  // COUNTDOWN FUNCTIONALITY
  /////////////////////////////////////////////

  objectCounter++; // Counter for the iteration in the JSON RESPONSE
  if(objectCounter < correctNumbers.length) {

    var count = 5;
    lotteryMessage.innerHTML = "Nästa dragning för <span class='u-bold'>"+correctNumbers[objectCounter].header+" kr</span> om:<span class='js-Lottery-countdown-c'><span class='js-Lottery-spinner--big'></span><span class='js-Lottery-countdown'>"+count+"</span></span>";
    var myVar;
    function myFunction() {
      myVar = setInterval(function(){ countDown() }, 1000);
    }
    function myStopFunction() {
        clearTimeout(myVar);
    }
    function countDown() {
      count--;

      lotteryMessage.innerHTML = "Nästa dragning för <span class='u-bold'>"+correctNumbers[objectCounter].header+" kr</span> om:<span class='js-Lottery-countdown-c'><span class='js-Lottery-spinner--big'></span><span class='js-Lottery-countdown'>"+count+"</span></span>";

      if(count < 1) {
        startLottery();
        myStopFunction();
      }
    }
    myFunction();
    // END COUNTDOWN FUNCTIONALITY
    lotteryStatus.innerHTML = "";
  }
  /////////////////////////////////////////////
  // WHEN ALL ROUNDS ARE DONE
  /////////////////////////////////////////////
  else {
  lotteryStatus.innerHTML = "";

  if(winningsOnTicket > 0){
    lotteryHeader.innerHTML = "Dragning klar, du vann!";
    ticket.className += "-win";
    rotateBG.className += " Lottery-rotate-bg";
    if (winningLinks) {
      winningLinks.style.display = "block";
    }
  } else {
    lotteryHeader.innerHTML = "Tyvärr - ingen vinst denna gång";
    ticket.className += "-lose";
    if (extraChance) {
      extraChance.style.display = "block";
    }
  }
    lotteryRow.style.display = "none";
    lotteryBtn.style.display = "none";
    lotteryMessage.style.display += "none";
  }
}
/////////////////////////////////////////////
// ******************************************
//           END API
// ******************************************
/////////////////////////////////////////////
} else {
  // console.log("Inget svar från API");
}
}
xmlhttp.open("GET", url, true);
xmlhttp.send();
