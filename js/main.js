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

/////////////////////////////////////////////
 // CLOSE MODAL
 /////////////////////////////////////////////
$(".Login-clickarea--js, .Login-close-form--js").click(function() {
  $(".Login-overlay-container").fadeOut("fast")
})


$(".Login-username-toggle--js").click(function() {
  $(".Login-username-help-box--js").slideToggle();
});

$(".Login-password-toggle--js").click(function() {
  $(".Login-password-help-box--js").slideToggle();
});


var state = {
  userName: false, // IS CUSTOMERNUMBER OR EMAIL OK
  passWord: false,
  resetPassword: false,
  loginFailed: false,
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
            // console.log("det där funkar");
      }
      else {
        state.userName = false;
        // console.log("det där funkar inte");
      }
});

$('.Login-input-username--js').focusout(function() {
  // console.log("Släppt");
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
    $(".Login-password-sent-box--js").hide();
    $(".Login-password-default-box--js").hide();
  } else if(box == "sent") {
    $(".Login-password-reset-box--js").hide();
    $(".Login-password-sent-box--js").show();
    $(".Login-password-default-box--js").hide();
  } else if(box == "default") {
    console.log("default");
    $(".Login-password-reset-box--js").hide();
    $(".Login-password-sent-box--js").hide();
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
 });


/////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
/////////////////////////////////////////////
$(".Login-form-submit-btn--js").click(function(e) {

  e.preventDefault(e)

  if(validUser && state.passWord) {
    window.location.replace("account.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".Login-password-toggle--js").removeClass("Login-question-icon--js").addClass("Login-error-icon--js")
    $(".Login-header--js").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".Login-input-password--js").addClass("")
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvdHRlcnkuanMiLCJMb2dpbi5qcyIsIk1lbnUuanMiLCJNZW51LXJvdy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN2TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLy8vLy8vLyBTVEFSVCBqUXVlcnlcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuLy8gVGhlIGN1c3RvbWVycyBsb3R0ZXJ5dGlja2V0XG5cbnZhciB1c2VyTnVtYmVycyA9IFs5LDUsMiw1LDNdXG4vLyBBbGwgdGhlIGNvcnJlY3QgbnVtYmVyc1xuXG52YXIgd2lubmluZ051bWJlcnMgPSB7XG5maXJzdDogW1xuICBbNiw1LDQsNSw3XVxuXSxcbnNlY29uZDogW1xuICBbNCw1LDIsOCw0XSxcbiAgWzYsNSw0LDUsN10sXG4gIFs5LDMsOCw4LDZdLFxuICBbMSw1LDMsMyw0XVxuXSxcbnRoaXJkOiBbXG4gIFszLDQsNSwzLDRdLFxuICBbMSwzLDQsOSwyXSxcbiAgWzMsMyw2LDcsOF0sXG4gIFswLDUsMiw4LDRdLFxuICBbNiw1LDQsNSw3XSxcbiAgWzMsMyw2LDgsNl0sXG4gIFszLDMsOCw3LDRdXG5dXG59XG5cbnZhciBjb3JyZWN0TnVtYmVycyA9IFtcbiAgWzMsNCw1LDMsNF0sIC8vIDEgcsOkdHRcbiAgWzEsMyw0LDksMl0sIC8vIDEgcsOkdHRcbiAgWzMsMyw2LDcsOF0sIC8vIEFsbGEgcsOkdHRcbiAgWzAsNSwyLDgsNF0sIC8vIEFsbGEgRmVsXG4gIFsxLDEsNiw1LDNdLCAvLyBBbGxhIEZlbFxuICBbMywzLDYsOCw2XSwgLy8gMCwgMSwgMiByw6R0dFxuICBbMywzLDgsNyw0XSAgLy8gMCwgMSwgMyByw6R0dFxuXVxuLy8gQ2hlY2sgaG93IGNvcnJlY3QgZWFjaCBhcnJheSBpcyBpbiBudW1iZXIuIEVnXG4vLyBJZiBhbiBhcnJheSBtYXRjaGVzIGJ5IHR3byBkaWdpdHMgdGhlIHZhbHVlIHdpbGwgYmUgdHdvXG52YXIgY29ycmVjdEFtb3VudCA9IFtdO1xudmFyIHdpbm5pbmcgPSBmYWxzZTtcblxudmFyIGNvcnJlY3RBbW91bnQyID0ge1xuICBmaXJzdDogW10sXG4gIHNlY29uZDogW10sXG4gIHRoaXJkOiBbXVxufTtcblxuZm9yICh2YXIga2V5IGluIHdpbm5pbmdOdW1iZXJzKSB7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB3aW5uaW5nTnVtYmVyc1trZXldLmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNvcnJlY3QgPSAwO1xuICAgIC8vIGNvbnNvbGUubG9nKHdpbm5pbmdOdW1iZXJzW2tleV1baV0pO1xuICAgIGZvciAodmFyICBqPSAwOyBqIDwgd2lubmluZ051bWJlcnNba2V5XVtpXS5sZW5ndGg7IGorKykge1xuICAgICAgLy8gY29uc29sZS5sb2cod2lubmluZ051bWJlcnNba2V5XVtpXVtqXSk7XG4gICAgICBpZih3aW5uaW5nTnVtYmVyc1trZXldW2ldW2pdID09PSB1c2VyTnVtYmVyc1tqXSlcbiAgICAgIHtcbiAgICAgICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQyW2tleV0ucHVzaChjb3JyZWN0KTtcbiAgfVxufVxuXG5jb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50Mik7XG5cblxuXG5cbi8vIEZ1bmN0aW9uIHRvIHB1c2ggdGhlIHZhbHVlIHRvIHRoZSBhcnJheVxuY2hlY2tBcnJheSA9ICh4KSA9PiB7XG4gIGxldCBjb3JyZWN0ID0gMDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb3JyZWN0TnVtYmVyc1t4XS5sZW5ndGg7IGkrKykge1xuICAgICAgaWYoY29ycmVjdE51bWJlcnNbeF1baV0gPT09IHVzZXJOdW1iZXJzW2ldKSB7XG4gICAgICBjb3JyZWN0Kys7XG4gICAgICB9XG4gICAgfVxuICAgIGNvcnJlY3RBbW91bnQucHVzaChjb3JyZWN0KTtcbn1cblxuXG5cbi8vIENhbGwgdGhlIGZ1bmN0aW9uXG5mb3IgKHZhciBpID0gMDsgaSA8IGNvcnJlY3ROdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG5jaGVja0FycmF5KGkpO1xufVxuLy8gY29uc29sZS5sb2coY29ycmVjdEFtb3VudCk7XG4vLyBjb25zb2xlLmxvZyhjb3JyZWN0QW1vdW50KTtcblxuXG4vLyBDaGVjayB3aGljaCBudW1iZXIgaXMgdGhlIGhpZ2hlc3QgaW4gdGhlIGFycmF5XG5nZXRNYXhPZkFycmF5ID0gKG51bUFycmF5KSA9PiAgTWF0aC5tYXguYXBwbHkobnVsbCwgbnVtQXJyYXkpO1xuXG4vLyBHZXQgdGhlIG51bWJlclxudmFyIGhpZ2hlc3ROdW1iZXIgPSBnZXRNYXhPZkFycmF5KGNvcnJlY3RBbW91bnQpO1xuaWYoaGlnaGVzdE51bWJlciA9PT0gdXNlck51bWJlcnMubGVuZ3RoKSB7XG4gIHdpbm5pbmcgPSB0cnVlO1xufVxuLy8gVGhlIGFycmF5IHRoYXQgd2UgYXJlIGdvbm5hIHVzZSBpbiB0aGUgYW5pbWF0aW9uIGFuZCBjb21wYXJlIHdpdGhcbnZhciBkcmF3QXJyYXkgPSBjb3JyZWN0TnVtYmVyc1tjb3JyZWN0QW1vdW50LmluZGV4T2YoaGlnaGVzdE51bWJlcildO1xuXG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheSk7XG5cbi8vIGNvbnNvbGUubG9nKGRyYXdBcnJheStcIiDDpHIgZGVuIG7DpHJtYXN0ZSBvY2ggZGVuIHZpIGtvbW1lciB1dGfDpSBmcsOlblwiKTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyAqXG4vLyBMT1RURVJZIEFOSU1BVElPTlxuLy8gKlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgbG90dGVyeU51bWJlcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdMb3R0ZXJ5LW51bWJlcicpO1xuXG52YXIgc3Bpbm5JbnRlcnZhbCA9IDIwMDsgLy8gSW50ZXJ2YWwgZm9yIHNwaW5uIHN0YXJ0IGZvciBlYWNoIG51bWJlclxuXG5mb3IgKHZhciBpID0gMDsgaSA8IHVzZXJOdW1iZXJzLmxlbmd0aDsgaSsrKSB7XG4gIGZvciAodmFyIGogPSAwOyBqIDwgMTA7IGorKykge1xuICB2YXIgbnVtYmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgaWYoaiA9PSB1c2VyTnVtYmVyc1tpXSkge1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgLy8gbnVtYmVyLmNsYXNzTmFtZSA9IFwiXCI7XG4gIH0gZWxzZSB7XG4gIC8vIG51bWJlci5jbGFzc05hbWUgPSBcIlwiO1xuICBudW1iZXIuaW5uZXJIVE1MID0gajtcbiAgfVxuICBsb3R0ZXJ5TnVtYmVyc1tpXS5hcHBlbmRDaGlsZChudW1iZXIpXG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFSVCBST0xMSU5HIFRIRSBOVU1CRVJTXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBjb3VudGVyID0gMDtcblxudmFyIHN0YXJ0SW50ZXJ2YWwgPSB0cnVlOyAvLyBTZXQgdG8gdHJ1ZSBpZiB0aGUgc3Bpbm5lciBzaG91bGQgc3RhcnQgYXQgdGhlIHNhbWUgdGltZVxuXG5mdW5jdGlvbiByb2xsTnVtYmVycygpIHtcblxuaWYoc3RhcnRJbnRlcnZhbCkge1xuXG4gICAgaWYoY291bnRlcjxsb3R0ZXJ5TnVtYmVycy5sZW5ndGgpXG4gICAgICB7XG4gICAgICAgIGxvdHRlcnlOdW1iZXJzW2NvdW50ZXJdLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAgICB7XG4gICAgICAgICAgcm9sbE51bWJlcnMoKVxuICAgICAgICB9LCBzcGlubkludGVydmFsXG4gICAgICApO1xuICAgICAgICAgY291bnRlcisrO1xuICAgICAgfVxufSBlbHNlIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb3R0ZXJ5TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgIGxvdHRlcnlOdW1iZXJzW2ldLmNsYXNzTmFtZSA9IFwiTG90dGVyeS1udW1iZXIgTG90dGVyeS1udW1iZXItLXNwaW5uaW5nXCI7XG4gIH1cbn1cbn1cblxuXG52YXIgeSA9IDA7XG52YXIgc3Bpbm5UaW1lID0gMjUwMDsgLy8gSE9XIExPTkcgRE9FUyBUSEUgQU5JTUFUSU9OLCBTWU5DIFdJVEggQ1NTIEZJTEVcbnZhciByYXRpbyA9IHNwaW5uVGltZSAqICggdXNlck51bWJlcnNbMF0gLyAxMCk7XG5cbmZ1bmN0aW9uIGNvcnJlY3QoKSB7XG5cbiAgdmFyIHN0b3AgPSA0MDAwOyAvLyBJTklUSUFMIFZBTFVFIChLaW5kYSBwb2ludGxlc3MpXG4gIHZhciBkaWZmID0gMDtcblxuICBpZih5IDwgdXNlck51bWJlcnMubGVuZ3RoKVxuICAgIHtcbiAgICAgIGlmKHVzZXJOdW1iZXJzW3krMV0gPiB1c2VyTnVtYmVyc1t5XSkge1xuICAgICAgICBkaWZmID0gdXNlck51bWJlcnNbeSsxXSAtIHVzZXJOdW1iZXJzW3ldO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGRpZmYgPSAxMCAtICh1c2VyTnVtYmVyc1t5XSAtIHVzZXJOdW1iZXJzW3krMV0pO1xuICAgICAgfVxuXG4gICAgICBzdGFydEludGVydmFsID8gc3RvcCA9IHNwaW5uSW50ZXJ2YWwgKyAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApIDogc3RvcCA9ICAoKCBkaWZmICogc3Bpbm5UaW1lICkvMTApO1xuXG4gICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5jbGFzc05hbWUgPSBcIkxvdHRlcnktbnVtYmVyXCI7XG5cbiAgICAgIGlmKHVzZXJOdW1iZXJzW3ldID09PSBkcmF3QXJyYXlbeV0pIHtcbiAgICAgICAgbG90dGVyeU51bWJlcnNbeV0uaW5uZXJIVE1MID0gXCI8ZGl2IGNsYXNzPSdMb3R0ZXJ5LWNvcnJlY3QnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb3R0ZXJ5TnVtYmVyc1t5XS5pbm5lckhUTUwgPSBcIjxkaXYgY2xhc3M9J0xvdHRlcnktd3JvbmcnPlwiK3VzZXJOdW1iZXJzW3ldK1wiPC9kaXY+XCI7XG4gICAgICB9XG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAge1xuICAgICAgICBjb3JyZWN0KClcbiAgICAgIH0sXG4gICAgICBzdG9wXG4gICAgKTtcbiAgICAgICB5Kys7XG4gICAgfVxufVxuXG5cbnZhciBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJTdGFydC1sb3R0ZXJ5LS1qc1wiKVswXTtcblxuc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZnVuY3Rpb24oKSB7XG4gIHJvbGxOdW1iZXJzKCk7XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgY29ycmVjdCgpOyB9LCBzcGlublRpbWUrcmF0aW8pO1xufSlcblxuXG5cblxuXG5cblxuXG5cbn0pO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXG59KVxuXG5cbiQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi11c2VybmFtZS1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4kKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tcGFzc3dvcmQtaGVscC1ib3gtLWpzXCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuXG52YXIgc3RhdGUgPSB7XG4gIHVzZXJOYW1lOiBmYWxzZSwgLy8gSVMgQ1VTVE9NRVJOVU1CRVIgT1IgRU1BSUwgT0tcbiAgcGFzc1dvcmQ6IGZhbHNlLFxuICByZXNldFBhc3N3b3JkOiBmYWxzZSxcbiAgbG9naW5GYWlsZWQ6IGZhbHNlLFxuICBlbWFpbFJlZzogZmFsc2UsXG4gIG51bWJlclJlZzogZmFsc2Vcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xuXG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsaWRVc2VyID0gc3RhdGUubnVtYmVyUmVnIHx8IHN0YXRlLmVtYWlsUmVnO1xuICAgICAgaWYgKHZhbGlkVXNlcikge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IHRydWU7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRldCBkw6RyIGZ1bmthclwiKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IGZhbHNlO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhcImRldCBkw6RyIGZ1bmthciBpbnRlXCIpO1xuICAgICAgfVxufSk7XG5cbiQoJy5Mb2dpbi1pbnB1dC11c2VybmFtZS0tanMnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJTbMOkcHB0XCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuXG4gIH0gZWxzZSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxuICB9XG5cbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXG4gIGlmKHN0YXRlLmVtYWlsUmVnKSB7XG4gICAgcGFzc3dvcmRCb3goXCJyZXNldFwiKVxuICAgICQoXCIuTG9naW4tcmVzZXQtZW1haWwtLWpzXCIpLmh0bWwoJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLnZhbCgpKSAvLyBTRVQgVEhFIEVNQUlMIElOIFRIRSBNRVNTQUdFIFRPIFdIQVRFVkVSIElUIElTIElOIFRIRSBJTlBVVCBJRiBJVCBJUyBWQUxJRFxuICB9IGVsc2Uge1xuICAgIHBhc3N3b3JkQm94KFwiZGVmYXVsdFwiKVxuICB9XG59KVxuXG4kKFwiLkxvZ2luLXJlc2V0LXBhc3N3b3JkLWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwYXNzd29yZEJveChcInNlbnRcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSEVMUCBCT1hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFzc3dvcmRCb3goYm94KSB7XG4gIGlmKGJveCA9PSBcInJlc2V0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuc2hvdygpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuaGlkZSgpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzXCIpLnNob3coKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJkZWZhdWx0XCIpIHtcbiAgICBjb25zb2xlLmxvZyhcImRlZmF1bHRcIik7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LS1qc1wiKS5oaWRlKCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveC0tanNcIikuc2hvdygpO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSU5QVVQgRklFTERcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbiQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICBpZigkKHRoaXMpLnZhbCgpID09IFwia29tYmlcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuIH0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5Mb2dpbi1mb3JtLXN1Ym1pdC1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblxuICBlLnByZXZlbnREZWZhdWx0KGUpXG5cbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJhY2NvdW50Lmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5hZGRDbGFzcyhcIlwiKVxuICB9XG4gIGVsc2Uge1xuXG5cblxuICAgICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuXG5cbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tZXJyb3ItaWNvbi0tanNcIilcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1xdWVzdGlvbi1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG5cbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbn0pO1xuIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBUT0dHTEUgTUVOVSBPUEVOXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxudmFyIG1lbnVUZXh0ID0gJChcIi5NZW51LXJvdy10aXRsZS10aXRsZVwiKTtcblxuJChcIi5NZW51LXJvdy1tZW51LS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpO1xufSlcblxuJChcIi5NZW51LWxldmVsLW9uZS1oZWFkZXItLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tb3BlblwiKTtcbn0pXG5cblxuZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgJChcIi5NZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIk1lbnUtLW9wZW5cIilcbiAgJChcIi5TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxuICAkKFwiLk1lbnUtcm93LW1lbnUtLWpzXCIpLnRvZ2dsZUNsYXNzKFwiQnVyZ2VyLS1vcGVuXCIpO1xuXG4gIGlmKG1lbnVUZXh0LnRleHQoKSA9PSBcIm1lbnlcIikge1xuICAgICAgbWVudVRleHQudGV4dChcInN0w6RuZyBtZW55XCIpXG4gIH0gZWxzZSB7XG4gICAgbWVudVRleHQudGV4dChcIm1lbnlcIilcbiAgfVxufVxuIiwiXG4kKFwiLkNvcnJlY3QtbG90dGVyeS1idG4tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLWhlYWRlci0tanNcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICB0b2dnbGVNZW51KCk7XG4gIH1cbn0pXG5cbiQoXCIuTWVudS1yb3ctcHJvZmlsZS0tanMsIC5PcGVuLWxvZ2luLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcblxuICAgICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcblxuICAgIGlmKCQoXCIuTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG5cbn0pXG4iXX0=
