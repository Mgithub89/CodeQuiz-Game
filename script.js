
//Questions Array (6 questions)
var myQuestions = [
    {
        question: "To make your website mobile friendly, you can make your website",
        choices: ["Reactive", "Responsive", "Small", "Light"],
        answer: 1
    },
    {
        question: "What DOES JS stand for??",
        choices: ["JamSpace", "JustScraps", "JavaScript", "JazzSinger"],
        answer: 2
    },
    {
        question: "yes or no variables are called?",
        choices: ["string", "booleans", "integer", "array"],
        answer: 1
    },
    {
        question: "_______ is the process of finding errors and fixing them within a program",
        choices: ["Compiling", "Executing", "Debugging", "Scanning"],
        answer: 2
    },
    {
        question: "Which set of characters create an array?",
        choices: ["[ ]", "{ }", "< >", "( )"],
        answer: 0
    },
    {
        question: "To create a link to an anchor, you use the______property in A tag.",
        choices: ["Name", "Tag", "Link", "Href"],
        answer: 3
    }
]

//refering all the element nedded
const timeEl = document.querySelector('#timeleft');
const startBtn = document.querySelector('#startBtn');
const questionEl = document.querySelector("#question");
const choice1 = document.querySelector("#choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.querySelector("#choice3");
const choice4 = document.getElementById("choice4");
const correctEL = document.querySelector("#correct");
const homeEl = document.querySelector("#home");
const mainEl = document.getElementById("main");
const timerEl = document.querySelector("#timer");
const evalEl = document.querySelector("#evaluation");
const playagainEl = document.querySelector("#playagain");

const initialsInput = document.querySelector("#initials");
const savescoreBtn = document.querySelector("#saveScoreBtn");
const scorepageEl = document.querySelector("#scorepage");
const finalScoreEL = document.querySelector("#finalScore");
const highScoresDiv = document.querySelector("#highScores");
const showscoresEL = document.querySelector("#showscores");

//declering some initial variables
let currentQuestion = 0;
let score = 0;
let availableQuestions = [];
let timeLeft = 60;


//function to start the game 
function startQuiz() {
    homeEl.classList.add("d-none");
    timerEl.classList.remove("d-none");
    evalEl.classList.remove("d-none");
    mainEl.classList.remove("d-none");
    let timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        // changeing time left to red when 10 second left
        if (timeLeft <= 10) {
            timeEl.parentElement.style.color = "red";
        }
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    displayQuestion();
}
//click event listener to start the Quiz
startBtn.addEventListener("click", startQuiz);

// function to display the Questions
function displayQuestion() {
    if (currentQuestion < myQuestions.length) {
        questionEl.textContent = myQuestions[currentQuestion].question;
        choice1.textContent = myQuestions[currentQuestion].choices[0];
        choice2.textContent = myQuestions[currentQuestion].choices[1];
        choice3.textContent = myQuestions[currentQuestion].choices[2];
        choice4.textContent = myQuestions[currentQuestion].choices[3];
    } else {
        setTimeout(function () {
            endGame();
            return;
        }, 1000)
    }
}

// function to check answer and display next questions 
function checkAnswer(answer) {

    if (answer == myQuestions[currentQuestion].answer) {
        score += 10;
        correctEL.textContent = "correct";
        correctEL.style.color = "green";
        setTimeout(function () {
            correctEL.textContent = "";
        }, 2000)

    } else {
        timeLeft -= 10;
        correctEL.textContent = "incorrect";
        correctEL.style.color = "red";
        setTimeout(function () {
            correctEL.textContent = "";
        }, 2000)

    }

    currentQuestion++;
    displayQuestion();
}

// function to end the game when timeleft = 0
function endGame() {
    timeLeft = 0;
    finalScoreEL.textContent = score;
    timerEl.classList.add("d-none");
    evalEl.classList.add("d-none");
    mainEl.classList.add("d-none");
    scorepageEl.classList.remove("d-none");
}

// Event listener to save the score and initials in localStorage
savescoreBtn.addEventListener("click", function (event) {
    let scoresArr;
    event.preventDefault();
    highScoresDiv.classList.remove("d-none")
    scorepageEl.classList.add("d-none")
    let initials = initialsInput.value;

    scoresArr = JSON.parse(localStorage.getItem("scores"));
    if (!scoresArr) {
        scoresArr = [];
        scoresArr.push({ name: initials, yourScore: score });
        localStorage.setItem("scores", JSON.stringify(scoresArr));
    } else {
        scoresArr.push({ name: initials, yourScore: score });
        localStorage.setItem("scores", JSON.stringify(scoresArr));
    }
    getScores();
});

function getScores() {
    var scoresArr = JSON.parse(localStorage.getItem("scores")) || [];

    scoresArr.forEach(function (score) {

        let newScoreEl = document.createElement("p");
        newScoreEl.textContent = score.name + " - " + score.yourScore;

        showscoresEL.appendChild(newScoreEl);
    })
}

//listining click to play again button to retry the quiz
playagainEl.addEventListener("click", function () {
    return location.assign("index.html");
});

