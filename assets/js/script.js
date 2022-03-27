//Declare variables
var seeHighScores = document.getElementById("high-scores-link")
var gameClock = document.getElementById("timer");

var introCard = document.getElementById("intro-card");

var quizCard = document.getElementById("quiz-card");
var questionsEl = document.getElementById("questions");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var resultsEl = document.getElementById("choice-result");

var userScoreCard = document.getElementById("user-score-card");
var userScore = document.getElementById("user-score");
var userInitials = document.getElementById("initials");
var submitScore = document.getElementById("submit-initials");

var highScoresCard = document.getElementById("high-scores-card");
var pastScores = document.getElementById("past-scores");
var playerInitials = document.getElementById("player-initials");
var playerScores = document.getElementById("player-score");
var gameBtns = document.getElementById("game-btns");




// Set quiz questions
var quizQuestions = [{
    question: "Commonly used data types DO Not Include",
    choiceA: "strings",
    choiceB: "booleans",
    choiceC: "alerts",
    choiceD: "numbers",
    correctAnswer: "c"},
    {
    question: "Arrays in JavaScript can be used to store",
    choiceA: "numbers and strings",
    choiceB: "other arrays",
    choiceC: "booleans",
    choiceD: "all of the above",
    correctAnswer: "d"},
    {
    question: "How do you call a function named 'myFunction'",
    choiceA: "call function myFunction()",
    choiceB: "call myFunction()",
    choiceC: "myFunction()",
    choiceD: "On the phone.",
    correctAnswer: "c"},
    {
    question: "How do you write and IF statement in JavaScript?",
    choiceA: "if i == 5 then",
    choiceB: "if (i==5)",
    choiceC: "if i = 5",
    choiceD: "if i = 5 then",
    correctAnswer: "b"},
    {
    question: "Which of the following is the NOT operator?",
    choiceA: "=|=",
    choiceB: "||",
    choiceC: "!",
    choiceD: "&&",
    correctAnswer: "c"}];

// generate questions & answers
var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;


function generateQuiz() {
    userScoreCard.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question + "<p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}

// Set initial values for timer and score
var timeLeft = 75;
var timerInterval;
var score = 0;
var correct;

//Start the quiz and display first question
function startQuiz() {
    userScoreCard.style.display = "none";
    introCard.style.display = "none";
    highScoresCard.style.display = "none";
    seeHighScores.style.visibility = "hidden";
    generateQuiz();

    timerInterval = setInterval(function() {
        timeLeft--;
        gameClock.textContent = "Seconds left: " + timeLeft;
    
        if (timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quizCard.style.display = "block";
}

// Check if answer is correct
var rightAnswer = document.getElementById("right");
var wrongAnswer = document.getElementById("wrong");

function correctAnswer() {
    resultsEl.style.display = "block";
    rightAnswer.style.display = "block";
    wrongAnswer.style.display = "none";
}

function incorrectAnswer() {
    resultsEl.style.display = "block";
    rightAnswer.style.display = "none";
    wrongAnswer.style.display = "block";
}

function checkAnswer(answer) {
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex) {
        score++;
        correctAnswer();
        currentQuestionIndex++;
        generateQuiz();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex) {
        incorrectAnswer();
        timeLeft -= 10;
        currentQuestionIndex++;
        generateQuiz();
    } else {
        showScore();
    }
}

// Display the users score and request intitials
function showScore() {
    quizCard.style.display = "none";
    userScoreCard.style.display = "flex";
    clearInterval(timerInterval);
    userInitials.value = "";
    userScore.innerHTML = "All done!" + "<br></br>" + "Your final score is" + " " + timeLeft;
}


// Check if intitials were given and save score to localStorage
submitScore.addEventListener("click", function highscore() {
    if (userInitials.value === "") {
        alert("Please add your initials.");
        return false;
    } else {
        savedHighScores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentPlayer = userInitials.value.trim();
        var currentHighScore = {
            name: currentPlayer,
            score: timeLeft
        };

        userScoreCard.style.display = "none";
        highScoresCard.style.display = "flex";
        pastScores.style.display = "block";
        gameBtns.style.display = "flex";

        savedHighScores.push(currentHighScore);
        localStorage.setItem("savedHighScores", JSON.stringify(savedHighScores));
        generateHighScores();
    }

});

// Create high score list
function generateHighScores() {
    playerInitials.innerHTML = "";
    playerScores.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
    for (i = 0; i < highscores.length; i++) {
        var newName = document.createElement("li");
        var newScore = document.createElement("li");
        newName.textContent = highscores[i].name;
        newScore.textContent = highscores[i].score;
        playerInitials.appendChild(newName);
        playerScores.appendChild(newScore);
    }
}

//Display the saved high scores
function viewHighScores() {
    introCard.style.display = "none";
    userScoreCard.style.display = "none";
    quizCard.style.display = "none";
    highScoresCard.style.display = "flex";
    pastScores.style.display = "block";
    gameBtns.style.display = "flex";

    generateHighScores();
}

// Clear saved high scores
function clearScores() {
    window.localStorage.clear();
    playerInitials.textContent = "";
    playerScores.textContent = "";
}

// Reset the
function replayQuiz() {
    seeHighScores.style.visibility = "visible";
    userScoreCard.style.display = "none";
    introCard.style.display = "flex";
    highScoresCard.style.display = "none";
    quizCard.style.display = "none";
    resultsEl.style.display = "none";
    timeLeft = 75;
    score = 0;
    currentQuestionIndex = 0;
}