function SoundManager(callback) {
  this.context;
  this.letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  this.buffers = {};
  this.callback = callback;



  if ('AudioContext' in window) {
      this.context = new AudioContext();
  } else if ('webkitAudioContext' in window) {
      this.context = new webkitAudioContext();
  } else {
      console.log('AudioContext not supported. :(');
  }

  if (this.context) {
    this.loadSounds();
  } else {
    this.callback();
  }
}

SoundManager.prototype.loadSounds = function() {
  var urls = new Array(this.letters.length);
  var bufferLoader;

  for (var i = 0; i < this.letters.length; i++) {
    var url = 'audio/m4a/'+this.letters[i]+'.m4a';
    urls[i] = url;
  };

  var soundManager = this;

  bufferLoader = new BufferLoader(this.context, urls, function finishedLoading(bufferList) {
    for (var i = 0; i < soundManager.letters.length; i++) {
      soundManager.buffers[soundManager.letters[i]] = bufferList[i];
    };

    soundManager.callback();
  });

  bufferLoader.load();
}

SoundManager.prototype.playLetter = function(letter) {
  if (this.buffers[letter]) {
    this.playSound(this.buffers[letter]);
  }
}

SoundManager.prototype.playSound = function(buffer) {
  var source = this.context.createBufferSource(); // creates a sound source
  source.buffer = buffer;                         // tell the source which sound to play
  source.connect(this.context.destination);       // connect the source to the context's destination (the speakers)
  source.noteOn(0);    
}