const playBtn = document.getElementById('play');
const bodyContainer = document.querySelector('.container');

// Welcome user to press the Play Button
playBtn.addEventListener('click', (event) => {
    startGame();
})

let currentQues = {};
let acceptAnswer = false;
// let score = 0;
let questionCount = 0;
let availableQuestions = [];

// Hard-Coded Questions for now
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

// When the User ready to Play Trivia
startGame = () => {
    // console.log('In the Game')
    playBtn.remove();

    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    // console.log(availableQuestions);
    newQuestion();
}

// Display a New Question
newQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= 3) {
        return endGame();
    }

    questionCount++;

    // Initiate random question selections
    let randomIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQues = availableQuestions[randomIndex];
    
    // Create <div class="container">
    let divContainer = document.createElement('div');
    divContainer.className = 'card border-success mb-3';
    divContainer.style.width= '25rem';
    divContainer.innerHTML = `
        <div class='card-header'>
            ${currentQues.question}
        </div>
        <ul class='list-group list-group-flush'>           
            <li class='list-group-item'>A &nbsp;   ${currentQues.choice1}</li>
            <li class='list-group-item'>B &nbsp;   ${currentQues.choice2}</li>      
            <li class='list-group-item'>C &nbsp;   ${currentQues.choice3}</li>      
            <li class='list-group-item'>D &nbsp;   ${currentQues.choice4}</li>
        </ul>
    `;

    bodyContainer.append(divContainer);
    
    // Remove the question that is currently shown from the Questions Array
    availableQuestions.splice(randomIndex, 1);

    // Allow the user to accept an answer
    acceptAnswer = true;
    checkAnswer();
}

// Accept User Selection and Check Answer
checkAnswer = () => {
    const selections = Array.from(document.getElementsByClassName('choice-text'));
    
    selections.forEach((selection) => {
        selection.addEventListener('click', (event) => {
            // If we are not ready accepting answer
            if (!acceptAnswer) return;

            // The user can only click/answer once
            acceptAnswer = false;

            const userAnswer = event.target;
            
            // Setting up conditionals to check if the Answer is correct or incorrect
            const addClass = (userAnswer.innerText === currentQues.answer) ? "correct" : "incorrect";

            userAnswer.parentElement.classList.add(addClass);

            setTimeout( () => {
                userAnswer.parentElement.classList.add(addClass);
                
                let oldDiv = document.querySelector(".new-card");
                oldDiv.remove();
                
                newQuestion();
            }, 1000)
            
        })
    })
}

// Pending
endGame = () => {
    console.log("Game Over.");
}