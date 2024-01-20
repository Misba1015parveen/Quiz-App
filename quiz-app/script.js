const questions =[
    {
        question: "Which is the largest animal in the world?",
        answers:[
            { text:"Shark", correct: false},
            { text:"Whale", correct: true},
            { text:"Elephant", correct: false},
            { text:"Fish", correct: false},
        ]
    },
    
    
    {
        question: "Which is the smallest city in the world?",
        answers:[
            { text:"Vatican City", correct: true},
            { text:"Bhutan", correct: false},
            { text:"Nepal", correct: false},
            { text:"Sri Lanka", correct: false},
        ]
    },

    {
        question: "Which is the largest desert in the world?",
        answers:[
            { text:"Kalahari", correct: false},
            { text:"Gobi", correct: false},
            { text:"Sahara", correct: false},
            { text:"Antartica", correct: true},
        ]
    },

    {
        question: "Which is the smallest continent in the world?",
        answers:[
            { text:"Asia", correct: false},
            { text:"Australia", correct: true},
            { text:"Arctic", correct: false},
            { text:"Africa", correct: false},
        ]
    },

    {
        question: "Which is the biggest continent in the world?",
        answers:[
            { text:"Asia", correct: true},
            { text:"Australia", correct: false},
            { text:"Arctic", correct: false},
            { text:"Africa", correct: false},
        ]
    }

];

const quiz2Questions = [
    {
        question: "Who is the Father of the Computer?",
        answers: [
            { text: "Thomas Edison", correct: false },
            { text: "Albert Einstein", correct: false },
            { text: "Charles Babbage", correct: true },
            { text: "Isaac Newton", correct: false },
        ]
    },

    {
        question: "What do you need to use to connect to the internet?",
        answers: [
            { text: "Mouse", correct: false },
            { text: "Modem", correct: true },
            { text: "CPU", correct: false },
            { text: "Keyboard", correct: false },
        ]
    },

    {
        question: "Who invented Compact Disc?",
        answers: [
            { text: "James T. Russell", correct: true },
            { text: "Fujio Masuoka", correct: false },
            { text: "Thomas Edison", correct: false },
            { text: "Martin Cooper", correct: false },
        ]
    },

    {
        question: "Which one of the following is not an Operating System (OS)?",
        answers: [
            { text: "Windows 10", correct: false },
            { text: "DOS", correct: false },
            { text: "MS Excel", correct: true },
            { text: "Linux", correct: false },
        ]
    },

    {
        question: "What is the full form of E-Mail?",
        answers: [
            { text: "Electric Mail", correct: false },
            { text: "Exchange Mail", correct: false },
            { text: "Electronic Mail", correct: true },
            { text: "Engagement Mail", correct: false },
        ]
    }
    
];

const quiz3Questions = [
    {
        question: "What is also known as a portable computer?",
        answers: [
            { text: "Laptop", correct: true },
            { text: "CPU", correct: false },
            { text: "Monitor", correct: false },
            { text: "Desktop", correct: false },
        ]
    },

    {
        question: "How much is a byte equal to?",
        answers: [
            { text: "8 bits", correct: true },
            { text: "16 bits", correct: false },
            { text: "32 bits", correct: false },
            { text: "64 bits", correct: false },
        ]
    },

    {
        question: "What is the speed of the computer measured it?",
        answers: [
            { text: "Nanoseconds", correct: false },
            { text: "Kilo seconds", correct: false },
            { text: "Gigahertz", correct: true },
            { text: "Megabytes", correct: false },
        ]
    },


    {
        question: "Which of the following is not an example of a Virtual Assistant?",
        answers: [
            { text: "Alexa", correct: false },
            { text: "Cortana", correct: false },
            { text: "Siri", correct: false },
            { text: "Cortesa", correct: true },
        ]
    },

    {
        question: "Which of the following is not a browser?",
        answers: [
            { text: "Android", correct: true },
            { text: "Chrome", correct: false },
            { text: "Safari", correct: false },
            { text: "FireFox", correct: false },
        ]
    }

    
   
];

const quizzes = [questions, quiz2Questions, quiz3Questions];

const questionElement =document.getElementById("question");
const answerButtons =document.getElementById("answer-buttons");
const nextButton =document.getElementById("next-btn");

let CurrentQuestionIndex =0;
let score=0;

let selectedQuestions = [];

const students = {
    'Student A': 0,
    'Student B': 1,
    'Student C': 2,
};

let studentName = prompt("Enter your name (Student A, Student B, or Student C):");
let quizSelection;


if (students.hasOwnProperty(studentName)) {
    quizSelection = students[studentName] + 1;
    startQuiz();
} else {
    alert("Invalid student name. Please enter Student A, Student B, or Student C.");
}


function startQuiz() {
    if (quizSelection >= 1 && quizSelection <= quizzes.length) {
        CurrentQuestionIndex = 0;
        score = 0;
        nextButton.innerHTML = "Next";
        
        selectedQuestions = quizzes[quizSelection - 1];
        showQuestion(selectedQuestions);
    } else {
        alert("Invalid quiz selection. Please choose 1, 2, or 3.");
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = selectedQuestions[CurrentQuestionIndex];
    let questionNo = CurrentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }

}

function selectAnswer(e){
    const selectedBtn =e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled =true;
    });
    nextButton.style.display ="block";
    
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    const playerName = prompt("Enter your name:"); 
    saveScore(playerName, score); 

    updateLeaderboard(); 
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


// Function to handleNextButton 

function handleNextButton() {
    CurrentQuestionIndex++;
    
    if (CurrentQuestionIndex < selectedQuestions.length) {
        showQuestion(selectedQuestions);
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(CurrentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

const leaderboardList = document.getElementById("leaderboard-list");

// Function to update the leaderboard
function updateLeaderboard() {
   
    leaderboardList.innerHTML = "";

   
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];

    scores.sort((a, b) => b.score - a.score);

    const leaderboardTable = document.createElement("table");
    leaderboardTable.classList.add("leaderboard-table");

    
    const headerRow = document.createElement("tr");
    const headerNameCell = document.createElement("th");
    headerNameCell.textContent = "Name";
    const headerScoreCell = document.createElement("th");
    headerScoreCell.textContent = "Score";
    headerRow.appendChild(headerNameCell);
    headerRow.appendChild(headerScoreCell);
    leaderboardTable.appendChild(headerRow);

   
    scores.forEach((entry, index) => {
        const row = document.createElement("tr");
        const nameCell = document.createElement("td");
        nameCell.textContent = entry.name;
        const scoreCell = document.createElement("td");
        scoreCell.textContent = `${entry.score} out of ${questions.length}`;
        row.appendChild(nameCell);
        row.appendChild(scoreCell);
        leaderboardTable.appendChild(row);
    });

    
    leaderboardList.appendChild(leaderboardTable);
}


function saveScore(name, score) {
    const scores = JSON.parse(localStorage.getItem("quizScores")) || [];
    scores.push({ name, score });
    localStorage.setItem("quizScores", JSON.stringify(scores));
}


updateLeaderboard();

startQuiz();