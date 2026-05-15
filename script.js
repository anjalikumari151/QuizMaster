/* START QUIZ */

const startQuiz =
document.getElementById("startQuiz");

const quizSection =
document.getElementById("quiz");

startQuiz.addEventListener("click",()=>{

    quizSection.classList.remove("hidden");

    quizSection.scrollIntoView({
        behavior:"smooth"
    });

});


/* QUIZ DATA */

const quizData = [

{
    question:"What does HTML stand for?",

    answers:[
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Language",
        "Hyper Transfer Markup Language"
    ],

    correct:0
},

{
    question:"Which language is used for styling web pages?",

    answers:[
        "HTML",
        "Python",
        "CSS",
        "C++"
    ],

    correct:2
},

{
    question:"Which language is used for website interactivity?",

    answers:[
        "JavaScript",
        "Java",
        "SQL",
        "C++"
    ],

    correct:0
},

{
    question:"Which tag is used for image in HTML?",

    answers:[
        "<image>",
        "<img>",
        "<src>",
        "<picture>"
    ],

    correct:1
},

{
    question:"Which company developed JavaScript?",

    answers:[
        "Google",
        "Microsoft",
        "Netscape",
        "Apple"
    ],

    correct:2
}

];


/* ELEMENTS */

const question =
document.getElementById("question");

const answerButtons =
document.querySelectorAll(".answer-btn");

const nextQuestion =
document.getElementById("nextQuestion");

const scoreText =
document.getElementById("score");

const timerText =
document.getElementById("timer");

const progressText =
document.getElementById("progress");

const attemptedText =
document.getElementById("attempted");

const remainText =
document.getElementById("remain");


/* VARIABLES */

let currentQuiz = 0;

let score = 0;

let attempted = 0;

let timeLeft = 15;

let timer;


/* LOAD QUIZ */

function loadQuiz(){

    resetState();

    const currentData =
    quizData[currentQuiz];

    question.innerText =
    currentData.question;

    answerButtons.forEach((btn,index)=>{

        btn.innerText =
        currentData.answers[index];

    });

    progressText.innerText =
    `Question ${currentQuiz + 1} / ${quizData.length}`;

    attemptedText.innerText =
    `Attempted : ${attempted}`;

    remainText.innerText =
    `Remaining : ${quizData.length - attempted}`;

    startTimer();

}


/* TIMER */

function startTimer(){

    clearInterval(timer);

    timeLeft = 15;

    timerText.innerText =
    `Time Left : ${timeLeft}s`;

    timer = setInterval(()=>{

        timeLeft--;

        timerText.innerText =
        `Time Left : ${timeLeft}s`;

        if(timeLeft <= 0){

            clearInterval(timer);

            nextQuiz();

        }

    },1000);

}


/* RESET */

function resetState(){

    answerButtons.forEach(btn=>{

        btn.disabled = false;

        btn.classList.remove(
            "correct",
            "wrong"
        );

    });

}


/* ANSWER CLICK */

answerButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        clearInterval(timer);

        const correctAnswer =
        quizData[currentQuiz].correct;

        attempted++;

        if(index === correctAnswer){

            button.classList.add("correct");

            score++;

        }else{

            button.classList.add("wrong");

            answerButtons[correctAnswer]
            .classList.add("correct");

        }

        answerButtons.forEach(btn=>{
            btn.disabled = true;
        });

        scoreText.innerText =
        `Score : ${score}`;

        attemptedText.innerText =
        `Attempted : ${attempted}`;

        remainText.innerText =
        `Remaining : ${quizData.length - attempted}`;

    });

});


/* NEXT QUIZ */

function nextQuiz(){

    currentQuiz++;

    if(currentQuiz >= quizData.length){

        alert(
        `Quiz Finished!\n\nYour Score : ${score}/${quizData.length}`
        );

        currentQuiz = 0;

        score = 0;

        attempted = 0;

    }

    loadQuiz();

}


/* NEXT BUTTON */

nextQuestion.addEventListener("click",()=>{

    clearInterval(timer);

    nextQuiz();

});


/* INITIAL LOAD */

loadQuiz();