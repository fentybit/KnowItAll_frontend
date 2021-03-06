// Variable Declarations
let currentQues = {};
let acceptAnswer = false;
let score = 0;
let questionCount = 0;
let availableQuestions = [];

class Question {
    
    static all = [];

    constructor(question, choice1, choice2, choice3, choice4, answer, category_name) {
        this.question = question;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        this.category_name = category_name;
        this.constructor.all.push(this);
    }

    static init() {
        for (let i = 1; i < 9; i++) {
            questionApi.getQuestions(i).then(questions => questions.data.forEach(q => new Question(q.attributes.question, q.attributes.choice1, q.attributes.choice2, q.attributes.choice3, q.attributes.choice4, q.attributes.answer, q.attributes.category_name)));
        }
    }

    static startGame() {
        containerDiv.addEventListener('click', (event) => {
            let selectedCategory = event.target.innerHTML;
            
            switch (selectedCategory) {
                case 'Animals': 
                    this.filterQuestions('Animals');
                    console.log(availableQuestions);
                    break;
                case 'Celebrities':
                    this.filterQuestions('Celebrities');
                    console.log(availableQuestions);
                    break;
                case 'Computer Science':
                    this.filterQuestions('Computer Science');
                    console.log(availableQuestions);
                    break;
                case 'Geography':
                    this.filterQuestions('Geography');
                    console.log(availableQuestions);
                    break;
                case 'History':
                    this.filterQuestions('History');
                    console.log(availableQuestions);
                    break;
                case 'Mathematics':
                    this.filterQuestions('Mathematics');
                    console.log(availableQuestions);
                    break;
                case 'Music':
                    this.filterQuestions('Music');
                    console.log(availableQuestions);
                    break;
                case 'Sports':
                    this.filterQuestions('Sports');
                    console.log(availableQuestions);
                    break;
            }
        })
    }

    static filterQuestions(category) {
        availableQuestions = Question.all.filter(q => q.category_name === category);
    }

    static renderQuestion() {  
        console.log("This is a test.")
        // if (availableQuestions.length === 0 || questionCount >= 10) {
        //     return endGame();
        // }

        // questionCount++;

        // // Create and Update Score Tracker
        // const scoreCount = document.createElement('h1');
        // scoreCount.className = 'score-tracker';
        // scoreCount.innerText = score;

        
    }

    endGame() {
        console.log("Goodbye!");

        score = 0;
        questionCount = 0;
        availableQuestions = [];
    }

}