$(".js-MyPages-toggle-mail").click(function() {
  $(".js-MyPages-help-box--mail").slideToggle()
})
$(".js-MyPages-toggle-phone").click(function() {
  $(".js-MyPages-help-box--phone").slideToggle()
})
/////////////////////////////////////////////
// Change Password Modal
/////////////////////////////////////////////
$(".js-MyPages-password-btn").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeIn("fast");
})
$(".js-MyPages-close-form, .js-MyPages-pswrd-clickarea").click(function() {
  $(".js-Site-container").toggleClass("locked");
  $(".js-MyPages-pswrd-overlay-container").fadeOut("fast");
})
var $newPassword = $(".js-MyPages-new-pswrd");
var $repeatPassword = $(".js-MyPages-repeat-pswrd");
var $newPasswordStatus = $(".js-MyPages-new-pswrd-status");
var $newPasswordMatch = $(".js-MyPages-new-pswrd-match");
var passwordState = {
  length: false,
  password: "",
  repeatPassword: ""
}
// Check if password is sufficient
$newPassword.on('input', function() {
 passwordState.password = $(this).val();
 passwordState.repeatPassword = $repeatPassword.val();
if(passwordState.password.length >= 6) {
  passwordState.length = true;
} else {
  passwordState.length = false;
}
checkPassword()
});
$repeatPassword.on('input', function() {
  passwordState.password = $newPassword.val();
  passwordState.repeatPassword = $(this).val();
checkPassword()
});
function checkPassword() {
  if(passwordState.length) {
    $newPasswordStatus.html("Lösenord är ok")
    $newPasswordStatus.addClass("u-green")
    $newPasswordStatus.removeClass("u-red")
  } else {
    $newPasswordStatus.html("Lösenord för kort")
    $newPasswordStatus.removeClass("u-green")
    $newPasswordStatus.addClass("u-red")
  }
  if(passwordState.password === passwordState.repeatPassword && passwordState.length) {
    $newPasswordMatch.html("Lösenorden överenstämmer")
    $newPasswordMatch.addClass("u-green")
    $newPasswordMatch.removeClass("u-red")
  } else if(passwordState.password === passwordState.repeatPassword && passwordState.length === false) {
    $newPasswordMatch.html("Lösenorden överenstämmer men är för korta")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  } else {
    $newPasswordMatch.html("Lösenorden överenstämmer inte")
    $newPasswordMatch.removeClass("u-green")
    $newPasswordMatch.addClass("u-red")
  }
}

/////////////////////////////////////////////
 // CLOSE MODAL
 ////////////////////////////////////////////
$(".js-Login-clickarea, .js-Login-close-form").click(function() {
  $(".js-Login-overlay-container").fadeOut("fast")
  $(".js-Site-container").toggleClass("locked");
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
    // $(".js-Login-username-toggle").removeClass("js-Login-question-icon").removeClass("js-Login-error-icon").addClass("js-Login-check-icon")
    $(".js-Login-username-toggle").addClass("js-Login-question-icon").removeClass("js-Login-error-icon");
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
    window.location.replace("tickets.html");
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

var cookies = document.cookie.split(';');
var $cookieName = "KS-Approvedcookies";
var cookieSet = false;
/////////////////////////////////////////////
// Check if Cookie is set
/////////////////////////////////////////////
if(cookies.length > 0) {
 cookies.map(function(cookie) {
 if(cookie.indexOf($cookieName) != -1 ) {
   cookieSet = true;
 }
 });
}
if(cookieSet != true) {
  $(".Cookie-container").show()
}
/////////////////////////////////////////////
// Approve and set cookie on click
/////////////////////////////////////////////
$(".js-Cookies-approve-btn").click(function() {
   var d = new Date();
   d.setTime(d.getTime() + (365*24*60*60*1000)); // Valid for a year
   var expires = "expires="+ d.toUTCString();
   document.cookie =$cookieName+"=true;"+expires;
   $(".Cookie-container").fadeOut("fast");
})


/////////////////////////////////////////////
// TOGGLE MENU OPEN
/////////////////////////////////////////////
$(".js-Menu-level-one-header").click(function() {
  $(this).next().slideToggle();
  $(this).toggleClass("children-open");
})

/////////////////////////////////////////////
// Debounce for header. Courtesy of David Walsh
/////////////////////////////////////////////
// var $headerContainer = $(".Header-container");
// function debounce(func, wait, immediate) {
// 	var timeout;
// 	return function() {
// 		var context = this, args = arguments;
// 		var later = function() {
// 			timeout = null;
// 			if (!immediate) func.apply(context, args);
// 		};
// 		var callNow = immediate && !timeout;
// 		clearTimeout(timeout);
// 		timeout = setTimeout(later, wait);
// 		if (callNow) func.apply(context, args);
// 	};
// };
//
// var $tightHeader = debounce(function() {
//   // console.log($siteContainer.offset().top);
//   if(document.body.scrollTop > 0) {
//     $headerContainer.addClass("Header-container--tight")
//   } else {
//     $headerContainer.removeClass("Header-container--tight")
//   }
// }, 250);
//
// $(window).on('scroll', function() {
// $tightHeader()
//  })







$(".js-Header-correct-btn").click(function() {
  $(".js-Login-header").html("Logga in för att rätta din lott")
  $(".js-Site-container").toggleClass("locked");
  $(".js-Login-overlay-container").fadeIn("fast");
  if($(".js-Menu-container").hasClass("Menu--open")) {
      toggleMenu();
  }
})
//
$(".js-Header-profile, .js-Open-login").click(function() {
  $(".js-Login-header").html("Logga in på Min Sida")
  $(".js-Site-container").toggleClass("locked");
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

// var $pn = $(".person-number");
// var $pnInput;
//
// $pn.focus(function(e) {
//   var $pnInput = $('[data-id="person-number"]')[0];
//   // $pnInput.focus();
//   $pnInput.setSelectionRange(0,1);
//   $pnInput.onChange(function() {
//     console.log("hejsan");
//   })
//
//
// })

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15UGFnZXMuanMiLCJMb2dpbi5qcyIsIkNvb2tpZXMuanMiLCJCcm93c2VyLmpzIiwiTWVudS5qcyIsIkhlYWRlci5qcyIsIkZvcm1zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChcIi5qcy1NeVBhZ2VzLXRvZ2dsZS1tYWlsXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLU15UGFnZXMtaGVscC1ib3gtLW1haWxcIikuc2xpZGVUb2dnbGUoKVxufSlcbiQoXCIuanMtTXlQYWdlcy10b2dnbGUtcGhvbmVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTXlQYWdlcy1oZWxwLWJveC0tcGhvbmVcIikuc2xpZGVUb2dnbGUoKVxufSlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ2hhbmdlIFBhc3N3b3JkIE1vZGFsXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTXlQYWdlcy1wYXNzd29yZC1idG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTXlQYWdlcy1wc3dyZC1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xufSlcbiQoXCIuanMtTXlQYWdlcy1jbG9zZS1mb3JtLCAuanMtTXlQYWdlcy1wc3dyZC1jbGlja2FyZWFcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTXlQYWdlcy1wc3dyZC1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbn0pXG52YXIgJG5ld1Bhc3N3b3JkID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZFwiKTtcbnZhciAkcmVwZWF0UGFzc3dvcmQgPSAkKFwiLmpzLU15UGFnZXMtcmVwZWF0LXBzd3JkXCIpO1xudmFyICRuZXdQYXNzd29yZFN0YXR1cyA9ICQoXCIuanMtTXlQYWdlcy1uZXctcHN3cmQtc3RhdHVzXCIpO1xudmFyICRuZXdQYXNzd29yZE1hdGNoID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZC1tYXRjaFwiKTtcbnZhciBwYXNzd29yZFN0YXRlID0ge1xuICBsZW5ndGg6IGZhbHNlLFxuICBwYXNzd29yZDogXCJcIixcbiAgcmVwZWF0UGFzc3dvcmQ6IFwiXCJcbn1cbi8vIENoZWNrIGlmIHBhc3N3b3JkIGlzIHN1ZmZpY2llbnRcbiRuZXdQYXNzd29yZC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiBwYXNzd29yZFN0YXRlLnBhc3N3b3JkID0gJCh0aGlzKS52YWwoKTtcbiBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJHJlcGVhdFBhc3N3b3JkLnZhbCgpO1xuaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZC5sZW5ndGggPj0gNikge1xuICBwYXNzd29yZFN0YXRlLmxlbmd0aCA9IHRydWU7XG59IGVsc2Uge1xuICBwYXNzd29yZFN0YXRlLmxlbmd0aCA9IGZhbHNlO1xufVxuY2hlY2tQYXNzd29yZCgpXG59KTtcbiRyZXBlYXRQYXNzd29yZC5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgcGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9ICRuZXdQYXNzd29yZC52YWwoKTtcbiAgcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCA9ICQodGhpcykudmFsKCk7XG5jaGVja1Bhc3N3b3JkKClcbn0pO1xuZnVuY3Rpb24gY2hlY2tQYXNzd29yZCgpIHtcbiAgaWYocGFzc3dvcmRTdGF0ZS5sZW5ndGgpIHtcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuaHRtbChcIkzDtnNlbm9yZCDDpHIgb2tcIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuYWRkQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLnJlbW92ZUNsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIHtcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuaHRtbChcIkzDtnNlbm9yZCBmw7ZyIGtvcnRcIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkU3RhdHVzLmFkZENsYXNzKFwidS1yZWRcIilcbiAgfVxuICBpZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkID09PSBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkICYmIHBhc3N3b3JkU3RhdGUubGVuZ3RoKSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lclwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLmFkZENsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLnJlbW92ZUNsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIGlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPT09IHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgJiYgcGFzc3dvcmRTdGF0ZS5sZW5ndGggPT09IGZhbHNlKSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lciBtZW4gw6RyIGbDtnIga29ydGFcIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXG4gIH0gZWxzZSB7XG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guaHRtbChcIkzDtnNlbm9yZGVuIMO2dmVyZW5zdMOkbW1lciBpbnRlXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LXJlZFwiKVxuICB9XG59XG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBDTE9TRSBNT0RBTFxuIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLWNsaWNrYXJlYSwgLmpzLUxvZ2luLWNsb3NlLWZvcm1cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbn0pXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAvLyBTTElERVRPR0dMRSBUSEUgSEVMUEJPWEVTXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLWhlbHAtYm94XCIpLnNsaWRlVG9nZ2xlKCk7XG59KTtcblxuJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGUsIC5qcy1Mb2dpbi1mb3Jnb3QtcGFzc3dvcmRcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tcGFzc3dvcmQtaGVscC1ib3hcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFNUQVRFIE9GIFRIRSBGT1JNXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbnZhciBzdGF0ZSA9IHtcbiAgdXNlck5hbWU6IGZhbHNlLCAvLyBJUyBDVVNUT01FUk5VTUJFUiBPUiBFTUFJTCBPS1xuICBwYXNzV29yZDogZmFsc2UsXG4gIGVtYWlsUmVnOiBmYWxzZSxcbiAgbnVtYmVyUmVnOiBmYWxzZVxufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBVU0VSTkFNRSBDSEVDS1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gIC8vIFJFR0VYIG1haWwuXG52YXIgZW1haWxSZWcgPSBuZXcgUmVnRXhwKC9eKChcIltcXHctXFxzXStcIil8KFtcXHctXSsoPzpcXC5bXFx3LV0rKSopfChcIltcXHctXFxzXStcIikoW1xcdy1dKyg/OlxcLltcXHctXSspKikpKEAoKD86W1xcdy1dK1xcLikqXFx3W1xcdy1dezAsNjZ9KVxcLihbYS16XXsyLDZ9KD86XFwuW2Etel17Mn0pPykkKXwoQFxcWz8oKDI1WzAtNV1cXC58MlswLTRdWzAtOV1cXC58MVswLTldezJ9XFwufFswLTldezEsMn1cXC4pKSgoMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXC4pezJ9KDI1WzAtNV18MlswLTRdWzAtOV18MVswLTldezJ9fFswLTldezEsMn0pXFxdPyQpL2kpO1xuICAvLyBSRUdFWCB1c2VyIG51bWJlci5cbnZhciB1c2VyTnVtYmVyUmVnID0gbmV3IFJlZ0V4cCgnXlthLXpBLVpdezJ9WzAtOV17Nn0kJyk7XG52YXIgdmFsaWRVc2VyO1xudmFyIHVzZXJOYW1lTWVzc2FnZSA9IFwiRHUgaGFyIGludGUgYW5naXZldCBldHQga29ycmVrdCBrdW5kbnVtbWVyIGVsbGVyIGUtcG9zdGFkcmVzcy5cIjtcbnZhciBwYXNzd29yZE1lc3NhZ2UgPSBcIkZlbGFrdGlndCBsw7ZzZW5vcmQuXCI7XG5cbi8vIElOUFVUIEZJRUxEIENIQU5HRVxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG4gICAgaWYoZW1haWxSZWcudGVzdCgkKHRoaXMpLnZhbCgpKSApIHtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gdHJ1ZTtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZih1c2VyTnVtYmVyUmVnLnRlc3QoJCh0aGlzKS52YWwoKSApKSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH1cbiAgICB2YWxpZFVzZXIgPSBzdGF0ZS5udW1iZXJSZWcgfHwgc3RhdGUuZW1haWxSZWc7XG4gICAgICBpZiAodmFsaWRVc2VyKSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzdGF0ZS51c2VyTmFtZSA9IGZhbHNlO1xuICAgICAgfVxufSk7XG5cbi8vIFdIRU4gSU5QVVQgSVMgRE9ORSBXSVRIIFRIRSBGSUVMRFxuJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykuZm9jdXNvdXQoZnVuY3Rpb24oKSB7XG4gIC8vIGNvbnNvbGUubG9nKFwiSU5QVVQgTk9UIElOIEZPQ1VTIEFOWSBNT1JFXCIpO1xuICBpZihzdGF0ZS51c2VyTmFtZSA9PSBmYWxzZSkge1xuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJCh0aGlzKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcblxuICB9IGVsc2Uge1xuICAgIC8vICQoXCIuanMtTG9naW4tdXNlcm5hbWUtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1jaGVjay1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKTtcbiAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuaGlkZSgpLmh0bWwoXCJcIilcbiAgfVxuXG4gIC8vIFdISUNIIEJPWCBTSE9VTEQgU0hPV1xuICBpZihzdGF0ZS5lbWFpbFJlZykge1xuICAgIHBhc3N3b3JkQm94KFwicmVzZXRcIilcbiAgICAkKFwiLmpzLUxvZ2luLXJlc2V0LWVtYWlsXCIpLmh0bWwoJCgnLmpzLUxvZ2luLWlucHV0LXVzZXJuYW1lJykudmFsKCkpIC8vIFNFVCBUSEUgRU1BSUwgSU4gVEhFIE1FU1NBR0UgVE8gV0hBVEVWRVIgSVQgSVMgSU4gVEhFIElOUFVUIElGIElUIElTIFZBTElEXG4gIH0gZWxzZSB7XG4gICAgcGFzc3dvcmRCb3goXCJkZWZhdWx0XCIpXG4gIH1cbn0pXG5cbiQoXCIuanMtTG9naW4tcmVzZXQtcGFzc3dvcmQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgcGFzc3dvcmRCb3goXCJzZW50XCIpXG59KVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFBBU1NXT1JEIEhFTFAgQk9YXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmZ1bmN0aW9uIHBhc3N3b3JkQm94KGJveCkge1xuICBpZihib3ggPT0gXCJyZXNldFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuc2hvdygpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5oaWRlKCk7XG4gIH0gZWxzZSBpZihib3ggPT0gXCJzZW50XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLmhpZGUoKTtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXNlbnQtYm94XCIpLnNob3coKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcImRlZmF1bHRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3gsIC5qcy1Mb2dpbi1wYXNzd29yZC1yZXNldC1ib3hcIikuaGlkZSgpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuc2hvdygpO1xuICB9XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSU5QVVQgRklFTERcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4kKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuXG4gIHZhciBwYXNzV29yZCA9ICQodGhpcykudmFsKCk7XG5cbiAgaWYocGFzc1dvcmQgPT0gXCJrb21iaVwiIHx8IHBhc3NXb3JkPT0gXCJsb3R0ZXJcIiB8fCBwYXNzV29yZCA9PSBcInNwZWxcIikge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gdHJ1ZVxuICB9IGVsc2Uge1xuICAgIHN0YXRlLnBhc3NXb3JkID0gZmFsc2VcbiAgfVxuICAgIGlmKHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5oaWRlKCk7XG4gICAgfVxuICAgIGlmKCQodGhpcykuaGFzQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKSkge1xuICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpXG4gICAgfVxuIH0pO1xuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDSEVDSyBJRiBMT0dJTiBQQVNTRUQgKEpVU1QgRk9SIFBST1RPVFlQRSBURVNUSU5HKVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKFwiLmpzLUxvZ2luLWZvcm0tc3VibWl0LWJ0blwiKS5jbGljayhmdW5jdGlvbihlKSB7XG4gIGUucHJldmVudERlZmF1bHQoZSlcbiAgaWYodmFsaWRVc2VyICYmIHN0YXRlLnBhc3NXb3JkKSB7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlcGxhY2UoXCJ0aWNrZXRzLmh0bWxcIik7XG4gIH1cbiAgZWxzZSBpZih2YWxpZFVzZXIgPT0gdHJ1ZSAmJiBzdGF0ZS5wYXNzV29yZCAhPSB0cnVlKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmFkZENsYXNzKFwiTG9naW4taGVhZGVyLS1lcnJvclwiKS5odG1sKFwiSW5sb2dnbmluZ2VuIG1pc3NseWNrYWRlc1wiKVxuICAgICQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbiAgZWxzZSB7XG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS1tZXNzYWdlXCIpLnNob3coKS5odG1sKHVzZXJOYW1lTWVzc2FnZSlcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwocGFzc3dvcmRNZXNzYWdlKVxuICB9XG59KTtcbiIsInZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7Jyk7XG52YXIgJGNvb2tpZU5hbWUgPSBcIktTLUFwcHJvdmVkY29va2llc1wiO1xudmFyIGNvb2tpZVNldCA9IGZhbHNlO1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDaGVjayBpZiBDb29raWUgaXMgc2V0XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbmlmKGNvb2tpZXMubGVuZ3RoID4gMCkge1xuIGNvb2tpZXMubWFwKGZ1bmN0aW9uKGNvb2tpZSkge1xuIGlmKGNvb2tpZS5pbmRleE9mKCRjb29raWVOYW1lKSAhPSAtMSApIHtcbiAgIGNvb2tpZVNldCA9IHRydWU7XG4gfVxuIH0pO1xufVxuaWYoY29va2llU2V0ICE9IHRydWUpIHtcbiAgJChcIi5Db29raWUtY29udGFpbmVyXCIpLnNob3coKVxufVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBBcHByb3ZlIGFuZCBzZXQgY29va2llIG9uIGNsaWNrXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtQ29va2llcy1hcHByb3ZlLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgIHZhciBkID0gbmV3IERhdGUoKTtcbiAgIGQuc2V0VGltZShkLmdldFRpbWUoKSArICgzNjUqMjQqNjAqNjAqMTAwMCkpOyAvLyBWYWxpZCBmb3IgYSB5ZWFyXG4gICB2YXIgZXhwaXJlcyA9IFwiZXhwaXJlcz1cIisgZC50b1VUQ1N0cmluZygpO1xuICAgZG9jdW1lbnQuY29va2llID0kY29va2llTmFtZStcIj10cnVlO1wiK2V4cGlyZXM7XG4gICAkKFwiLkNvb2tpZS1jb250YWluZXJcIikuZmFkZU91dChcImZhc3RcIik7XG59KVxuIiwiIiwiLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBUT0dHTEUgTUVOVSBPUEVOXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTWVudS1sZXZlbC1vbmUtaGVhZGVyXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKHRoaXMpLm5leHQoKS5zbGlkZVRvZ2dsZSgpO1xuICAkKHRoaXMpLnRvZ2dsZUNsYXNzKFwiY2hpbGRyZW4tb3BlblwiKTtcbn0pXG4iLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIERlYm91bmNlIGZvciBoZWFkZXIuIENvdXJ0ZXN5IG9mIERhdmlkIFdhbHNoXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIHZhciAkaGVhZGVyQ29udGFpbmVyID0gJChcIi5IZWFkZXItY29udGFpbmVyXCIpO1xuLy8gZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4vLyBcdHZhciB0aW1lb3V0O1xuLy8gXHRyZXR1cm4gZnVuY3Rpb24oKSB7XG4vLyBcdFx0dmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuLy8gXHRcdHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuLy8gXHRcdFx0dGltZW91dCA9IG51bGw7XG4vLyBcdFx0XHRpZiAoIWltbWVkaWF0ZSkgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbi8vIFx0XHR9O1xuLy8gXHRcdHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuLy8gXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbi8vIFx0XHR0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4vLyBcdFx0aWYgKGNhbGxOb3cpIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4vLyBcdH07XG4vLyB9O1xuLy9cbi8vIHZhciAkdGlnaHRIZWFkZXIgPSBkZWJvdW5jZShmdW5jdGlvbigpIHtcbi8vICAgLy8gY29uc29sZS5sb2coJHNpdGVDb250YWluZXIub2Zmc2V0KCkudG9wKTtcbi8vICAgaWYoZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPiAwKSB7XG4vLyAgICAgJGhlYWRlckNvbnRhaW5lci5hZGRDbGFzcyhcIkhlYWRlci1jb250YWluZXItLXRpZ2h0XCIpXG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgJGhlYWRlckNvbnRhaW5lci5yZW1vdmVDbGFzcyhcIkhlYWRlci1jb250YWluZXItLXRpZ2h0XCIpXG4vLyAgIH1cbi8vIH0sIDI1MCk7XG4vL1xuLy8gJCh3aW5kb3cpLm9uKCdzY3JvbGwnLCBmdW5jdGlvbigpIHtcbi8vICR0aWdodEhlYWRlcigpXG4vLyAgfSlcblxuXG5cblxuXG5cblxuJChcIi5qcy1IZWFkZXItY29ycmVjdC1idG5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBmw7ZyIGF0dCByw6R0dGEgZGluIGxvdHRcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICBpZigkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgdG9nZ2xlTWVudSgpO1xuICB9XG59KVxuLy9cbiQoXCIuanMtSGVhZGVyLXByb2ZpbGUsIC5qcy1PcGVuLWxvZ2luXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5odG1sKFwiTG9nZ2EgaW4gcMOlIE1pbiBTaWRhXCIpXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIik7XG4gICQoXCIuanMtTG9naW4tb3ZlcmxheS1jb250YWluZXJcIikuZmFkZUluKFwiZmFzdFwiKTtcbiAgICBpZigkKFwiLmpzLU1lbnUtY29udGFpbmVyXCIpLmhhc0NsYXNzKFwiTWVudS0tb3BlblwiKSkge1xuICAgICAgICB0b2dnbGVNZW51KCk7XG4gICAgfVxufSlcblxuJChcIi5qcy1IZWFkZXItbWVudS1jb250YWluZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSk7XG5cblxuJChcIi5qcy1NZW51LW92ZXJsYXlcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gIHRvZ2dsZU1lbnUoKVxufSlcblxudmFyIG1lbnVUZXh0ID0gJChcIi5qcy1IZWFkZXItdGl0bGUtLW1lbnVcIik7XG5cbmZ1bmN0aW9uIHRvZ2dsZU1lbnUoKSB7XG4gICQoXCIuanMtTWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJNZW51LS1vcGVuXCIpXG4gICQoXCIuanMtU2l0ZS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJsb2NrZWRcIilcbiAgJChcIi5qcy1IZWFkZXItbWVudS1jb250YWluZXJcIikudG9nZ2xlQ2xhc3MoXCJCdXJnZXItLW9wZW5cIik7XG5cbiAgaWYobWVudVRleHQudGV4dCgpID09IFwibWVueVwiKSB7XG4gICAgICBtZW51VGV4dC50ZXh0KFwic3TDpG5nXCIpXG4gIH0gZWxzZSB7XG4gICAgbWVudVRleHQudGV4dChcIm1lbnlcIilcbiAgfVxufVxuIiwiLy8gdmFyICRwbiA9ICQoXCIucGVyc29uLW51bWJlclwiKTtcbi8vIHZhciAkcG5JbnB1dDtcbi8vXG4vLyAkcG4uZm9jdXMoZnVuY3Rpb24oZSkge1xuLy8gICB2YXIgJHBuSW5wdXQgPSAkKCdbZGF0YS1pZD1cInBlcnNvbi1udW1iZXJcIl0nKVswXTtcbi8vICAgLy8gJHBuSW5wdXQuZm9jdXMoKTtcbi8vICAgJHBuSW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UoMCwxKTtcbi8vICAgJHBuSW5wdXQub25DaGFuZ2UoZnVuY3Rpb24oKSB7XG4vLyAgICAgY29uc29sZS5sb2coXCJoZWpzYW5cIik7XG4vLyAgIH0pXG4vL1xuLy9cbi8vIH0pXG4iXX0=
