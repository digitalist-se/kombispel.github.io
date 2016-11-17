/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".js-Login-clickarea, .js-Login-close-form").click(function() {
  $(".js-Login-overlay-container").fadeOut("fast")
})

/////////////////////////////////////////////
 // SLIDETOGGLE THE HELPBOXES
 ////////////////////////////////////////////
$(".js-Login-username-toggle").click(function() {
  $(".js-Login-username-help-box").slideToggle();
});

$(".js-Login-password-toggle, .js-Login-forgot-password").click(function() {
  $(".js-Login-password-help-box").slideToggle();
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
$('.js-Login-input-username').on('input', function() {
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
$('.js-Login-input-username').focusout(function() {
  // console.log("INPUT NOT IN FOCUS ANY MORE");
  if(state.userName == false) {
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(this).addClass("js-Login-input-error")
    $(".js-Login-username-message").show().html(userNameMessage)

  } else {
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-error-icon").addClass("js-Login-check-icon")
    $(this).removeClass("js-Login-input-error")
    $(".js-Login-username-message").hide().html("")
  }

  // WHICH BOX SHOULD SHOW
  if(state.emailReg) {
    passwordBox("reset")
    $(".js-Login-reset-email").html($('.js-Login-input-username').val()) // SET THE EMAIL IN THE MESSAGE TO WHATEVER IT IS IN THE INPUT IF IT IS VALID
  } else {
    passwordBox("default")
  }
})

$(".js-Login-reset-password-btn").click(function(e) {
   e.preventDefault();
  passwordBox("sent")
})

/////////////////////////////////////////////
// PASSWORD HELP BOX
/////////////////////////////////////////////
function passwordBox(box) {
  if(box == "reset") {
    $(".js-Login-password-reset-box").show();
    $(".js-Login-password-sent-box, .js-Login-password-default-box").hide();
  } else if(box == "sent") {
    $(".js-Login-password-reset-box, .js-Login-password-default-box").hide();
    $(".js-Login-password-sent-box").show();
  } else if(box == "default") {
    $(".js-Login-password-sent-box, .js-Login-password-reset-box").hide();
    $(".js-Login-password-default-box").show();
  }
}

/////////////////////////////////////////////
// PASSWORD INPUT FIELD
/////////////////////////////////////////////

$(".js-Login-input-password").on('input', function() {

  var passWord = $(this).val();

  if(passWord == "kombi" || passWord== "lotter" || passWord == "spel") {
    state.passWord = true
  } else {
    state.passWord = false
  }
    if(state.passWord != true) {
      $(".js-Login-password-message").hide();
    }
    if($(this).hasClass("js-Login-input-error")) {
      $(this).removeClass("js-Login-input-error")
      $(".js-Login-password-toggle").removeClass("js-Login-error-icon").addClass("js-Login-question-icon")
    }
 });

///////////////////////////////////////////////////////
// CHECK IF LOGIN PASSED (JUST FOR PROTOTYPE TESTING)
//////////////////////////////////////////////////////
$(".js-Login-form-submit-btn").click(function(e) {
  e.preventDefault(e)
  if(validUser && state.passWord) {
    window.location.replace("account.html");
  }
  else if(validUser == true && state.passWord != true) {
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-password-message").show().html(passwordMessage)
  }
  else {
    $(".js-Login-header").addClass("Login-header--error").html("Inloggningen misslyckades")
    $(".js-Login-input-password").addClass("js-Login-input-error")
    $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-check-icon").addClass("js-Login-error-icon")
    $(".js-Login-password-toggle").removeClass("js-Login-question-icon").addClass("js-Login-error-icon")
    $(".js-Login-username-message").show().html(userNameMessage)
    $(".js-Login-password-message").show().html(passwordMessage)
  }
});

/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////
$(".js-Menu-level-one-header").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

$(".js-Header-correct-btn").click(function() {
  $(".js-Login-header").html("Logga in för att rätta din lott")
  $(".js-Login-overlay-container").fadeIn("fast");
  if($(".js-Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})
//
$(".js-Header-profile, .js-Open-login").click(function() {
  $(".js-Login-header").html("Logga in på Min Sida")
    $(".js-Login-overlay-container").fadeIn("fast");
    if($(".js-Menu-container").hasClass("Menu--open")) {
        toggleMenu();
    }
})

$(".js-Header-menu-container").click(function() {
  toggleMenu()
});


$(".js-Menu-overlay").click(function() {
  toggleMenu()
})

var menuText = $(".js-Header-title--menu");

function toggleMenu() {
  $(".js-Menu-container").toggleClass("Menu--open")
  $(".js-Site-container").toggleClass("locked")
  $(".js-Header-menu-container").toggleClass("Burger--open");

  if(menuText.text() == "meny") {
      menuText.text("stäng")
  } else {
    menuText.text("meny")
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS5qcyIsIkhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNySkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gLy8gQ0xPU0UgTU9EQUxcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi1jbGlja2FyZWEsIC5qcy1Mb2dpbi1jbG9zZS1mb3JtXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLWhlbHAtYm94XCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGUsIC5qcy1Mb2dpbi1mb3Jnb3QtcGFzc3dvcmRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tcGFzc3dvcmQtaGVscC1ib3hcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufSBcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcbnZhciBwYXNzd29yZE1lc3NhZ2UgPSBcIkZlbGFrdGlndCBsw7ZzZW5vcmQuXCI7XG5cbi8vIElOUFVUIEZJRUxEIENIQU5HRVxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgaWYoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSApIHtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSApKSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH1cbiAgICB2YWxpZFVzZXIgPSBzdGF0ZS5udW1iZXJSZWcgfHwgc3RhdGUuZW1haWxSZWc7XG4gICAgICBpZiAodmFsaWRVc2VyKSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IGZhbHNlO1xuICAgICAgfVxufSk7XG5cbi8vIFdIRU4gSU5QVVQgSVMgRE9ORSBXSVRIIFRIRSBGSUVMRFxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiSU5QVVQgTk9UIElOIEZPQ1VTIEFOWSBNT1JFXCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcblxuICB9IGVsc2Uge1xuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1jaGVjay1pY29uXCIpXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLmhpZGUoKS5odG1sKFwiXCIpXG4gIH1cblxuICAvLyBXSElDSCBCT1ggU0hPVUxEIFNIT1dcbiAgaWYoc3RhdGUuZW1haWxSZWcpIHtcbiAgICBwYXNzd29yZEJveChcInJlc2V0XCIpXG4gICAgJChcIi5qcy1Mb2dpbi1yZXNldC1lbWFpbFwiKS5odG1sKCQoJy5qcy1Mb2dpbi1pbnB1dC11c2VybmFtZScpLnZhbCgpKSAvLyBTRVQgVEhFIEVNQUlMIElOIFRIRSBNRVNTQUdFIFRPIFdIQVRFVkVSIElUIElTIElOIFRIRSBJTlBVVCBJRiBJVCBJUyBWQUxJRFxuICB9IGVsc2Uge1xuICAgIHBhc3N3b3JkQm94KFwiZGVmYXVsdFwiKVxuICB9XG59KVxuXG4kKFwiLmpzLUxvZ2luLXJlc2V0LXBhc3N3b3JkLWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIHBhc3N3b3JkQm94KFwic2VudFwiKVxufSlcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBIRUxQIEJPWFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBwYXNzd29yZEJveChib3gpIHtcbiAgaWYoYm94ID09IFwicmVzZXRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94XCIpLnNob3coKTtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuaGlkZSgpO1xuICB9IGVsc2UgaWYoYm94ID09IFwic2VudFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5oaWRlKCk7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveFwiKS5zaG93KCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94XCIpLmhpZGUoKTtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLnNob3coKTtcbiAgfVxufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIElOUFVUIEZJRUxEXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcblxuICB2YXIgcGFzc1dvcmQgPSAkKHRoaXMpLnZhbCgpO1xuXG4gIGlmKHBhc3NXb3JkID09IFwia29tYmlcIiB8fCBwYXNzV29yZD09IFwibG90dGVyXCIgfHwgcGFzc1dvcmQgPT0gXCJzcGVsXCIpIHtcbiAgICBzdGF0ZS5wYXNzV29yZCA9IHRydWVcbiAgfSBlbHNlIHtcbiAgICBzdGF0ZS5wYXNzV29yZCA9IGZhbHNlXG4gIH1cbiAgICBpZihzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuaGlkZSgpO1xuICAgIH1cbiAgICBpZigkKHRoaXMpLmhhc0NsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIikpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKVxuICAgIH1cbiB9KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ0hFQ0sgSUYgTE9HSU4gUEFTU0VEIChKVVNUIEZPUiBQUk9UT1RZUEUgVEVTVElORylcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi1mb3JtLXN1Ym1pdC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICBlLnByZXZlbnREZWZhdWx0KGUpXG4gIGlmKHZhbGlkVXNlciAmJiBzdGF0ZS5wYXNzV29yZCkge1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKFwiYWNjb3VudC5odG1sXCIpO1xuICB9XG4gIGVsc2UgaWYodmFsaWRVc2VyID09IHRydWUgJiYgc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG4gIGVsc2Uge1xuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxufSk7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1NZW51LWxldmVsLW9uZS1oZWFkZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcbiIsIiQoXCIuanMtSGVhZGVyLWNvcnJlY3QtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5odG1sKFwiTG9nZ2EgaW4gZsO2ciBhdHQgcsOkdHRhIGRpbiBsb3R0XCIpXG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgaWYoJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS5oYXNDbGFzcyhcIk1lbnUtLW9wZW5cIikpIHtcbiAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgfVxufSlcbi8vXG4kKFwiLmpzLUhlYWRlci1wcm9maWxlLCAuanMtT3Blbi1sb2dpblwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIHDDpSBNaW4gU2lkYVwiKVxuICAgICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgICBpZigkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxufSlcblxuJChcIi5qcy1IZWFkZXItbWVudS1jb250YWluZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSk7XG5cblxuJChcIi5qcy1NZW51LW92ZXJsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSlcblxudmFyIG1lbnVUZXh0ID0gJChcIi5qcy1IZWFkZXItdGl0bGUtLW1lbnVcIik7XG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuanMtTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5qcy1IZWFkZXItbWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nXCIpXG4gIH0gZWxzZSB7XG4gICAgbWVudVRleHQudGV4dChcIm1lbnlcIilcbiAgfVxufVxuIl19
