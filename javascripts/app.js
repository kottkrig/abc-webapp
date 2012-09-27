;(function ($, window, undefined) {
  'use strict';

  var $doc = $(document),
      Modernizr = window.Modernizr;

  var letters = ['a', 'b', 'c'];
  var audioElements = {};

  $.each(letters, function() {
    var audio = new Audio();
    audio.src = Modernizr.audio.ogg ? 'audio/ogg/'+this+'.ogg' :
                'audio/m4a/'+this+'.m4a';
    audio.load();
    audioElements[this] = audio;
  });

  $("#textInputArea").keypress(function(event) {
    var letter = String.fromCharCode(event.charCode);
    console.log(letter+" pressed!");
    audioElements[letter].play();
  });

  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }

})(jQuery, this);
