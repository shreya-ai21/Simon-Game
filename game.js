var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var click=0;

$(document).keypress(nextSequence);

$(".btn").click(function(){
    var userChosenColor=$(this).attr("id");
    makeSound(userChosenColor);
    $("."+userChosenColor).fadeOut(100).fadeIn(100);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern);
    // setTimeout(nextSequence,2000);
});

function nextSequence(){
    click=0;
    level++;
    $("h1").text("Level "+level);
    $("h5").text("");
    var randomNumber=Math.floor(4*Math.random());
    var step=buttonColors[randomNumber]
    gamePattern.push(step);
    $("."+step).fadeOut(100).fadeIn(100);
    makeSound(step);
}

function makeSound(color){
    var music= new Audio('./sounds/'+color+'.mp3');
    music.play();
}

function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function (){
        $("#"+color).removeClass("pressed")},100);
}

function checkAnswer(array){
    if(array[0]==gamePattern[click]){
        userClickedPattern.shift();
        click++;
        if(click===gamePattern.length && userClickedPattern.length === 0){
            setTimeout(nextSequence,2000);
        }
    }
    else{
        makeSound('wrong');
        $("body").addClass("flash");
        setTimeout(function() {
            $("body").removeClass("flash");
        },100);
        $("h1").html("Game Over.<br><br>Score:"+level);
        $("h1").after("<h5>Press spacebar to start again</h5>")
        level=0;
        gamePattern=[];
        userClickedPattern=[];
    }
}
