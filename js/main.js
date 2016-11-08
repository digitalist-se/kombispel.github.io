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

  var passWord = $(this).val();

  if(passWord == "kombi" || passWord== "lotter" || passWord == "spel") {
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
$(".Menu-level-one-header--js").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

$(".Header-correct-btn--js").click(function() {
  $(".Login-header--js").html("Logga in för att rätta din lott")
  $(".Login-overlay-container").fadeIn("fast");
  if($(".Menu-container--js").hasClass("Menu--open")) {
      toggleMenu();
  }
})
//
$(".Header-profile--js, .Open-login--js").click(function() {
  $(".Login-header--js").html("Logga in på Min Sida")
    $(".Login-overlay-container").fadeIn("fast");
    if($(".Menu-container--js").hasClass("Menu--open")) {
        toggleMenu();
    }
})

$(".Header-menu-container--js").click(function() {
  toggleMenu()
});


$(".Menu-overlay--js").click(function() {
  toggleMenu()
})

var menuText = $(".Header-title--menu");

function toggleMenu() {
  $(".Menu-container--js").toggleClass("Menu--open")
  $(".Site-container").toggleClass("locked")
  $(".Header-menu-container--js").toggleClass("Burger--open");

  if(menuText.text() == "meny") {
      menuText.text("stäng")
  } else {
    menuText.text("meny")
  }
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxvZ2luLmpzIiwiTWVudS5qcyIsIkhlYWRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIENMT1NFIE1PREFMXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tY2xpY2thcmVhLS1qcywgLkxvZ2luLWNsb3NlLWZvcm0tLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi11c2VybmFtZS1oZWxwLWJveC0tanNcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4kKFwiLkxvZ2luLXBhc3N3b3JkLXRvZ2dsZS0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4tcGFzc3dvcmQtaGVscC1ib3gtLWpzXCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBTVEFURSBPRiBUSEUgRk9STVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG52YXIgc3RhdGUgPSB7XG4gIHVzZXJOYW1lOiBmYWxzZSwgLy8gSVMgQ1VTVE9NRVJOVU1CRVIgT1IgRU1BSUwgT0tcbiAgcGFzc1dvcmQ6IGZhbHNlLFxuICBlbWFpbFJlZzogZmFsc2UsXG4gIG51bWJlclJlZzogZmFsc2Vcbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcbnZhciBwYXNzd29yZE1lc3NhZ2UgPSBcIkZlbGFrdGlndCBsw7ZzZW5vcmQuXCI7XG5cbi8vIElOUFVUIEZJRUxEIENIQU5HRVxuJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gICAgaWYoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSApIHtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSApKSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhbGlkVXNlciA9IHN0YXRlLm51bWJlclJlZyB8fCBzdGF0ZS5lbWFpbFJlZztcbiAgICAgIGlmICh2YWxpZFVzZXIpIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gZmFsc2U7XG4gICAgICB9XG59KTtcblxuLy8gV0hFTiBJTlBVVCBJUyBET05FIFdJVEggVEhFIEZJRUxEXG4kKCcuTG9naW4taW5wdXQtdXNlcm5hbWUtLWpzJykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiSU5QVVQgTk9UIElOIEZPQ1VTIEFOWSBNT1JFXCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLXF1ZXN0aW9uLWljb24tLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tY2hlY2staWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQodGhpcykuYWRkQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAkKFwiLkxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuXG4gIH0gZWxzZSB7XG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWNoZWNrLWljb24tLWpzXCIpXG4gICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxuICB9XG5cbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXG4gIGlmKHN0YXRlLmVtYWlsUmVnKSB7XG4gICAgcGFzc3dvcmRCb3goXCJyZXNldFwiKVxuICAgICQoXCIuTG9naW4tcmVzZXQtZW1haWwtLWpzXCIpLmh0bWwoJCgnLkxvZ2luLWlucHV0LXVzZXJuYW1lLS1qcycpLnZhbCgpKSAvLyBTRVQgVEhFIEVNQUlMIElOIFRIRSBNRVNTQUdFIFRPIFdIQVRFVkVSIElUIElTIElOIFRIRSBJTlBVVCBJRiBJVCBJUyBWQUxJRFxuICB9IGVsc2Uge1xuICAgIHBhc3N3b3JkQm94KFwiZGVmYXVsdFwiKVxuICB9XG59KVxuXG4kKFwiLkxvZ2luLXJlc2V0LXBhc3N3b3JkLWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwYXNzd29yZEJveChcInNlbnRcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSEVMUCBCT1hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFzc3dvcmRCb3goYm94KSB7XG4gIGlmKGJveCA9PSBcInJlc2V0XCIpIHtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveC0tanNcIikuc2hvdygpO1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtc2VudC1ib3gtLWpzLCAuTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcInNlbnRcIikge1xuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LS1qcywgLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5oaWRlKCk7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanNcIikuc2hvdygpO1xuICB9IGVsc2UgaWYoYm94ID09IFwiZGVmYXVsdFwiKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1zZW50LWJveC0tanMsIC5Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3gtLWpzXCIpLmhpZGUoKTtcbiAgICAkKFwiLkxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94LS1qc1wiKS5zaG93KCk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBJTlBVVCBGSUVMRFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwYXNzV29yZCA9ICQodGhpcykudmFsKCk7XG5cbiAgaWYocGFzc1dvcmQgPT0gXCJrb21iaVwiIHx8IHBhc3NXb3JkPT0gXCJsb3R0ZXJcIiB8fCBwYXNzV29yZCA9PSBcInNwZWxcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuICAgIGlmKHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XG4gICAgfVxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIikpIHtcbiAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJMb2dpbi1pbnB1dC1lcnJvci0tanNcIilcbiAgICAgICQoXCIuTG9naW4tcGFzc3dvcmQtdG9nZ2xlLS1qc1wiKS5yZW1vdmVDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpLmFkZENsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIilcbiAgICB9XG4gfSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENIRUNLIElGIExPR0lOIFBBU1NFRCAoSlVTVCBGT1IgUFJPVE9UWVBFIFRFU1RJTkcpXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuTG9naW4tZm9ybS1zdWJtaXQtYnRuLS1qc1wiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoZSlcbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJhY2NvdW50Lmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLkxvZ2luLWlucHV0LXBhc3N3b3JkLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWlucHV0LWVycm9yLS1qc1wiKVxuICAgICQoXCIuTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbiAgZWxzZSB7XG4gICAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuTG9naW4taW5wdXQtcGFzc3dvcmQtLWpzXCIpLmFkZENsYXNzKFwiTG9naW4taW5wdXQtZXJyb3ItLWpzXCIpXG4gICAgJChcIi5Mb2dpbi11c2VybmFtZS10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikucmVtb3ZlQ2xhc3MoXCJMb2dpbi1jaGVjay1pY29uLS1qc1wiKS5hZGRDbGFzcyhcIkxvZ2luLWVycm9yLWljb24tLWpzXCIpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC10b2dnbGUtLWpzXCIpLnJlbW92ZUNsYXNzKFwiTG9naW4tcXVlc3Rpb24taWNvbi0tanNcIikuYWRkQ2xhc3MoXCJMb2dpbi1lcnJvci1pY29uLS1qc1wiKVxuICAgICQoXCIuTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5zaG93KCkuaHRtbCh1c2VyTmFtZU1lc3NhZ2UpXG4gICAgJChcIi5Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxufSk7XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5NZW51LWxldmVsLW9uZS1oZWFkZXItLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tb3BlblwiKTtcbn0pXG4iLCIkKFwiLkhlYWRlci1jb3JyZWN0LWJ0bi0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuTG9naW4taGVhZGVyLS1qc1wiKS5odG1sKFwiTG9nZ2EgaW4gZsO2ciBhdHQgcsOkdHRhIGRpbiBsb3R0XCIpXG4gICQoXCIuTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgaWYoJChcIi5NZW51LWNvbnRhaW5lci0tanNcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICB0b2dnbGVNZW51KCk7XG4gIH1cbn0pXG4vL1xuJChcIi5IZWFkZXItcHJvZmlsZS0tanMsIC5PcGVuLWxvZ2luLS1qc1wiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5Mb2dpbi1oZWFkZXItLWpzXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcbiAgICAkKFwiLkxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gICAgaWYoJChcIi5NZW51LWNvbnRhaW5lci0tanNcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuXG4kKFwiLkhlYWRlci1tZW51LWNvbnRhaW5lci0tanNcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSk7XG5cblxuJChcIi5NZW51LW92ZXJsYXktLWpzXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICB0b2dnbGVNZW51KClcbn0pXG5cbnZhciBtZW51VGV4dCA9ICQoXCIuSGVhZGVyLXRpdGxlLS1tZW51XCIpO1xuXG5mdW5jdGlvbiB0b2dnbGVNZW51KCkge1xuICAkKFwiLk1lbnUtY29udGFpbmVyLS1qc1wiKS50b2dnbGVDbGFzcyhcIk1lbnUtLW9wZW5cIilcbiAgJChcIi5TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxuICAkKFwiLkhlYWRlci1tZW51LWNvbnRhaW5lci0tanNcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nXCIpXG4gIH0gZWxzZSB7XG4gICAgbWVudVRleHQudGV4dChcIm1lbnlcIilcbiAgfVxufVxuIl19
