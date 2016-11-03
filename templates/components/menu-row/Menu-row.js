
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
