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

$(".Site-container").click(function() {
  console.log("oirgin");
})


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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN6SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vLy8vLy8vIFNUQVJUIGpRdWVyeVxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4vLyBUaGUgY3VzdG9tZXJzIGxvdHRlcnl0aWNrZXRcblxudmFyIHVzZXJOdW1iZXJzID0gWzksNSwyLDUsM11cbi8vIEFsbCB0aGUgY29ycmVjdCBudW1iZXJzXG5cbnZhciB3aW5uaW5nTnVtYmVycyA9IHtcbmZpcnN0OiBbXG4gIFs2LDUsNCw1LDddXG5dLFxuc2Vjb25kOiBbXG4gIFs0LDUsMiw4LDRdLFxuICBbNiw1LDQsNSw3XSxcbiAgWzksMyw4LDgsNl0sXG4gIFsxLDUsMywzLDRdXG5dLFxudGhpcmQ6IFtcbiAgWzMsNCw1LDMsNF0sXG4gIFsxLDMsNCw5LDJdLFxuICBbMywzLDYsNyw4XSxcbiAgWzAsNSwyLDgsNF0sXG4gIFs2LDUsNCw1LDddLFxuICBbMywzLDYsOCw2XSxcbiAgWzMsMyw4LDcsNF1cbl1cbn1cblxudmFyIGNvcnJlY3ROdW1iZXJzID0gW1xuICBbMyw0LDUsMyw0XSwgLy8gMSByw6R0dFxuICBbMSwzLDQsOSwyXSwgLy8gMSByw6R0dFxuICBbMywzLDYsNyw4XSwgLy8gQWxsYSByw6R0dFxuICBbMCw1LDIsOCw0XSwgLy8gQWxsYSBGZWxcbiAgWzEsMSw2LDUsM10sIC8vIEFsbGEgRmVsXG4gIFszLDMsNiw4LDZdLCAvLyAwLCAxLCAyIHLDpHR0XG4gIFszLDMsOCw3LDRdICAvLyAwLCAxLCAzIHLDpHR0XG5dXG4vLyBDaGVjayBob3cgY29ycmVjdCBlYWNoIGFycmF5IGlzIGluIG51bWJlci4gRWdcbi8vIElmIGFuIGFycmF5IG1hdGNoZXMgYnkgdHdvIGRpZ2l0cyB0aGUgdmFsdWUgd2lsbCBiZSB0d29cbnZhciBjb3JyZWN0QW1vdW50ID0gW107XG52YXIgd2lubmluZyA9IGZhbHNlO1xuXG52YXIgY29ycmVjdEFtb3VudDIgPSB7XG4gIGZpcnN0OiBbXSxcbiAgc2Vjb25kOiBbXSxcbiAgdGhpcmQ6IFtdXG59O1xuXG5mb3IgKHZhciBrZXkgaW4gd2lubmluZ051bWJlcnMpIHtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHdpbm5pbmdOdW1iZXJzW2tleV0ubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY29ycmVjdCA9IDA7XG4gICAgLy8gY29uc29sZS5sb2cod2lubmluZ051bWJlcnNba2V5XVtpXSk7XG4gICAgZm9yICh2YXIgIGo9IDA7IGogPCB3aW5uaW5nTnVtYmVyc1trZXldW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyh3aW5uaW5nTnVtYmVyc1trZXldW2ldW2pdKTtcbiAgICAgIGlmKHdpbm5pbmdOdW1iZXJzW2tleV1baV1bal0gPT09IHVzZXJOdW1iZXJzW2pdKVxuICAgICAge1xuICAgICAgICAgIGNvcnJlY3QrKztcbiAgICAgIH1cbiAgICB9XG4gICAgY29ycmVjdEFtb3VudDJba2V5XS5wdXNoKGNvcnJlY3QpO1xuICB9XG59XG5cbmNvbnNvbGUubG9nKGNvcnJlY3RBbW91bnQyKTtcblxuXG5cblxuLy8gRnVuY3Rpb24gdG8gcHVzaCB0aGUgdmFsdWUgdG8gdGhlIGFycmF5XG5jaGVja0FycmF5ID0gKHgpID0+IHtcbiAgbGV0IGNvcnJlY3QgPSAwO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzW3hdLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZihjb3JyZWN0TnVtYmVyc1t4XVtpXSA9PT0gdXNlck51bWJlcnNbaV0pIHtcbiAgICAgIGNvcnJlY3QrKztcbiAgICAgIH1cbiAgICB9XG4gICAgY29ycmVjdEFtb3VudC5wdXNoKGNvcnJlY3QpO1xufVxuXG5cblxuLy8gQ2FsbCB0aGUgZnVuY3Rpb25cbmZvciAodmFyIGkgPSAwOyBpIDwgY29ycmVjdE51bWJlcnMubGVuZ3RoOyBpKyspIHtcbmNoZWNrQXJyYXkoaSk7XG59XG4vLyBjb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50KTtcbi8vIGNvbnNvbGUubG9nKGNvcnJlY3RBbW91bnQpO1xuXG5cbi8vIENoZWNrIHdoaWNoIG51bWJlciBpcyB0aGUgaGlnaGVzdCBpbiB0aGUgYXJyYXlcbmdldE1heE9mQXJyYXkgPSAobnVtQXJyYXkpID0+ICBNYXRoLm1heC5hcHBseShudWxsLCBudW1BcnJheSk7XG5cbi8vIEdldCB0aGUgbnVtYmVyXG52YXIgaGlnaGVzdE51bWJlciA9IGdldE1heE9mQXJyYXkoY29ycmVjdEFtb3VudCk7XG5pZihoaWdoZXN0TnVtYmVyID09PSB1c2VyTnVtYmVycy5sZW5ndGgpIHtcbiAgd2lubmluZyA9IHRydWU7XG59XG4vLyBUaGUgYXJyYXkgdGhhdCB3ZSBhcmUgZ29ubmEgdXNlIGluIHRoZSBhbmltYXRpb24gYW5kIGNvbXBhcmUgd2l0aFxudmFyIGRyYXdBcnJheSA9IGNvcnJlY3ROdW1iZXJzW2NvcnJlY3RBbW91bnQuaW5kZXhPZihoaWdoZXN0TnVtYmVyKV07XG5cblxuLy8gY29uc29sZS5sb2coZHJhd0FycmF5KTtcblxuLy8gY29uc29sZS5sb2coZHJhd0FycmF5K1wiIMOkciBkZW4gbsOkcm1hc3RlIG9jaCBkZW4gdmkga29tbWVyIHV0Z8OlIGZyw6VuXCIpO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vICpcbi8vIExPVFRFUlkgQU5JTUFUSU9OXG4vLyAqXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBsb3R0ZXJ5TnVtYmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ0xvdHRlcnktbnVtYmVyJyk7XG5cbnZhciBzcGlubkludGVydmFsID0gMjAwOyAvLyBJbnRlcnZhbCBmb3Igc3Bpbm4gc3RhcnQgZm9yIGVhY2ggbnVtYmVyXG5cbmZvciAodmFyIGkgPSAwOyBpIDwgdXNlck51bWJlcnMubGVuZ3RoOyBpKyspIHtcbiAgZm9yICh2YXIgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gIHZhciBudW1iZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBpZihqID09IHVzZXJOdW1iZXJzW2ldKSB7XG4gIG51bWJlci5pbm5lckhUTUwgPSBqO1xuICAvLyBudW1iZXIuY2xhc3NOYW1lID0gXCJcIjtcbiAgfSBlbHNlIHtcbiAgLy8gbnVtYmVyLmNsYXNzTmFtZSA9IFwiXCI7XG4gIG51bWJlci5pbm5lckhUTUwgPSBqO1xuICB9XG4gIGxvdHRlcnlOdW1iZXJzW2ldLmFwcGVuZENoaWxkKG51bWJlcilcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVJUIFJPTExJTkcgVEhFIE5VTUJFUlNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIGNvdW50ZXIgPSAwO1xuXG52YXIgc3RhcnRJbnRlcnZhbCA9IHRydWU7IC8vIFNldCB0byB0cnVlIGlmIHRoZSBzcGlubmVyIHNob3VsZCBzdGFydCBhdCB0aGUgc2FtZSB0aW1lXG5cbmZ1bmN0aW9uIHJvbGxOdW1iZXJzKCkge1xuXG5pZihzdGFydEludGVydmFsKSB7XG5cbiAgICBpZihjb3VudGVyPGxvdHRlcnlOdW1iZXJzLmxlbmd0aClcbiAgICAgIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbY291bnRlcl0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlciBMb3R0ZXJ5LW51bWJlci0tc3Bpbm5pbmdcIjtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXG4gICAgICAgIHtcbiAgICAgICAgICByb2xsTnVtYmVycygpXG4gICAgICAgIH0sIHNwaW5uSW50ZXJ2YWxcbiAgICAgICk7XG4gICAgICAgICBjb3VudGVyKys7XG4gICAgICB9XG59IGVsc2Uge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxvdHRlcnlOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgbG90dGVyeU51bWJlcnNbaV0uY2xhc3NOYW1lID0gXCJMb3R0ZXJ5LW51bWJlciBMb3R0ZXJ5LW51bWJlci0tc3Bpbm5pbmdcIjtcbiAgfVxufVxufVxuXG5cbnZhciB5ID0gMDtcbnZhciBzcGlublRpbWUgPSAyNTAwOyAvLyBIT1cgTE9ORyBET0VTIFRIRSBBTklNQVRJT04sIFNZTkMgV0lUSCBDU1MgRklMRVxudmFyIHJhdGlvID0gc3Bpbm5UaW1lICogKCB1c2VyTnVtYmVyc1swXSAvIDEwKTtcblxuZnVuY3Rpb24gY29ycmVjdCgpIHtcblxuICB2YXIgc3RvcCA9IDQwMDA7IC8vIElOSVRJQUwgVkFMVUUgKEtpbmRhIHBvaW50bGVzcylcbiAgdmFyIGRpZmYgPSAwO1xuXG4gIGlmKHkgPCB1c2VyTnVtYmVycy5sZW5ndGgpXG4gICAge1xuICAgICAgaWYodXNlck51bWJlcnNbeSsxXSA+IHVzZXJOdW1iZXJzW3ldKSB7XG4gICAgICAgIGRpZmYgPSB1c2VyTnVtYmVyc1t5KzFdIC0gdXNlck51bWJlcnNbeV07XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgZGlmZiA9IDEwIC0gKHVzZXJOdW1iZXJzW3ldIC0gdXNlck51bWJlcnNbeSsxXSk7XG4gICAgICB9XG5cbiAgICAgIHN0YXJ0SW50ZXJ2YWwgPyBzdG9wID0gc3Bpbm5JbnRlcnZhbCArICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCkgOiBzdG9wID0gICgoIGRpZmYgKiBzcGlublRpbWUgKS8xMCk7XG5cbiAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXJcIjtcblxuICAgICAgaWYodXNlck51bWJlcnNbeV0gPT09IGRyYXdBcnJheVt5XSkge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktY29ycmVjdCc+XCIrdXNlck51bWJlcnNbeV0rXCI8L2Rpdj5cIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW3ldLmlubmVySFRNTCA9IFwiPGRpdiBjbGFzcz0nTG90dGVyeS13cm9uZyc+XCIrdXNlck51bWJlcnNbeV0rXCI8L2Rpdj5cIjtcbiAgICAgIH1cblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpXG4gICAgICB7XG4gICAgICAgIGNvcnJlY3QoKVxuICAgICAgfSxcbiAgICAgIHN0b3BcbiAgICApO1xuICAgICAgIHkrKztcbiAgICB9XG59XG5cblxudmFyIHN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcIlN0YXJ0LWxvdHRlcnktLWpzXCIpWzBdO1xuXG5zdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixmdW5jdGlvbigpIHtcbiAgcm9sbE51bWJlcnMoKTtcbiAgc2V0VGltZW91dChmdW5jdGlvbigpeyBjb3JyZWN0KCk7IH0sIHNwaW5uVGltZStyYXRpbyk7XG59KVxuXG5cblxuXG5cblxuXG5cblxufSk7XG4iLCIkKFwiLlNpdGUtY29udGFpbmVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICBjb25zb2xlLmxvZyhcIm9pcmdpblwiKTtcbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1jbGlja2FyZWEtLWpzLCAuTG9naW4tY2xvc2UtZm9ybS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIFNMSURFVE9HR0xFIFRIRSBIRUxQQk9YRVNcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLXVzZXJuYW1lLWhlbHAtYm94LS1qc1wiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbiQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1wYXNzd29yZC1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVTRVJOQU1FIENIRUNLXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUkVHRVggbWFpbC5cbnZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcbnZhciB2YWxpZFVzZXI7XG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuLy8gSU5QVVQgRklFTEQgQ0hBTkdFXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsaWRVc2VyID0gc3RhdGUubnVtYmVyUmVnIHx8IHN0YXRlLmVtYWlsUmVnO1xuICAgICAgaWYgKHZhbGlkVXNlcikge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSBmYWxzZTtcbiAgICAgIH1cbn0pO1xuXG4vLyBXSEVOIElOUFVUIElTIERPTkUgV0lUSCBUSEUgRklFTERcbiQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJJTlBVVCBOT1QgSU4gRk9DVVMgQU5ZIE1PUkVcIik7XG4gIGlmKHN0YXRlLnVzZXJOYW1lID09IGZhbHNlKSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG5cbiAgfSBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIilcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLmhpZGUoKS5odG1sKFwiXCIpXG4gIH1cblxuICAvLyBXSElDSCBCT1ggU0hPVUxEIFNIT1dcbiAgaWYoc3RhdGUuZW1haWxSZWcpIHtcbiAgICBwYXNzd29yZEJveChcInJlc2V0XCIpXG4gICAgJChcIi5Mb2dpbi1yZXNldC1lbWFpbC0tanNcIikuaHRtbCgkKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBhc3N3b3JkQm94KFwic2VudFwiKVxufSlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBIRUxQIEJPWFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBwYXNzd29yZEJveChib3gpIHtcbiAgaWYoYm94ID09IFwicmVzZXRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qc1wiKS5zaG93KCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuaGlkZSgpO1xuICB9IGVsc2UgaWYoYm94ID09IFwic2VudFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qc1wiKS5zaG93KCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuaGlkZSgpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLnNob3coKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIElOUFVUIEZJRUxEXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gIGlmKCQodGhpcykudmFsKCkgPT0gXCJrb21iaVwiKSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSBmYWxzZVxuICB9XG4gICAgaWYoc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLmhpZGUoKTtcbiAgICB9XG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKVxuICAgIH1cbiB9KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1mb3JtLXN1Ym1pdC1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdChlKVxuICBpZih2YWxpZFVzZXIgJiYgc3RhdGUucGFzc1dvcmQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcImFjY291bnQuaHRtbFwiKTtcbiAgfVxuICBlbHNlIGlmKHZhbGlkVXNlciA9PSB0cnVlICYmIHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxuICBlbHNlIHtcbiAgICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5Mb2dpbi1pbnB1dC1wYXNzd29yZC0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gVE9HR0xFIE1FTlUgT1BFTlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuTWVudS1yb3ctdGl0bGUtdGl0bGVcIik7XG5cbiQoXCIuTWVudS1yb3ctbWVudS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKTtcbn0pXG5cbiQoXCIuTWVudS1sZXZlbC1vbmUtaGVhZGVyLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJCh0aGlzKS5uZXh0KCkuc2xpZGVUb2dnbGUoKTtcbiAgJCh0aGlzKS50b2dnbGVDbGFzcyhcImNoaWxkcmVuLW9wZW5cIik7XG59KVxuXG4kKFwiLk1lbnUtb3ZlcmxheS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSlcblxuXG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmcgbWVueVwiKVxuICB9IGVsc2Uge1xuICAgIG1lbnVUZXh0LnRleHQoXCJtZW55XCIpXG4gIH1cbn1cbiIsIlxuJChcIi5Db3JyZWN0LWxvdHRlcnktYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICBpZigkKFwiLk1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgdG9nZ2xlTWVudSgpO1xuICB9XG59KVxuXG4kKFwiLk1lbnUtcm93LXByb2ZpbGUtLWpzLCAuT3Blbi1sb2dpbi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5odG1sKFwiTG9nZ2EgaW4gcMOlIE1pbiBTaWRhXCIpXG4gICAgJChcIi5Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAgIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuIl19
