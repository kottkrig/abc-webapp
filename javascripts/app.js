window.onload = init;

var context;
var bufferLoader;
var letters = ['a', 'b', 'c'];

function init() {

  var $doc = $(document),
      Modernizr = window.Modernizr;

  initAudioContext();

  loadSounds();

  // Hide address bar on mobile devices
  if (Modernizr.touch) {
    $(window).load(function () {
      setTimeout(function () {
        window.scrollTo(0, 1);
      }, 0);
    });
  }
}

function initAudioContext() {
  if (typeof AudioContext == "function") {
    context = new AudioContext();
  } else if (typeof webkitAudioContext == "function") {
    context = new webkitAudioContext();
  } else if (typeof mozAudioContext == "function") {
    context = new mozAudioContext();
  } else {
    throw new Error('AudioContext not supported. :(');
  }
}

function loadSounds() {
  var urls = new Array(letters.length);
  var bufferLoader;

  for (var i = 0; i < letters.length; i++) {
    var url = Modernizr.audio.ogg ? 'audio/ogg/'+letters[i]+'.ogg' :
                'audio/m4a/'+letters[i]+'.m4a';
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
    
  });
}

function playSound(buffer) {
  var source = context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                    // tell the source which sound to play
  source.connect(context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);    
}