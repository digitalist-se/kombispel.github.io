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

/////////////////////////////////////////////
// Smooth Scrolling
/////////////////////////////////////////////
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});
 

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk15UGFnZXMuanMiLCJMb2dpbi5qcyIsIkNvb2tpZXMuanMiLCJCcm93c2VyLmpzIiwiTWVudS5qcyIsIkhlYWRlci5qcyIsIkZvcm1zLmpzIiwiUHJpY2VzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMxQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM5RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIkKFwiLmpzLU15UGFnZXMtdG9nZ2xlLW1haWxcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTXlQYWdlcy1oZWxwLWJveC0tbWFpbFwiKS5zbGlkZVRvZ2dsZSgpXG59KVxuJChcIi5qcy1NeVBhZ2VzLXRvZ2dsZS1waG9uZVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1NeVBhZ2VzLWhlbHAtYm94LS1waG9uZVwiKS5zbGlkZVRvZ2dsZSgpXG59KVxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDaGFuZ2UgUGFzc3dvcmQgTW9kYWxcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1NeVBhZ2VzLXBhc3N3b3JkLWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1NeVBhZ2VzLXBzd3JkLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG59KVxuJChcIi5qcy1NeVBhZ2VzLWNsb3NlLWZvcm0sIC5qcy1NeVBhZ2VzLXBzd3JkLWNsaWNrYXJlYVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1NeVBhZ2VzLXBzd3JkLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVPdXQoXCJmYXN0XCIpO1xufSlcbnZhciAkbmV3UGFzc3dvcmQgPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkXCIpO1xudmFyICRyZXBlYXRQYXNzd29yZCA9ICQoXCIuanMtTXlQYWdlcy1yZXBlYXQtcHN3cmRcIik7XG52YXIgJG5ld1Bhc3N3b3JkU3RhdHVzID0gJChcIi5qcy1NeVBhZ2VzLW5ldy1wc3dyZC1zdGF0dXNcIik7XG52YXIgJG5ld1Bhc3N3b3JkTWF0Y2ggPSAkKFwiLmpzLU15UGFnZXMtbmV3LXBzd3JkLW1hdGNoXCIpO1xudmFyIHBhc3N3b3JkU3RhdGUgPSB7XG4gIGxlbmd0aDogZmFsc2UsXG4gIHBhc3N3b3JkOiBcIlwiLFxuICByZXBlYXRQYXNzd29yZDogXCJcIlxufVxuLy8gQ2hlY2sgaWYgcGFzc3dvcmQgaXMgc3VmZmljaWVudFxuJG5ld1Bhc3N3b3JkLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuIHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPSAkKHRoaXMpLnZhbCgpO1xuIHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgPSAkcmVwZWF0UGFzc3dvcmQudmFsKCk7XG5pZihwYXNzd29yZFN0YXRlLnBhc3N3b3JkLmxlbmd0aCA+PSA2KSB7XG4gIHBhc3N3b3JkU3RhdGUubGVuZ3RoID0gdHJ1ZTtcbn0gZWxzZSB7XG4gIHBhc3N3b3JkU3RhdGUubGVuZ3RoID0gZmFsc2U7XG59XG5jaGVja1Bhc3N3b3JkKClcbn0pO1xuJHJlcGVhdFBhc3N3b3JkLm9uKCdpbnB1dCcsIGZ1bmN0aW9uKCkge1xuICBwYXNzd29yZFN0YXRlLnBhc3N3b3JkID0gJG5ld1Bhc3N3b3JkLnZhbCgpO1xuICBwYXNzd29yZFN0YXRlLnJlcGVhdFBhc3N3b3JkID0gJCh0aGlzKS52YWwoKTtcbmNoZWNrUGFzc3dvcmQoKVxufSk7XG5mdW5jdGlvbiBjaGVja1Bhc3N3b3JkKCkge1xuICBpZihwYXNzd29yZFN0YXRlLmxlbmd0aCkge1xuICAgICRuZXdQYXNzd29yZFN0YXR1cy5odG1sKFwiTMO2c2Vub3JkIMOkciBva1wiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5hZGRDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMucmVtb3ZlQ2xhc3MoXCJ1LXJlZFwiKVxuICB9IGVsc2Uge1xuICAgICRuZXdQYXNzd29yZFN0YXR1cy5odG1sKFwiTMO2c2Vub3JkIGbDtnIga29ydFwiKVxuICAgICRuZXdQYXNzd29yZFN0YXR1cy5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRTdGF0dXMuYWRkQ2xhc3MoXCJ1LXJlZFwiKVxuICB9XG4gIGlmKHBhc3N3b3JkU3RhdGUucGFzc3dvcmQgPT09IHBhc3N3b3JkU3RhdGUucmVwZWF0UGFzc3dvcmQgJiYgcGFzc3dvcmRTdGF0ZS5sZW5ndGgpIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2guYWRkQ2xhc3MoXCJ1LWdyZWVuXCIpXG4gICAgJG5ld1Bhc3N3b3JkTWF0Y2gucmVtb3ZlQ2xhc3MoXCJ1LXJlZFwiKVxuICB9IGVsc2UgaWYocGFzc3dvcmRTdGF0ZS5wYXNzd29yZCA9PT0gcGFzc3dvcmRTdGF0ZS5yZXBlYXRQYXNzd29yZCAmJiBwYXNzd29yZFN0YXRlLmxlbmd0aCA9PT0gZmFsc2UpIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyIG1lbiDDpHIgZsO2ciBrb3J0YVwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLnJlbW92ZUNsYXNzKFwidS1ncmVlblwiKVxuICAgICRuZXdQYXNzd29yZE1hdGNoLmFkZENsYXNzKFwidS1yZWRcIilcbiAgfSBlbHNlIHtcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5odG1sKFwiTMO2c2Vub3JkZW4gw7Z2ZXJlbnN0w6RtbWVyIGludGVcIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5yZW1vdmVDbGFzcyhcInUtZ3JlZW5cIilcbiAgICAkbmV3UGFzc3dvcmRNYXRjaC5hZGRDbGFzcyhcInUtcmVkXCIpXG4gIH1cbn1cbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIENMT1NFIE1PREFMXG4gLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tY2xpY2thcmVhLCAuanMtTG9naW4tY2xvc2UtZm9ybVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xufSlcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuIC8vIFNMSURFVE9HR0xFIFRIRSBIRUxQQk9YRVNcbiAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4tdXNlcm5hbWUtaGVscC1ib3hcIikuc2xpZGVUb2dnbGUoKTtcbn0pO1xuXG4kKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZSwgLmpzLUxvZ2luLWZvcmdvdC1wYXNzd29yZFwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1oZWxwLWJveFwiKS5zbGlkZVRvZ2dsZSgpO1xufSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU1RBVEUgT0YgVEhFIEZPUk1cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xudmFyIHN0YXRlID0ge1xuICB1c2VyTmFtZTogZmFsc2UsIC8vIElTIENVU1RPTUVSTlVNQkVSIE9SIEVNQUlMIE9LXG4gIHBhc3NXb3JkOiBmYWxzZSxcbiAgZW1haWxSZWc6IGZhbHNlLFxuICBudW1iZXJSZWc6IGZhbHNlXG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFVTRVJOQU1FIENIRUNLXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgLy8gUkVHRVggbWFpbC5cbnZhciBlbWFpbFJlZyA9IG5ldyBSZWdFeHAoL14oKFwiW1xcdy1cXHNdK1wiKXwoW1xcdy1dKyg/OlxcLltcXHctXSspKil8KFwiW1xcdy1cXHNdK1wiKShbXFx3LV0rKD86XFwuW1xcdy1dKykqKSkoQCgoPzpbXFx3LV0rXFwuKSpcXHdbXFx3LV17MCw2Nn0pXFwuKFthLXpdezIsNn0oPzpcXC5bYS16XXsyfSk/KSQpfChAXFxbPygoMjVbMC01XVxcLnwyWzAtNF1bMC05XVxcLnwxWzAtOV17Mn1cXC58WzAtOV17MSwyfVxcLikpKCgyNVswLTVdfDJbMC00XVswLTldfDFbMC05XXsyfXxbMC05XXsxLDJ9KVxcLil7Mn0oMjVbMC01XXwyWzAtNF1bMC05XXwxWzAtOV17Mn18WzAtOV17MSwyfSlcXF0/JCkvaSk7XG4gIC8vIFJFR0VYIHVzZXIgbnVtYmVyLlxudmFyIHVzZXJOdW1iZXJSZWcgPSBuZXcgUmVnRXhwKCdeW2EtekEtWl17Mn1bMC05XXs2fSQnKTtcbnZhciB2YWxpZFVzZXI7XG52YXIgdXNlck5hbWVNZXNzYWdlID0gXCJEdSBoYXIgaW50ZSBhbmdpdmV0IGV0dCBrb3JyZWt0IGt1bmRudW1tZXIgZWxsZXIgZS1wb3N0YWRyZXNzLlwiO1xudmFyIHBhc3N3b3JkTWVzc2FnZSA9IFwiRmVsYWt0aWd0IGzDtnNlbm9yZC5cIjtcblxuLy8gSU5QVVQgRklFTEQgQ0hBTkdFXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5vbignaW5wdXQnLCBmdW5jdGlvbigpIHtcbiAgICBpZihlbWFpbFJlZy50ZXN0KCQodGhpcykudmFsKCkpICkge1xuICAgICAgc3RhdGUuZW1haWxSZWcgPSB0cnVlO1xuICAgICAgc3RhdGUubnVtYmVyUmVnID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmKHVzZXJOdW1iZXJSZWcudGVzdCgkKHRoaXMpLnZhbCgpICkpIHtcbiAgICAgIHN0YXRlLm51bWJlclJlZyA9IHRydWU7XG4gICAgICBzdGF0ZS5lbWFpbFJlZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdGF0ZS5udW1iZXJSZWcgPSBmYWxzZTtcbiAgICAgIHN0YXRlLmVtYWlsUmVnID0gZmFsc2U7XG4gICAgfVxuICAgIHZhbGlkVXNlciA9IHN0YXRlLm51bWJlclJlZyB8fCBzdGF0ZS5lbWFpbFJlZztcbiAgICAgIGlmICh2YWxpZFVzZXIpIHtcbiAgICAgICAgc3RhdGUudXNlck5hbWUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHN0YXRlLnVzZXJOYW1lID0gZmFsc2U7XG4gICAgICB9XG59KTtcblxuLy8gV0hFTiBJTlBVVCBJUyBET05FIFdJVEggVEhFIEZJRUxEXG4kKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS5mb2N1c291dChmdW5jdGlvbigpIHtcbiAgLy8gY29uc29sZS5sb2coXCJJTlBVVCBOT1QgSU4gRk9DVVMgQU5ZIE1PUkVcIik7XG4gIGlmKHN0YXRlLnVzZXJOYW1lID09IGZhbHNlKSB7XG4gICAgJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tY2hlY2staWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKHRoaXMpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuXG4gIH0gZWxzZSB7XG4gICAgLy8gJChcIi5qcy1Mb2dpbi11c2VybmFtZS10b2dnbGVcIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1xdWVzdGlvbi1pY29uXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWNoZWNrLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpO1xuICAgICQodGhpcykucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1pbnB1dC1lcnJvclwiKVxuICAgICQoXCIuanMtTG9naW4tdXNlcm5hbWUtbWVzc2FnZVwiKS5oaWRlKCkuaHRtbChcIlwiKVxuICB9XG5cbiAgLy8gV0hJQ0ggQk9YIFNIT1VMRCBTSE9XXG4gIGlmKHN0YXRlLmVtYWlsUmVnKSB7XG4gICAgcGFzc3dvcmRCb3goXCJyZXNldFwiKVxuICAgICQoXCIuanMtTG9naW4tcmVzZXQtZW1haWxcIikuaHRtbCgkKCcuanMtTG9naW4taW5wdXQtdXNlcm5hbWUnKS52YWwoKSkgLy8gU0VUIFRIRSBFTUFJTCBJTiBUSEUgTUVTU0FHRSBUTyBXSEFURVZFUiBJVCBJUyBJTiBUSEUgSU5QVVQgSUYgSVQgSVMgVkFMSURcbiAgfSBlbHNlIHtcbiAgICBwYXNzd29yZEJveChcImRlZmF1bHRcIilcbiAgfVxufSlcblxuJChcIi5qcy1Mb2dpbi1yZXNldC1wYXNzd29yZC1idG5cIikuY2xpY2soZnVuY3Rpb24oZSkge1xuICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICBwYXNzd29yZEJveChcInNlbnRcIilcbn0pXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gUEFTU1dPUkQgSEVMUCBCT1hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuZnVuY3Rpb24gcGFzc3dvcmRCb3goYm94KSB7XG4gIGlmKGJveCA9PSBcInJlc2V0XCIpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5zaG93KCk7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLWRlZmF1bHQtYm94XCIpLmhpZGUoKTtcbiAgfSBlbHNlIGlmKGJveCA9PSBcInNlbnRcIikge1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtcmVzZXQtYm94LCAuanMtTG9naW4tcGFzc3dvcmQtZGVmYXVsdC1ib3hcIikuaGlkZSgpO1xuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtc2VudC1ib3hcIikuc2hvdygpO1xuICB9IGVsc2UgaWYoYm94ID09IFwiZGVmYXVsdFwiKSB7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1zZW50LWJveCwgLmpzLUxvZ2luLXBhc3N3b3JkLXJlc2V0LWJveFwiKS5oaWRlKCk7XG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1kZWZhdWx0LWJveFwiKS5zaG93KCk7XG4gIH1cbn1cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBQQVNTV09SRCBJTlBVVCBGSUVMRFxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiQoXCIuanMtTG9naW4taW5wdXQtcGFzc3dvcmRcIikub24oJ2lucHV0JywgZnVuY3Rpb24oKSB7XG5cbiAgdmFyIHBhc3NXb3JkID0gJCh0aGlzKS52YWwoKTtcblxuICBpZihwYXNzV29yZCA9PSBcImtvbWJpXCIgfHwgcGFzc1dvcmQ9PSBcImxvdHRlclwiIHx8IHBhc3NXb3JkID09IFwic3BlbFwiKSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSB0cnVlXG4gIH0gZWxzZSB7XG4gICAgc3RhdGUucGFzc1dvcmQgPSBmYWxzZVxuICB9XG4gICAgaWYoc3RhdGUucGFzc1dvcmQgIT0gdHJ1ZSkge1xuICAgICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLmhpZGUoKTtcbiAgICB9XG4gICAgaWYoJCh0aGlzKS5oYXNDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpKSB7XG4gICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIilcbiAgICB9XG4gfSk7XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENIRUNLIElGIExPR0lOIFBBU1NFRCAoSlVTVCBGT1IgUFJPVE9UWVBFIFRFU1RJTkcpXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiQoXCIuanMtTG9naW4tZm9ybS1zdWJtaXQtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcbiAgZS5wcmV2ZW50RGVmYXVsdChlKVxuICBpZih2YWxpZFVzZXIgJiYgc3RhdGUucGFzc1dvcmQpIHtcbiAgICB3aW5kb3cubG9jYXRpb24ucmVwbGFjZShcInRpY2tldHMuaHRtbFwiKTtcbiAgfVxuICBlbHNlIGlmKHZhbGlkVXNlciA9PSB0cnVlICYmIHN0YXRlLnBhc3NXb3JkICE9IHRydWUpIHtcbiAgICAkKFwiLmpzLUxvZ2luLXBhc3N3b3JkLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikuYWRkQ2xhc3MoXCJqcy1Mb2dpbi1lcnJvci1pY29uXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuYWRkQ2xhc3MoXCJMb2dpbi1oZWFkZXItLWVycm9yXCIpLmh0bWwoXCJJbmxvZ2duaW5nZW4gbWlzc2x5Y2thZGVzXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1pbnB1dC1wYXNzd29yZFwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWlucHV0LWVycm9yXCIpXG4gICAgJChcIi5qcy1Mb2dpbi1wYXNzd29yZC1tZXNzYWdlXCIpLnNob3coKS5odG1sKHBhc3N3b3JkTWVzc2FnZSlcbiAgfVxuICBlbHNlIHtcbiAgICAkKFwiLmpzLUxvZ2luLWhlYWRlclwiKS5hZGRDbGFzcyhcIkxvZ2luLWhlYWRlci0tZXJyb3JcIikuaHRtbChcIklubG9nZ25pbmdlbiBtaXNzbHlja2FkZXNcIilcbiAgICAkKFwiLmpzLUxvZ2luLWlucHV0LXBhc3N3b3JkXCIpLmFkZENsYXNzKFwianMtTG9naW4taW5wdXQtZXJyb3JcIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLXRvZ2dsZVwiKS5yZW1vdmVDbGFzcyhcImpzLUxvZ2luLXF1ZXN0aW9uLWljb25cIikucmVtb3ZlQ2xhc3MoXCJqcy1Mb2dpbi1jaGVjay1pY29uXCIpLmFkZENsYXNzKFwianMtTG9naW4tZXJyb3ItaWNvblwiKVxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtdG9nZ2xlXCIpLnJlbW92ZUNsYXNzKFwianMtTG9naW4tcXVlc3Rpb24taWNvblwiKS5hZGRDbGFzcyhcImpzLUxvZ2luLWVycm9yLWljb25cIilcbiAgICAkKFwiLmpzLUxvZ2luLXVzZXJuYW1lLW1lc3NhZ2VcIikuc2hvdygpLmh0bWwodXNlck5hbWVNZXNzYWdlKVxuICAgICQoXCIuanMtTG9naW4tcGFzc3dvcmQtbWVzc2FnZVwiKS5zaG93KCkuaHRtbChwYXNzd29yZE1lc3NhZ2UpXG4gIH1cbn0pO1xuIiwidmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKTtcbnZhciAkY29va2llTmFtZSA9IFwiS1MtQXBwcm92ZWRjb29raWVzXCI7XG52YXIgY29va2llU2V0ID0gZmFsc2U7XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENoZWNrIGlmIENvb2tpZSBpcyBzZXRcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuaWYoY29va2llcy5sZW5ndGggPiAwKSB7XG4gY29va2llcy5tYXAoZnVuY3Rpb24oY29va2llKSB7XG4gaWYoY29va2llLmluZGV4T2YoJGNvb2tpZU5hbWUpICE9IC0xICkge1xuICAgY29va2llU2V0ID0gdHJ1ZTtcbiB9XG4gfSk7XG59XG5pZihjb29raWVTZXQgIT0gdHJ1ZSkge1xuICAkKFwiLkNvb2tpZS1jb250YWluZXJcIikuc2hvdygpXG59XG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEFwcHJvdmUgYW5kIHNldCBjb29raWUgb24gY2xpY2tcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1Db29raWVzLWFwcHJvdmUtYnRuXCIpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgdmFyIGQgPSBuZXcgRGF0ZSgpO1xuICAgZC5zZXRUaW1lKGQuZ2V0VGltZSgpICsgKDM2NSoyNCo2MCo2MCoxMDAwKSk7IC8vIFZhbGlkIGZvciBhIHllYXJcbiAgIHZhciBleHBpcmVzID0gXCJleHBpcmVzPVwiKyBkLnRvVVRDU3RyaW5nKCk7XG4gICBkb2N1bWVudC5jb29raWUgPSRjb29raWVOYW1lK1wiPXRydWU7XCIrZXhwaXJlcztcbiAgICQoXCIuQ29va2llLWNvbnRhaW5lclwiKS5mYWRlT3V0KFwiZmFzdFwiKTtcbn0pXG4iLCIiLCIvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFRPR0dMRSBNRU5VIE9QRU5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuJChcIi5qcy1NZW51LWxldmVsLW9uZS1oZWFkZXJcIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQodGhpcykubmV4dCgpLnNsaWRlVG9nZ2xlKCk7XG4gICQodGhpcykudG9nZ2xlQ2xhc3MoXCJjaGlsZHJlbi1vcGVuXCIpO1xufSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRGVib3VuY2UgZm9yIGhlYWRlci4gQ291cnRlc3kgb2YgRGF2aWQgV2Fsc2hcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gdmFyICRoZWFkZXJDb250YWluZXIgPSAkKFwiLkhlYWRlci1jb250YWluZXJcIik7XG4vLyBmdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbi8vIFx0dmFyIHRpbWVvdXQ7XG4vLyBcdHJldHVybiBmdW5jdGlvbigpIHtcbi8vIFx0XHR2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4vLyBcdFx0dmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4vLyBcdFx0XHR0aW1lb3V0ID0gbnVsbDtcbi8vIFx0XHRcdGlmICghaW1tZWRpYXRlKSBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuLy8gXHRcdH07XG4vLyBcdFx0dmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4vLyBcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuLy8gXHRcdHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbi8vIFx0XHRpZiAoY2FsbE5vdykgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcbi8vIFx0fTtcbi8vIH07XG4vL1xuLy8gdmFyICR0aWdodEhlYWRlciA9IGRlYm91bmNlKGZ1bmN0aW9uKCkge1xuLy8gICAvLyBjb25zb2xlLmxvZygkc2l0ZUNvbnRhaW5lci5vZmZzZXQoKS50b3ApO1xuLy8gICBpZihkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA+IDApIHtcbi8vICAgICAkaGVhZGVyQ29udGFpbmVyLmFkZENsYXNzKFwiSGVhZGVyLWNvbnRhaW5lci0tdGlnaHRcIilcbi8vICAgfSBlbHNlIHtcbi8vICAgICAkaGVhZGVyQ29udGFpbmVyLnJlbW92ZUNsYXNzKFwiSGVhZGVyLWNvbnRhaW5lci0tdGlnaHRcIilcbi8vICAgfVxuLy8gfSwgMjUwKTtcbi8vXG4vLyAkKHdpbmRvdykub24oJ3Njcm9sbCcsIGZ1bmN0aW9uKCkge1xuLy8gJHRpZ2h0SGVhZGVyKClcbi8vICB9KVxuXG5cblxuXG5cblxuXG4kKFwiLmpzLUhlYWRlci1jb3JyZWN0LWJ0blwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgJChcIi5qcy1Mb2dpbi1oZWFkZXJcIikuaHRtbChcIkxvZ2dhIGluIGbDtnIgYXR0IHLDpHR0YSBkaW4gbG90dFwiKVxuICAkKFwiLmpzLVNpdGUtY29udGFpbmVyXCIpLnRvZ2dsZUNsYXNzKFwibG9ja2VkXCIpO1xuICAkKFwiLmpzLUxvZ2luLW92ZXJsYXktY29udGFpbmVyXCIpLmZhZGVJbihcImZhc3RcIik7XG4gIGlmKCQoXCIuanMtTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICB0b2dnbGVNZW51KCk7XG4gIH1cbn0pXG4vL1xuJChcIi5qcy1IZWFkZXItcHJvZmlsZSwgLmpzLU9wZW4tbG9naW5cIikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICQoXCIuanMtTG9naW4taGVhZGVyXCIpLmh0bWwoXCJMb2dnYSBpbiBww6UgTWluIFNpZGFcIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKTtcbiAgJChcIi5qcy1Mb2dpbi1vdmVybGF5LWNvbnRhaW5lclwiKS5mYWRlSW4oXCJmYXN0XCIpO1xuICAgIGlmKCQoXCIuanMtTWVudS1jb250YWluZXJcIikuaGFzQ2xhc3MoXCJNZW51LS1vcGVuXCIpKSB7XG4gICAgICAgIHRvZ2dsZU1lbnUoKTtcbiAgICB9XG59KVxuXG4kKFwiLmpzLUhlYWRlci1tZW51LWNvbnRhaW5lclwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpXG59KTtcblxuXG4kKFwiLmpzLU1lbnUtb3ZlcmxheVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgdG9nZ2xlTWVudSgpXG59KVxuXG52YXIgbWVudVRleHQgPSAkKFwiLmpzLUhlYWRlci10aXRsZS0tbWVudVwiKTtcblxuZnVuY3Rpb24gdG9nZ2xlTWVudSgpIHtcbiAgJChcIi5qcy1NZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIk1lbnUtLW9wZW5cIilcbiAgJChcIi5qcy1TaXRlLWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcImxvY2tlZFwiKVxuICAkKFwiLmpzLUhlYWRlci1tZW51LWNvbnRhaW5lclwiKS50b2dnbGVDbGFzcyhcIkJ1cmdlci0tb3BlblwiKTtcblxuICBpZihtZW51VGV4dC50ZXh0KCkgPT0gXCJtZW55XCIpIHtcbiAgICAgIG1lbnVUZXh0LnRleHQoXCJzdMOkbmdcIilcbiAgfSBlbHNlIHtcbiAgICBtZW51VGV4dC50ZXh0KFwibWVueVwiKVxuICB9XG59XG4iLCIvLyB2YXIgJHBuID0gJChcIi5wZXJzb24tbnVtYmVyXCIpO1xuLy8gdmFyICRwbklucHV0O1xuLy9cbi8vICRwbi5mb2N1cyhmdW5jdGlvbihlKSB7XG4vLyAgIHZhciAkcG5JbnB1dCA9ICQoJ1tkYXRhLWlkPVwicGVyc29uLW51bWJlclwiXScpWzBdO1xuLy8gICAvLyAkcG5JbnB1dC5mb2N1cygpO1xuLy8gICAkcG5JbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSgwLDEpO1xuLy8gICAkcG5JbnB1dC5vbkNoYW5nZShmdW5jdGlvbigpIHtcbi8vICAgICBjb25zb2xlLmxvZyhcImhlanNhblwiKTtcbi8vICAgfSlcbi8vXG4vL1xuLy8gfSlcbiIsIi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gU21vb3RoIFNjcm9sbGluZ1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4kKGZ1bmN0aW9uKCkge1xuICAkKCdhW2hyZWYqPVwiI1wiXTpub3QoW2hyZWY9XCIjXCJdKScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgIGlmIChsb2NhdGlvbi5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgPT0gdGhpcy5wYXRobmFtZS5yZXBsYWNlKC9eXFwvLywnJykgJiYgbG9jYXRpb24uaG9zdG5hbWUgPT0gdGhpcy5ob3N0bmFtZSkge1xuICAgICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICAgIHRhcmdldCA9IHRhcmdldC5sZW5ndGggPyB0YXJnZXQgOiAkKCdbbmFtZT0nICsgdGhpcy5oYXNoLnNsaWNlKDEpICsnXScpO1xuICAgICAgaWYgKHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgICAgICB9LCA1MDApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuIFxuIl19
