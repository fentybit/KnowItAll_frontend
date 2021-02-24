const playBtn = document.getElementById('play');

// Welcome user to press the Play Button
playBtn.addEventListener('click', (event) => {
    startGame();
})

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

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

startGame = () => {
    console.log('In the Game')
    playBtn.remove();

    questionCount = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions); // tbd
    newQuestion();
}

const choices = Array.from(document.getElementsByClassName('choice-text'));

newQuestion = () => {
    if (availableQuestions.length === 0 || questionCount >= 10) {
        return endGame();
    }
    questionCount++;
    
    // Create <div class="container">
    const divContainer = document.createElement('div');
    divContainer.className = 'container';
    divContainer.innerHTML = `
        <div id="game" class="justify-center flex-column">
            <h2 id="question">What is the answer to this question?</h2>
            <div class="choice-container">
                <p class="choice-prefix">A</p>
                <p class="choice-text" data-number="1">Choice 1</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">B</p>
                <p class="choice-text" data-number="2">Choice 2</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">C</p>
                <p class="choice-text" data-number="3">Choice 3</p>
            </div>
            <div class="choice-container">
                <p class="choice-prefix">D</p>
                <p class="choice-text" data-number="4">Choice 4</p>
            </div>
        </div>
    `;
}

endGame = () => {
    return "Game Over."
}