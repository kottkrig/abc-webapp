window.onload = init;

var soundManager;

function init() {

  var $doc = $(document),
      Modernizr = window.Modernizr;

  soundManager = new SoundManager(soundManagerReady);

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

function soundManagerReady() {
  $("#textInputArea").keypress(function(event) {

    var letter = String.fromCharCode(event.charCode).toLowerCase();

    $(this).val("");
    showLetter(letter);
    soundManager.playLetter(letter);
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

function showLetter(letter) {

  var r = Math.floor((Math.random() * 256 + 255) / 2);
  var g = Math.floor((Math.random() * 256 + 255) / 2);
  var b = Math.floor((Math.random() * 256 + 255) / 2);

  var randomColor = 'rgb(' + r + ',' + g + ',' + b + ')';
  var textShadow = "0 4px 0 rgb("+(r-20)+","+(g-20)+","+(b-20)+"), 2px 4px 1px rgba(0,0,0,0.15)"
  var randomRotation = "rotate("+(Math.floor(Math.random() * 12 - 6))+"deg)";
  
  $currentLetter = $("#currentLetter");
  $currentLetter.text(letter.toUpperCase());
  $currentLetter.css({"color": randomColor,
                      "text-shadow": textShadow,
                      "transform": randomRotation});
}