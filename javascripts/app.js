window.onload = init;

var context;
var bufferLoader;
var letters = ['a', 'b', 'c'];

function init() {

  var $doc = $(document),
      Modernizr = window.Modernizr;

  initAudioContext();

  if (context) {
    loadSounds();
  }
  

  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);

    });
    showKeyboardButton();
  }

  $("body").click(function() {
    console.log("document.body clicked!");
    $("#textInputArea").focus();
  });
}

function showKeyboardButton() {

  var $keyboardButton = $("<button id='showKeyboardButton' class='large button'>Visa tangentbord</button>");
  $('.row').append($keyboardButton);

  $keyboardButton.click(function() {
    console.log("showKeyboardButton clicked!");
    $("#textInputArea").focus();
    $keyboardButton.remove();
  });
}

function initAudioContext() {
  context = new webkitAudioContext();
  if (!context) {
    console.log('AudioContext not supported. :(');
  }
}

function loadSounds() {
  var urls = new Array(letters.length);
  var bufferLoader;

  for (var i = 0; i < letters.length; i++) {
    var url = 'audio/m4a/'+letters[i]+'.m4a';
    urls[i] = url;
  };

  bufferLoader = new BufferLoader(context, urls, finishedLoading);
  bufferLoader.load();
}

function finishedLoading(bufferList) {
  var buffers = {};
  for (var i = 0; i < letters.length; i++) {
    buffers[letters[i]] = bufferList[i];
  };

  $("#textInputArea").keypress(function(event) {

    var letter = String.fromCharCode(event.charCode).toLowerCase();
    if (buffers[letter]) {
      playSound(buffers[letter]);
    }

    $(this).val("");
    showLetter(letter);
  });
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);    
}

function showLetter(letter) {

  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  var randomColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  var textShadow = "0 3px 0 rgb("+(r-20)+","+(g-20)+","+(b-20)+"), 2px 4px 1px rgba(0,0,0,0.2)"
  var randomRotation = "rotate("+(Math.floor(Math.random() * 12 - 6))+"deg)";
  
  $currentLetter = $("#currentLetter");
  $currentLetter.text(letter.toUpperCase());
  $currentLetter.css({"color": randomColor,
                      "text-shadow": textShadow,
                      "transform": randomRotation});
}