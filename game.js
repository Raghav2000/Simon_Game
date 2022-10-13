
var buttonColours = ["red","blue","green","yellow"];
var gamePatterns = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer((userClickedPattern.length)-1);

});

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
});

function playSound(name){
  var audio = new Audio('sounds/'+name+'.mp3');
  audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed").dequeue().delay(100).queue(function () {
        $(this).removeClass("pressed");
    });;

}

function nextSequence(){

  level++;

  userClickedPattern = [];

  $("#level-title").text("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePatterns.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePatterns[currentLevel]){
      if(userClickedPattern.length===gamePatterns.length){
        console.log("success");
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    }else{
      var audio2 = new Audio('sounds/wrong.mp3');
      audio2.play();
      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
