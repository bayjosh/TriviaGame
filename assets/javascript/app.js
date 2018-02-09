// Define global variables

var timer;
var t = 31;
var crct = 0;
var incrct = 0;
var number = t;
var questionCount = 0;
var startPage;

var wrongAns = ['Not quite!','Nope!','Wrong!','Sorry!'];

var rightAns = ["You got it!", "Correct!", "Way to go!", "Way to go!", "That's it!"];

var questions = ["What is Frasier's brother's name?", 'What city does Frasier take place in?',"Where is Daphne from", "What radio station does Frasier work for?", "What is Martin's former profession?"];

var answers = [['Niles', 'Miles', 'Martin', 'Eddy'], ['Chicago', 'Boston', 'New York', 'Seattle'], ['London', 'Dublin', 'Manchester', 'Sydney'],['KBDL', 'KACL', 'KASB', 'KLCA'], ["Firefighter", "Doctor", "Cop", "Pilot"]]; 

var crctAnswers = ['Niles','Seattle','Manchester','KACL', "Cop"]

var imageArr = ["<img class='center-block img-right' src='niles.gif'>","<img class='center-block img-right' src='seattle.gif'>", "<img class='center-block img-right' src='daphne.gif'>", "<img class='center-block img-right' src='kacl.gif'>", "<img class='center-block img-right' src='martin.gif'>"]

function rdm(arr) {
    var num = Math.floor(Math.random()*arr.length);
    return num;
}; 


//Set up document ready

$(document).ready(function(){


//startGame function adds start button, starts audio

function startGame(){
    startPage = '<button class="btn startBtn btn-primary btn-lg"id="start">START</button>';
    $('.startDiv').html(startPage);
    $('.questionDiv').empty();
    var audio = new Audio('test.mp3');
    audio.play();
    

};

//run startGame function

    startGame();


//nextPage function creates format for next question or final screen after 5sec timeout
    
function nextPage() {
    setTimeout(function(){
        if (questionCount < (questions.length-1)) {
            number = t;
            questionCount++;
            createQuestionArea();
            createAnswerArea();
            startTimer();
            $('#timer').show(); 
        } else {
            createFinalScreen();
        }
    },1000*5);
}



//createQuestionArea creates html for question section

function createQuestionArea(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">' + questions[questionCount] + '</h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text('Question ' + (questionCount+1) +':');
};

//createAnswerArea creates html for answer section

function createAnswerArea(){
    answerArea = '<div class="panel-default text-center" id="answerArea"> <div class="row text-center"><div class="col-xs-offset-4 col-xs-4"><button class="btn btn-primary ans btn-lg" id="ans1">' + answers[questionCount][0] + '</button><button class="btn btn-primary ans btn-lg" id="ans2">' + answers[questionCount][1] + '</button><button class="btn btn-primary ans btn-lg" id="ans3">' + answers[questionCount][2] + '</button><button class="btn btn-primary ans btn-lg" id="ans4">' + answers[questionCount][3] + '</button></div></div></div>';
    $('.answerDiv').html(answerArea);
}  ;  


//On.click event for start button starts the timer and creates html sections
   
 $('body').on('click', '.startBtn', function() {
    $('.startBtn').remove();
    startTimer();
    createQuestionArea();
    createAnswerArea();
    $("#timer").show();
    
 });


//Create correct answer page

 function createRightPick() {
    crct++;
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">The correct answer is: ' + crctAnswers[questionCount] + '!</h3>' + imageArr[questionCount] + '</div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text(rightAns[rdm(rightAns)]);
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
 };


//Create incorrect answer page

 function createWrongPick(){
    incrct++;
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">The correct answer is: ' + crctAnswers[questionCount] + '!</h3>' + imageArr[questionCount] + '</div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text(wrongAns[rdm(wrongAns)]);
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
    
 };

//Create page for running out of time

 function createTimeUp(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">The correct answer is: ' + crctAnswers[questionCount] + '!</h3>' + imageArr[questionCount] + '</div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text("Time's Up!");
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
  
 };

 //On.click event for answer buttons

 $('body').on('click', '.ans', function() {
    answerPicked = $(this).text();
    if (answerPicked === crctAnswers[questionCount]){
        createRightPick();
        clearInterval(timer);
    } else {
        createWrongPick();
        clearInterval(timer);

    }
 });


//Create final screen
 
function createFinalScreen(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title">Here is your score:</h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext"><p id="crctTotal">Correct Answers: ' + crct + '</p><p id="incrctTotal">Incorrect Answers: ' + incrct + '</p><p id="unansTotal">Unanswered: ' + (questions.length - incrct - crct) + '</p></h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    resetBtn = '<button class="btn resetBtn btn-primary btn-lg"id="reset">RESET GAME</button>';
    $('.startDiv').html(resetBtn);
}


//On.click event for reset button

$('body').on('click','.resetBtn',function(){
    questionCount = 0;
    crct = 0;
    incrct = 0;
    number = t;
    startGame();

})


//Timer function

function startTimer() {
    timer = setInterval(countdown, 1000);
}; 


//Countdown function

function countdown() {
    number -=1;
    $('#timer').text('Time Left: ' + number);
    if (number === 0) {
        clearInterval(timer);
        createTimeUp();
    }
}

});