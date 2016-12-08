var cookies = document.cookie.split(';');
var $cookieName = "_ga";
var cookieSet = false;
/////////////////////////////////////////////
// Check if GA Cookie is set
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
// Approve and hide message
/////////////////////////////////////////////
$(".js-Cookies-approve-btn").click(function() {
   //var d = new Date();
   //d.setTime(d.getTime() + (365*24*60*60*1000)); // Valid for a year
   //var expires = "expires="+ d.toUTCString();
   //document.cookie =$cookieName+"=true;"+expires;
   $(".Cookie-container").fadeOut("fast");
})
