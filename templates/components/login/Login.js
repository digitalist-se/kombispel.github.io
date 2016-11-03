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
