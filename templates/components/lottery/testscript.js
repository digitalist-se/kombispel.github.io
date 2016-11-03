(function() {
 "use strict";

 var count = document.getElementsByClassName('count');
   var numbers = [21,48,9,32,23,241,49];
   var timeToTarget = 500;
   /* Det ska ta timeToTarget millisekunder att nå målet i varje iteration
     med reservation för DOMets samt Javascript kapacitet att iterera.
   */
   var iterate = 30;
   // Om inget är sagt sker varje iteration var standardIterate millisekund

   var customIterate = true;
   // Sätt till false om iteration ska ske var standardIterate millisekund istället

     var an = 0,
     number = 0;
     function countUp() {

       if(number<numbers[an])
         {
           setTimeout(function()
           {
             countUp()
           }, iterate
         );
            number++;
         }
         else if(number == numbers[an])
         {
           an++;
           number = 0;
           if(an<numbers.length)
           {
             doNext();
           }
         }
         if(an<numbers.length) // Så att vi inte får error i loggen på sista iteration
         {
           count[an].innerHTML = number;
         }
     }




     function doNext() {
       countUp();
     }

     setTimeout(function(){ doNext(); }, 1000);




 })();
