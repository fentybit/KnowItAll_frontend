const playBtn = document.getElementById('play');
const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));

let currentQuestion = {};
let acceptingAnswer = true;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

// Welcome user to press the Play Button
playBtn.addEventListener('click', (event) => {
    console.log('Let\'s Play!'); // tbd
    startGame();
})

startGame = () => {
    console.log('In the Game')
    playBtn.remove();
    
    // questionCount = 0;
    // score = 0;
    // availableQuestions = [...questions];
}

newQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= 10) {
        return endGame();
    }
    questionCount++;

}

endGame = () => {
    return "Game Over."
}