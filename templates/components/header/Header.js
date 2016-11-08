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
