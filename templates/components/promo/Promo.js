var $loginCookie = "Tjena tjabba!"; // Ersätt med vad inloggningskakan nu heter
$(".js-Promo-correct-ticket-btn").click(function(e) {
  if (document.cookie.indexOf($loginCookie) == -1) {
    e.preventDefault();
    $(".js-Login-header").html("Logga in för att rätta din lott")
    $(".js-Site-container").toggleClass("locked");
    $(".js-Login-overlay-container").fadeIn("fast");
  }
})
