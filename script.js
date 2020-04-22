const questionArr = [
    {
        question: "Inside which HTML element do we put the JavaScript?:",
        answers: ["<js>", "<Script>", "<Scripting>", "none of these"],
        correctAnswer: 2,
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            "The <head> section",
            "The <body> section",
            "Both",
            "Neither",
        ],
        correctAnswer: 1,
    },
    {
        question: "How do you define a variable in ES6?",
        answers: ["var", "const and let", "variable=", "none of these"],
        correctAnswer: 2,
    },
    {
        question: "Choose the correct HTML element for the largest heading:?",
        answers: ["<h1>", "<h6>", "<heading>", "<head>"],
        correctAnswer: 1,
    },
];

let givenAnswers;

const startQuizDiv = document.querySelector("#startQuiz");
var startButton = document.querySelector("#startButton");

// Start Button onclick

startButton.addEventListener("click", function () {
    givenAnswers = [];
    resultDiv.innerHTML = "";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "flex";
    createQuestion(0);
});

//create Question Func
const quizDiv = document.querySelector("#quizDiv");
const answers = [];

function createQuestion(index) {
    let questionHTML = document.createElement("div");
    questionHTML.classList.add("card");
    questionHTML.classList.add("column");
    let box = document.createElement("div");
    box.classList.add("card-content");
    questionHTML.appendChild(box);
    let h2 = document.createElement("h2");
    h2.classList.add("subtitle");
    h2.innerText = questionArr[index].question;
    box.appendChild(h2);
    questionArr[index].answers.forEach((answer, i) => {
        answers[i] = document.createElement("button");
        answers[i].className = "button";
        answers[i].innerText = answer;
        answers[i].dataset.answer = i;
        answers[i].dataset.question = index;
        answers[i].addEventListener("click", evaluateAnswer);
        box.appendChild(answers[i]);
    });
    // remove old
    let old = document.querySelector(".card");
    if (old) {
        quizDiv.removeChild(old);
    }

    // attach new
    quizDiv.appendChild(questionHTML);
}

const resultDiv = document.querySelector("#results");
if (typeof localStorage.lastResults === "undefined") {
    localStorage.setItem("lastResults", "[]");
}
function displayResults() {
    resultDiv.innerHTML = '<div class="result-box"></div>';
    /*resultDiv.childNodes.forEach(child =>{
        resultDiv.removeChild(child);
    })*/

    let formerResultHeadline = document.createElement("h3");
    formerResultHeadline.classList.add("subtitle");
    formerResultHeadline.innerText = "Your previous results:";
    resultDiv.firstChild.appendChild(formerResultHeadline);
    let formerResults = JSON.parse(localStorage.lastResults);
    for (let i = formerResults.length - 1; i >= 0; i--) {
        let div = document.createElement("div");
        div.innerText = "Attempt " + (i + 1) + ": " + formerResults[i] + " %";
        resultDiv.firstChild.appendChild(div);
    }
}

function evaluateAnswer(ev) {
    // save to evaluation
    let correct =
        Number(questionArr[ev.target.dataset.question].correctAnswer) ===
        Number(ev.target.dataset.answer);
    givenAnswers.push(correct);
    // does next question exist?
    let nextIndex = Number(ev.target.dataset.question) + 1;
    if (typeof questionArr[nextIndex] !== "undefined") {
        createQuestion(nextIndex);
    } else {
        let percent =
            (givenAnswers.filter((val) => val).length / questionArr.length) *
            100;
        let formerResults = JSON.parse(localStorage.lastResults);
        formerResults.push(percent);
        localStorage.setItem("lastResults", JSON.stringify(formerResults));
        startQuizDiv.style.display = "flex";
        quizDiv.style.display = "none";
        displayResults();
    }
}
