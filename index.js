// Identify HTML elements from index.html
const greeter = document.getElementById('greeter');
const userInput = document.querySelector('.input-group');
const addNote = document.querySelector('.veri-note');
const playBtn = document.getElementById('play');
const bodyContainer = document.querySelector('.container');

// If the User press Play button
playBtn.addEventListener('click', (event) => {
    startGame();
})

// Variable Declarations
let currentQues = {};
let acceptAnswer = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

// Hard-Coded Questions for DOM Manipulation Pratice
let questions = [
    {
        question: 'Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?',
        choice1: 'Apple',
        choice2: 'Microsoft',
        choice3: 'Atari',
        choice4: 'Commodore',
        answer: 'Apple',
    },
    {
        question: 'According to the International System of Units, how many bytes are in a kilobyte of RAM?',
        choice1: '512',
        choice2: '1024',
        choice3: '500',
        choice4: '1000',
        answer: '1000',
    },
    {
        question: 'Which computer language would you associate Django framework with?',
        choice1: 'C#',
        choice2: 'Java',
        choice3: 'Phyton',
        choice4: 'C++',
        answer: 'Phyton',
    },
];

// Create a New Set of Trivia Questions
startGame = () => {
    // Delete HTML Welcome Page Attributes
    greeter.remove();
    userInput.remove();
    addNote.remove();
    playBtn.remove();

    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    newQuestion();
}

// Update Trivia Cards
newQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= 3) {
        return endGame();
    }

    questionCount++;

    // Create and Update Score Tracker
    const scoreCount = document.createElement('h1');
    scoreCount.className = 'score-tracker';
    scoreCount.innerText = score;
    
    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'tracker';
    scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`;
    scoreDiv.appendChild(scoreCount);

    // Initialize random question selections
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQues = availableQuestions[randomIndex];
    
    // Create <div class="container">
    let divContainer = document.createElement('div');
    divContainer.className = 'card border-success mb-3';
    divContainer.style.width = '25rem';
    divContainer.innerHTML = `
        <div class='card-header'>
            ${currentQues.question}
        </div>
        <ul class='list-group list-group-flush'>           
            <li class='list-group-item'> &nbsp; ${currentQues.choice1}</li>
            <li class='list-group-item'> &nbsp; ${currentQues.choice2}</li>      
            <li class='list-group-item'> &nbsp; ${currentQues.choice3}</li>      
            <li class='list-group-item'> &nbsp; ${currentQues.choice4}</li>
        </ul>
    `;

    // Update Question Count 
    const questionTracker = document.createElement('p');
    questionTracker.className = 'question-tracker text-muted';
    questionTracker.innerHTML = `${questionCount} / 3`;

    // Update Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'progress';
    progressBar.innerHTML = `
        <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${questionCount/3 * 100}" aria-valuemin="0" aria-valuemax="100" style="width: ${questionCount/3 * 100}%"></div>
    `;

    bodyContainer.append(scoreDiv, divContainer, questionTracker, progressBar);
    
    // Delete previous question from the availableQuestions Array
    availableQuestions.splice(randomIndex, 1);

    // Allow the user to accept an answer
    acceptAnswer = true;
    checkAnswer();
}

// Accept User Selection and Check Answer Validity
checkAnswer = () => {
    const selections = Array.from(document.getElementsByClassName('list-group-item'));
    
    selections.forEach((selection) => {
        selection.addEventListener('click', (event) => {
            // If we are not ready accepting answer
            if (!acceptAnswer) return;

            // The user can only click/answer once
            acceptAnswer = false;

            const userAnswer = event.target;
            
            // Conditionals to check the userAnswer Validity
            const addClass = (userAnswer.innerText.trim() === currentQues.answer) ? "correct" : "incorrect";

            // Update Score Count
            if (addClass === "correct") score += 1;

            userAnswer.classList.add(addClass);

            // Allow 1 second for UI exposure
            setTimeout( () => {
                // Delete previous Card         
                const oldDiv = document.querySelector('.card.border-success.mb-3');
                oldDiv.remove();

                // Delete previous Count
                const oldScore = document.querySelector('#tracker');
                oldScore.remove();

                // Delete previous Question Count Tracker 
                const oldQuestionTracker = document.querySelector('.question-tracker');
                oldQuestionTracker.remove();

                // Delete previous Progress Bar
                const oldProgressBar = document.querySelector('.progress');
                oldProgressBar.remove();

                // Update Trivia Cards
                newQuestion();
            }, 1000)
            
        })
    })
}

// Create a Summary Page
endGame = () => {
    // Read Final Score
    const endGameSummary = document.createElement('h1');
    endGameSummary.className = 'score-tracker';
    endGameSummary.innerText = score;

    const scoreDiv = document.createElement('div');
    scoreDiv.id = 'tracker';
    scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`;
    scoreDiv.appendChild(endGameSummary);

    // Set Up Conditionals for Higher Score 


    // Create Play Back and Home buttons
    const endGameBtns = document.createElement('div');
    endGameBtns.className = 'd-grid gap-2';
    endGameBtns.style.width = '25rem';
    endGameBtns.innerHTML = `
        <button type="button" class="btn btn-outline-success" id="replay">Play Back</button>
        <button type="button" class="btn btn-outline-secondary id="home">Home</button>
    `;
    
    bodyContainer.append(scoreDiv, endGameBtns);
    
    endGameBtns.addEventListener('click', (event) => {
        if (event.target.innerText === "Play Back") {
            // Delete previous buttons
            scoreDiv.remove();
            endGameBtns.remove();

            // Create a New Set of Trivia Questions
            startGame();
        } else {
            window.history.go();
        }
    }) 
}