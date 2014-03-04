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
    if (!scaleX) paddingUpscaleXDown = 1;
    if (!scaleY) scaleY = 1;
    
    return this.each(function(i, t){
        var resizer = function(){
          t = $(t);
          var w = t.width();
          var pw = t.parent().width() * scaleX; 
          var h = t.height();
          var ph = t.parent().height() * scaleY;
          while(w > pw || h > ph){
              var fontSize = parseInt(t.css("font-size"));
              fontSize = fontSize - 1 + "px";
              t.css({'font-size':fontSize});
              w = t.width();
              h = t.height();
          }
          while(w < pw && h < ph){
              var fontSize = parseInt(t.css("font-size"));
              fontSize = fontSize + 1 + "px";
              t.css({'font-size':fontSize});
              w = t.width();
              h = t.height();
          }
          // fix padding
          var padding = (ph-h)/2;
          t.css({'margin-top':padding});
        }
        
        // Call once to set.
        resizer();

        // Call on resize. Opera debounces their resize by default.
        $(window).on('resize.cramtext orientationchange.cramtext', resizer);
    });
  };

})( jQuery );
