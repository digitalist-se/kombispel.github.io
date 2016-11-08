/////////////////////////////////////////////
 //////// START jQuery
 /////////////////////////////////////////////
$(document).ready(function() {
// The customers lotteryticket
var numbers = [2,0,5,5,6,3];

var correctNumbers = [
  {
    header: "1.000.000",
    numbers: [
      [6,5,4,5,6,1]
    ]
  },
  {
    header: "300.000",
    numbers: [
      [1,1,3,3,4,2],
      [2,0,4,5,6,1],
      [0,1,1,1,1,1]
    ]
  },
  {
    header: "100.000",
    numbers: [
      [3,4,5,3,4,5],
      [1,3,4,9,2,3],
      [3,3,6,7,8,2],
      [0,5,2,8,4,9],
    ]
  },
  {
    header: "50.000",
    numbers: [
      [3,4,5,3,4,5],
      [1,3,4,9,2,3],
      [3,3,6,7,8,2],
      [0,5,2,8,4,9],
      [2,3,3,7,8,2],
      [0,5,2,9,9,9],
    ]
  }
]
/////////////////////////////////////////////
// Variables which will be reset
/////////////////////////////////////////////
var winning = false;
var objectCounter = 0;
var correctAmount; // Will be an array

/////////////////////////////////////////////
// SET INITIAL STATE OF APPLICATION
/////////////////////////////////////////////
// Set My Lottery-number
var myLotteryNumber = document.getElementsByClassName("Lottery-mynumber--js")[0];
myLotteryNumber.innerHTML = numbers.toString().replace(/^[,]$|[,]+/g,"");

// Set Lottery-row
var lotteryNumbers = document.getElementsByClassName('Lottery-number');
var lotteryHeader = document.getElementsByClassName("Lottery-price-header")[0];
lotteryHeader.innerHTML = correctNumbers[objectCounter].header;
// for (var i = 0; i < numbers.length; i++) {
//   for (var j = 0; j < 10; j++) {
//   var number = document.createElement("div");
//   number.innerHTML = j;
//   lotteryNumbers[i].appendChild(number)
//   }
// }


const startLottery = () => {
  // Clear it after first iteration
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
lotteryHeader.innerHTML = correctNumbers[objectCounter].header;
lotteryMessage.innerHTML = "Dragning pågår";
// Check how correct each array is in number. Eg
// If an array matches by two digits the value will be two
correctAmount = [];
// var winning = false;
// Function to push the value to the array
checkArray = (winningNumbers) => {
  let correct = 0;
  for (var i = 0; i < winningNumbers.length; i++) {
        if(winningNumbers[i] === numbers[i]) {
        correct++;
        }
  }
  correctAmount.push(correct);
}

// Call the function
for (var i = 0; i < correctNumbers[objectCounter].numbers.length; i++) {
  checkArray(correctNumbers[objectCounter].numbers[i])
}

// Check which number is the highest in the array
getMaxOfArray = (numArray) =>  Math.max.apply(null, numArray);

// Get the number
var highestNumber = getMaxOfArray(correctAmount);

if(highestNumber === numbers.length) {
  winning = true;
}
// The array that the drawing will be based on
var drawArray = correctNumbers[objectCounter].numbers[correctAmount.indexOf(highestNumber)];
/////////////////////////////////////////////
// *
// LOTTERY ANIMATION
// *
/////////////////////////////////////////////
var spinnInterval = 100; // Interval for spinn start for each number




// for (var i = 0; i < drawArray.length; i++) {
//   for (var j = 0; j < 10; j++) {
//   var number = document.createElement("div");
//
//   number.innerHTML = "greer";
//
//   lotteryNumbers[i].appendChild(number)
//   }
// }
/////////////////////////////////////////////
// START ROLLING THE NUMBERS
/////////////////////////////////////////////
var counter = 0;
var startInterval = true; // Set to true if the spinner should start at the same time
const rollNumbers = () => {
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
var spinnTime = 1700; // HOW LONG DOES THE ANIMATION, SYNC WITH CSS FILE
var ratio = spinnTime * ( drawArray[0] / 10);
const correct = () => {
  var stop = 4000; // INITIAL VALUE (Kinda pointless)
  var diff = 0;

  if(y < drawArray.length)
    {
      if(drawArray[y+1] > drawArray[y]) {
        diff = drawArray[y+1] - drawArray[y];
      }
      else {
        diff = 10 - (drawArray[y] - drawArray[y+1]);
      }
      startInterval ? stop = spinnInterval + (( diff * spinnTime )/10) : stop =  (( diff * spinnTime )/10);

      lotteryNumbers[y].className = "Lottery-number";

      if(drawArray[y] === numbers[y]) {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-correct'>"+drawArray[y]+"</div>";
      } else {
        lotteryNumbers[y].innerHTML = "<div class='Lottery-wrong'>"+drawArray[y]+"</div>";
      }

      setTimeout(() =>
      {
        correct()
      },
      stop
    );
       y++;
    } else {
      // Drawing done
      drawingDone()
    }
}
rollNumbers();
setTimeout( function(){ correct(); }, spinnTime+ratio);
}
/////////////////////////////////////////////
// END STARTLOTTERY FUNCTION
/////////////////////////////////////////////

var lotteryBtn = $(".Start-lottery-btn--js");

lotteryBtn.click(function() {
  startLottery();
})

/////////////////////////////////////////////
// After the drawing is done
/////////////////////////////////////////////
var messageContainer = document.getElementsByClassName("Lottery-message-container")[0];
var lotteryMessage = document.getElementsByClassName("Lottery-message--js")[0];


const drawingDone = () => {

  // WHEN THE LAST NUMBER HAS BEEN DRAWED
  if(objectCounter === correctNumbers.length) {
    lotteryBtn.hide();
    return false;
  }

  if(winning) {
    lotteryMessage.innerHTML = "Grattis du vann";
  } else {
    lotteryMessage.innerHTML = "Tyvärr du vann inte "+correctNumbers[objectCounter].header+" kr."
    +"<br>"+
    "Nu drar vi "+correctNumbers[objectCounter+1].header+" kr.";
  }
  objectCounter++;
  lotteryBtn.html("Starta dragning för "+correctNumbers[objectCounter].header+" kr.");


}



});

/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast")
})

/////////////////////////////////////////////
 // SLIDETOGGLE THE HELPBOXES
 ////////////////////////////////////////////
$(".Login-username-toggle--js").click(function() {
  $(".Login-username-help-box--js").slideToggle();
});

$(".Login-password-toggle--js").click(function() {
  $(".Login-password-help-box--js").slideToggle();
});

/////////////////////////////////////////////
// STATE OF THE FORM
/////////////////////////////////////////////
var state = {
  userName: false, // IS CUSTOMERNUMBER OR EMAIL OK
  passWord: false,
  emailReg: false,
  numberReg: false
}

/////////////////////////////////////////////
// USERNAME CHECK
/////////////////////////////////////////////
  // REGEX mail.
var emailReg = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
  // REGEX user number.
var userNumberReg = new RegExp('^[a-zA-Z]{2}[0-9]{6}$');
var validUser;
var userNameMessage = "Du har inte angivet ett korrekt kundnummer eller e-postadress.";
var passwordMessage = "Felaktigt lösenord.";

// INPUT FIELD CHANGE
$('.Login-input-username--js').on('input', function() {

    if(emailReg.test($(this).val()) ) {
      state.emailReg = true;
      state.numberReg = false;
    } else if(userNumberReg.test($(this).val() )) {
      state.numberReg = true;
      state.emailReg = false;
    } else {
      state.numberReg = false;
      state.emailReg = false;
    }

    validUser = state.numberReg || state.emailReg;
      if (validUser) {
        state.userName = true;
      }
      else {
        state.userName = false;
      }
});

// WHEN INPUT IS DONE WITH THE FIELD
$('.Login-input-username--js').focusout(function() {
  // console.log("INPUT NOT IN FOCUS ANY MORE");
  if(state.userName == false) {
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-check-icon--js").addClass("Login-error-icon--js")
    $(this).addClass("Login-input-error--js")
    $(".Login-username-message").show().html(userNameMessage)

  } else {
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-error-icon--js").addClass("Login-check-icon--js")
    $(this).removeClass("Login-input-error--js")
    $(".Login-username-message").hide().html("")
  }

  // WHICH BOX SHOULD SHOW
  if(state.emailReg) {
    passwordBox("reset")
    $(".Login-reset-email--js").html($('.Login-input-username--js').val()) // SET THE EMAIL IN THE MESSAGE TO WHATEVER IT IS IN THE INPUT IF IT IS VALID
  } else {
    passwordBox("default")
  }
})

$(".Login-reset-password-btn--js").click(function(e) {
   e.preventDefault();
  passwordBox("sent")
})

/////////////////////////////////////////////
// PASSWORD HELP BOX
/////////////////////////////////////////////
function passwordBox(box) {
  if(box == "reset") {
    $(".Login-password-reset-box--js").show();
    $(".Login-password-sent-box--js, .Login-password-default-box--js").hide();
  } else if(box == "sent") {
    $(".Login-password-reset-box--js, .Login-password-default-box--js").hide();
    $(".Login-password-sent-box--js").show();
  } else if(box == "default") {
    $(".Login-password-sent-box--js, .Login-password-reset-box--js").hide();
    $(".Login-password-default-box--js").show();
  }
}

/////////////////////////////////////////////
// PASSWORD INPUT FIELD
/////////////////////////////////////////////

$(".Login-input-password--js").on('input', function() {
  if($(this).val() == "kombi") {
    state.passWord = true
  } else {
    state.passWord = false
  }
    if(state.passWord != true) {
      $(".Login-password-message").hide();
    }
    if($(this).hasClass("Login-input-error--js")) {
      $(this).removeClass("Login-input-error--js")
      $(".Login-password-toggle--js").removeClass("Login-error-icon--js").addClass("Login-question-icon--js")
    }
 });

///////////////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
//////////////////////////////////////////////////////
$(".Login-form-submit-btn--js").click(function(e) {
  e.preventDefault(e)
  if(validUser && state.passWord) {
    window.location.replace("account.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".Login-password-toggle--js").removeClass("Login-question-icon--js").addClass("Login-error-icon--js")
    $(".Login-header--js").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".Login-input-password--js").addClass("Login-input-error--js")
    $(".Login-password-message").show().html(passwordMessage)
  }
  else {
    $(".Login-header--js").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".Login-input-password--js").addClass("Login-input-error--js")
    $(".Login-username-toggle--js").removeClass("Login-question-icon--js").removeClass("Login-check-icon--js").addClass("Login-error-icon--js")
    $(".Login-password-toggle--js").removeClass("Login-question-icon--js").addClass("Login-error-icon--js")
    $(".Login-username-message").show().html(userNameMessage)
    $(".Login-password-message").show().html(passwordMessage)
  }
});

/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////

var menuText = $(".Menu-row-title-title");

$(".Menu-row-menu--js").click(function() {
  toggleMenu();
})

$(".Menu-level-one-header--js").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

$(".Menu-overlay--js").click(function() {
  toggleMenu()
})



function toggleMenu() {
  $(".Menu-container").toggleClass("Menu--open")
  $(".Site-container").toggleClass("locked")
  $(".Menu-row-menu--js").toggleClass("Burger--open");

  if(menuText.text() == "meny") {
      menuText.text("stäng meny")
  } else {
    menuText.text("meny")
  }
}


$(".Correct-lottery-btn--js").click(function() {
  $(".Login-header--js").html("Logga in för att rätta din lott")
  $(".Login-overlay-container").fadeIn("fast");
  if($(".Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})

$(".Menu-row-profile--js, .Open-login--js").click(function() {
  $(".Login-header--js").html("Logga in på Min Sida")
    $(".Login-overlay-container").fadeIn("fast");
    if($(".Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLy8vLy8vLyBTVEFSVCBqUXVlcnlcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gVGhlIGN1c3RvbWVycyBsb3R0ZXJ5dGlja2V0XG52YXIgbnVtYmVycyA9IFsyLDAsNSw1LDYsM107XG5cbnZhciBjb3JyZWN0TnVtYmVycyA9IFtcbiAge1xuICAgIGhlYWRlcjogXCIxLjAwMC4wMDBcIixcbiAgICBudW1iZXJzOiBbXG4gICAgICBbNiw1LDQsNSw2LDFdXG4gICAgXVxuICB9LFxuICB7XG4gICAgaGVhZGVyOiBcIjMwMC4wMDBcIixcbiAgICBudW1iZXJzOiBbXG4gICAgICBbMSwxLDMsMyw0LDJdLFxuICAgICAgWzIsMCw0LDUsNiwxXSxcbiAgICAgIFswLDEsMSwxLDEsMV1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICBoZWFkZXI6IFwiMTAwLjAwMFwiLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFszLDQsNSwzLDQsNV0sXG4gICAgICBbMSwzLDQsOSwyLDNdLFxuICAgICAgWzMsMyw2LDcsOCwyXSxcbiAgICAgIFswLDUsMiw4LDQsOV0sXG4gICAgXVxuICB9LFxuICB7XG4gICAgaGVhZGVyOiBcIjUwLjAwMFwiLFxuICAgIG51bWJlcnM6IFtcbiAgICAgIFszLDQsNSwzLDQsNV0sXG4gICAgICBbMSwzLDQsOSwyLDNdLFxuICAgICAgWzMsMyw2LDcsOCwyXSxcbiAgICAgIFswLDUsMiw4LDQsOV0sXG4gICAgICBbMiwzLDMsNyw4LDJdLFxuICAgICAgWzAsNSwyLDksOSw5XSxcbiAgICBdXG4gIH1cbl1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVmFyaWFibGVzIHdoaWNoIHdpbGwgYmUgcmVzZXRcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHdpbm5pbmcgPSBmYWxzZTtcbnZhciBvYmplY3RDb3VudGVyID0gMDtcbnZhciBjb3JyZWN0QW1vdW50OyAvLyBXaWxsIGJlIGFuIGFycmF5XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU0VUIElOSVRJQUwgU1RBVEUgT0YgQVBQTElDQVRJT05cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU2V0IE15IExvdHRlcnktbnVtYmVyXG52YXIgbXlMb3R0ZXJ5TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIkxvdHRlcnktbXludW1iZXItLWpzXCIpWzBdO1xubXlMb3R0ZXJ5TnVtYmVyLmlubmVySFRNTCA9IG51bWJlcnMudG9TdHJpbmcoKS5yZXBsYWNlKC9eWyxdJHxbLF0rL2csXCJcIik7XG5cbi8vIFNldCBMb3R0ZXJ5LXJvd1xudmFyIGxvdHRlcnlOdW1iZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnTG90dGVyeS1udW1iZXInKTtcbnZhciBsb3R0ZXJ5SGVhZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIkxvdHRlcnktcHJpY2UtaGVhZGVyXCIpWzBdO1xubG90dGVyeUhlYWRlci5pbm5lckhUTUwgPSBjb3JyZWN0TnVtYmVyc1tvYmplY3RDb3VudGVyXS5oZWFkZXI7XG4vLyBmb3IgKHZhciBpID0gMDsgaSA8IG51bWJlcnMubGVuZ3RoOyBpKyspIHtcbi8vICAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4vLyAgIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy8gICBudW1iZXIuaW5uZXJIVE1MID0gajtcbi8vICAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuLy8gICB9XG4vLyB9XG5cblxuY29uc3Qgc3RhcnRMb3R0ZXJ5ID0gKCkgPT4ge1xuICAvLyBDbGVhciBpdCBhZnRlciBmaXJzdCBpdGVyYXRpb25cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvdHRlcnlOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsb3R0ZXJ5TnVtYmVyc1tpXS5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH1cbiAgLy8gQWRkIG5ldyBudW1iZXJzXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG90dGVyeU51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBmb3IgKHZhciBsID0gMDsgbCA8IDI7IGwrKykge1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICB2YXIgbnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIG51bWJlci5pbm5lckhUTUwgPSBqO1xuICAgICAgbG90dGVyeU51bWJlcnNbaV0uYXBwZW5kQ2hpbGQobnVtYmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gLy8gQ0hBTkdFIFRIRSBIRUFERVJcbmxvdHRlcnlIZWFkZXIuaW5uZXJIVE1MID0gY29ycmVjdE51bWJlcnNbb2JqZWN0Q291bnRlcl0uaGVhZGVyO1xubG90dGVyeU1lc3NhZ2UuaW5uZXJIVE1MID0gXCJEcmFnbmluZyBww6Vnw6VyXCI7XG4vLyBDaGVjayBob3cgY29ycmVjdCBlYWNoIGFycmF5IGlzIGluIG51bWJlci4gRWdcbi8vIElmIGFuIGFycmF5IG1hdGNoZXMgYnkgdHdvIGRpZ2l0cyB0aGUgdmFsdWUgd2lsbCBiZSB0d29cbmNvcnJlY3RBbW91bnQgPSBbXTtcbi8vIHZhciB3aW5uaW5nID0gZmFsc2U7XG4vLyBGdW5jdGlvbiB0byBwdXNoIHRoZSB2YWx1ZSB0byB0aGUgYXJyYXlcbmNoZWNrQXJyYXkgPSAod2lubmluZ051bWJlcnMpID0+IHtcbiAgbGV0IGNvcnJlY3QgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbm5pbmdOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHdpbm5pbmdOdW1iZXJzW2ldID09PSBudW1iZXJzW2ldKSB7XG4gICAgICAgIGNvcnJlY3QrKztcbiAgICAgICAgfVxuICB9XG4gIGNvcnJlY3RBbW91bnQucHVzaChjb3JyZWN0KTtcbn1cblxuLy8gQ2FsbCB0aGUgZnVuY3Rpb25cbmZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnNbb2JqZWN0Q291bnRlcl0ubnVtYmVycy5sZW5ndGg7IGkrKykge1xuICBjaGVja0FycmF5KGNvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLm51bWJlcnNbaV0pXG59XG5cbi8vIENoZWNrIHdoaWNoIG51bWJlciBpcyB0aGUgaGlnaGVzdCBpbiB0aGUgYXJyYXlcbmdldE1heE9mQXJyYXkgPSAobnVtQXJyYXkpID0+ICBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG5cbi8vIEdldCB0aGUgbnVtYmVyXG52YXIgaGlnaGVzdE51bWJlciA9IGdldE1heE9mQXJyYXkoY29ycmVjdEFtb3VudCk7XG5cbmlmKGhpZ2hlc3ROdW1iZXIgPT09IG51bWJlcnMubGVuZ3RoKSB7XG4gIHdpbm5pbmcgPSB0cnVlO1xufVxuLy8gVGhlIGFycmF5IHRoYXQgdGhlIGRyYXdpbmcgd2lsbCBiZSBiYXNlZCBvblxudmFyIGRyYXdBcnJheSA9IGNvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLm51bWJlcnNbY29ycmVjdEFtb3VudC5pbmRleE9mKGhpZ2hlc3ROdW1iZXIpXTtcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gKlxuLy8gTE9UVEVSWSBBTklNQVRJT05cbi8vICpcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHNwaW5uSW50ZXJ2YWwgPSAxMDA7IC8vIEludGVydmFsIGZvciBzcGlubiBzdGFydCBmb3IgZWFjaCBudW1iZXJcblxuXG5cblxuLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBkcmF3QXJyYXkubGVuZ3RoOyBpKyspIHtcbi8vICAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4vLyAgIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuLy9cbi8vICAgbnVtYmVyLmlubmVySFRNTCA9IFwiZ3JlZXJcIjtcbi8vXG4vLyAgIGxvdHRlcnlOdW1iZXJzW2ldLmFwcGVuZENoaWxkKG51bWJlcilcbi8vICAgfVxuLy8gfVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFSVCBST0xMSU5HIFRIRSBOVU1CRVJTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBjb3VudGVyID0gMDtcbnZhciBzdGFydEludGVydmFsID0gdHJ1ZTsgLy8gU2V0IHRvIHRydWUgaWYgdGhlIHNwaW5uZXIgc2hvdWxkIHN0YXJ0IGF0IHRoZSBzYW1lIHRpbWVcbmNvbnN0IHJvbGxOdW1iZXJzID0gKCkgPT4ge1xuaWYoc3RhcnRJbnRlcnZhbCkge1xuICAgIGlmKGNvdW50ZXI8bG90dGVyeU51bWJlcnMubGVuZ3RoKVxuICAgICAge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1tjb3VudGVyXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcbiAgICAgICAge1xuICAgICAgICAgIHJvbGxOdW1iZXJzKClcbiAgICAgICAgfSwgc3Bpbm5JbnRlcnZhbFxuICAgICAgKTtcbiAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgIH1cbn0gZWxzZSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbG90dGVyeU51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb3R0ZXJ5TnVtYmVyc1tpXS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyIExvdHRlcnktbnVtYmVyLS1zcGlubmluZ1wiO1xuICB9XG59XG59XG52YXIgeSA9IDA7XG52YXIgc3Bpbm5UaW1lID0gMTcwMDsgLy8gSE9XIExPTkcgRE9FUyBUSEUgQU5JTUFUSU9OLCBTWU5DIFdJVEggQ1NTIEZJTEVcbnZhciByYXRpbyA9IHNwaW5uVGltZSAqICggZHJhd0FycmF5WzBdIC8gMTApO1xuY29uc3QgY29ycmVjdCA9ICgpID0+IHtcbiAgdmFyIHN0b3AgPSA0MDAwOyAvLyBJTklUSUFMIFZBTFVFIChLaW5kYSBwb2ludGxlc3MpXG4gIHZhciBkaWZmID0gMDtcblxuICBpZih5IDwgZHJhd0FycmF5Lmxlbmd0aClcbiAgICB7XG4gICAgICBpZihkcmF3QXJyYXlbeSsxXSA+IGRyYXdBcnJheVt5XSkge1xuICAgICAgICBkaWZmID0gZHJhd0FycmF5W3krMV0gLSBkcmF3QXJyYXlbeV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGlmZiA9IDEwIC0gKGRyYXdBcnJheVt5XSAtIGRyYXdBcnJheVt5KzFdKTtcbiAgICAgIH1cbiAgICAgIHN0YXJ0SW50ZXJ2YWwgPyBzdG9wID0gc3Bpbm5JbnRlcnZhbCArICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCkgOiBzdG9wID0gICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCk7XG5cbiAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXJcIjtcblxuICAgICAgaWYoZHJhd0FycmF5W3ldID09PSBudW1iZXJzW3ldKSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS1jb3JyZWN0Jz5cIitkcmF3QXJyYXlbeV0rXCI8L2Rpdj5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS13cm9uZyc+XCIrZHJhd0FycmF5W3ldK1wiPC9kaXY+XCI7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoKCkgPT5cbiAgICAgIHtcbiAgICAgICAgY29ycmVjdCgpXG4gICAgICB9LFxuICAgICAgc3RvcFxuICAgICk7XG4gICAgICAgeSsrO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBEcmF3aW5nIGRvbmVcbiAgICAgIGRyYXdpbmdEb25lKClcbiAgICB9XG59XG5yb2xsTnVtYmVycygpO1xuc2V0VGltZW91dCggZnVuY3Rpb24oKXsgY29ycmVjdCgpOyB9LCBzcGlublRpbWUrcmF0aW8pO1xufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBFTkQgU1RBUlRMT1RURVJZIEZVTkNUSU9OXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIGxvdHRlcnlCdG4gPSAkKFwiLlN0YXJ0LWxvdHRlcnktYnRuLS1qc1wiKTtcblxubG90dGVyeUJ0bi5jbGljayhmdW5jdGlvbigpIHtcbiAgc3RhcnRMb3R0ZXJ5KCk7XG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFmdGVyIHRoZSBkcmF3aW5nIGlzIGRvbmVcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIG1lc3NhZ2VDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiTG90dGVyeS1tZXNzYWdlLWNvbnRhaW5lclwiKVswXTtcbnZhciBsb3R0ZXJ5TWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJMb3R0ZXJ5LW1lc3NhZ2UtLWpzXCIpWzBdO1xuXG5cbmNvbnN0IGRyYXdpbmdEb25lID0gKCkgPT4ge1xuXG4gIC8vIFdIRU4gVEhFIExBU1QgTlVNQkVSIEhBUyBCRUVOIERSQVdFRFxuICBpZihvYmplY3RDb3VudGVyID09PSBjb3JyZWN0TnVtYmVycy5sZW5ndGgpIHtcbiAgICBsb3R0ZXJ5QnRuLmhpZGUoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZih3aW5uaW5nKSB7XG4gICAgbG90dGVyeU1lc3NhZ2UuaW5uZXJIVE1MID0gXCJHcmF0dGlzIGR1IHZhbm5cIjtcbiAgfSBlbHNlIHtcbiAgICBsb3R0ZXJ5TWVzc2FnZS5pbm5lckhUTUwgPSBcIlR5dsOkcnIgZHUgdmFubiBpbnRlIFwiK2NvcnJlY3ROdW1iZXJzW29iamVjdENvdW50ZXJdLmhlYWRlcitcIiBrci5cIlxuICAgICtcIjxicj5cIitcbiAgICBcIk51IGRyYXIgdmkgXCIrY29ycmVjdE51bWJlcnNbb2JqZWN0Q291bnRlcisxXS5oZWFkZXIrXCIga3IuXCI7XG4gIH1cbiAgb2JqZWN0Q291bnRlcisrO1xuICBsb3R0ZXJ5QnRuLmh0bWwoXCJTdGFydGEgZHJhZ25pbmcgZsO2ciBcIitjb3JyZWN0TnVtYmVyc1tvYmplY3RDb3VudGVyXS5oZWFkZXIrXCIga3IuXCIpO1xuXG5cbn1cblxuXG5cbn0pO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIFNMSURFVE9HR0xFIFRIRSBIRUxQQk9YRVNcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLXVzZXJuYW1lLWhlbHAtYm94LS1qc1wiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbiQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1wYXNzd29yZC1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVTRVJOQU1FIENIRUNLXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUkVHRVggbWFpbC5cbnZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcbnZhciB2YWxpZFVzZXI7XG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuLy8gSU5QVVQgRklFTEQgQ0hBTkdFXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsaWRVc2VyID0gc3RhdGUubnVtYmVyUmVnIHx8IHN0YXRlLmVtYWlsUmVnO1xuICAgICAgaWYgKHZhbGlkVXNlcikge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSBmYWxzZTtcbiAgICAgIH1cbn0pO1xuXG4vLyBXSEVOIElOUFVUIElTIERPTkUgV0lUSCBUSEUgRklFTERcbiQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJJTlBVVCBOT1QgSU4gRk9DVVMgQU5ZIE1PUkVcIik7XG4gIGlmKHN0YXRlLnVzZXJOYW1lID09IGZhbHNlKSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG5cbiAgfSBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIilcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLmhpZGUoKS5odG1sKFwiXCIpXG4gIH1cblxuICAvLyBXSElDSCBCT1ggU0hPVUxEIFNIT1dcbiAgaWYoc3RhdGUuZW1haWxSZWcpIHtcbiAgICBwYXNzd29yZEJveChcInJlc2V0XCIpXG4gICAgJChcIi5Mb2dpbi1yZXNldC1lbWFpbC0tanNcIikuaHRtbCgkKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBhc3N3b3JkQm94KFwic2VudFwiKVxufSlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBIRUxQIEJPWFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBwYXNzd29yZEJveChib3gpIHtcbiAgaWYoYm94ID09IFwicmVzZXRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qc1wiKS5zaG93KCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuaGlkZSgpO1xuICB9IGVsc2UgaWYoYm94ID09IFwic2VudFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qc1wiKS5zaG93KCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuaGlkZSgpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLnNob3coKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIElOUFVUIEZJRUxEXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gIGlmKCQodGhpcykudmFsKCkgPT0gXCJrb21iaVwiKSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSBmYWxzZVxuICB9XG4gICAgaWYoc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLmhpZGUoKTtcbiAgICB9XG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKVxuICAgIH1cbiB9KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1mb3JtLXN1Ym1pdC1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdChlKVxuICBpZih2YWxpZFVzZXIgJiYgc3RhdGUucGFzc1dvcmQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcImFjY291bnQuaHRtbFwiKTtcbiAgfVxuICBlbHNlIGlmKHZhbGlkVXNlciA9PSB0cnVlICYmIHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxuICBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVE9HR0xFIE1FTlUgT1BFTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuTWVudS1yb3ctdGl0bGUtdGl0bGVcIik7XG5cbiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKTtcbn0pXG5cbiQoXCIuTWVudS1sZXZlbC1vbmUtaGVhZGVyLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLW9wZW5cIik7XG59KVxuXG4kKFwiLk1lbnUtb3ZlcmxheS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSlcblxuXG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmcgbWVueVwiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJtZW55XCIpXG4gIH1cbn1cbiIsIlxuJChcIi5Db3JyZWN0LWxvdHRlcnktYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgdG9nZ2xlTWVudSgpO1xuICB9XG59KVxuXG4kKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuT3Blbi1sb2dpbi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5odG1sKFwiTG9nZ2EgaW4gcMOlIE1pbiBTaWRhXCIpXG4gICAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAgIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuIl19
