/*global jQuery */
/*!
* Cramtext ver 1.0
*
* Copyright 2014, Magnus Lind https://github.com/fanks
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*/

(function( $ ){

  $.fn.cramText = function( scaleX, scaleY ) {
    if (!scaleX) scaleX = 1;
    if (!scaleY) scaleY = 1;
    
    return this.each(function(i, t){
        var delay = (function(){
          var timer = 0;
          return function(callback, ms){
            clearTimeout (timer);
            timer = setTimeout(callback, ms);
          };
        })();

        var attemptResize = function(){
           delay(function(){
              console.log("resize");
              resizer();
            }, 250);
        }

        var resizer = function(){
          t = $(t);
          var w = t.width();
          var pw = t.parent().width() * scaleX; 
          var h = t.height();
          var originalHeight = t.parent().height();
          var ph = originalHeight * scaleY;

          if(w == 0 || h == 0) return;
 
          var fontSize = 1;
          // Adjust up
          while(w < pw && h < ph){
              fontSize = parseInt(t.css("font-size"));
              var fs = fontSize + 1 + "px";
              t.css({'font-size':fs});
              w = t.width();
              h = t.height();
          }

          // Adjust down
          while((w > pw || h > ph) && fontSize > 0){

              fontSize = parseInt(t.css("font-size"));
              var fs = fontSize - 1 + "px";
              t.css({'font-size':fs});
              w = t.width();
              h = t.height();
          }

          // fix padding
          var padding = (originalHeight-h)/2;
          t.css({'margin-top':padding});
        }
        
        // Call once to set.
        resizer();

        // Call on resize. Opera debounces their resize by default.
        $(window).on('resize.cramtext orientationchange.cramtext', attemptResize);
    });
  };

})( jQuery );
