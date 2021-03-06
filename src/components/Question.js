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
                    this.renderQuestion();   
                    break;
                case 'Celebrities':
                    this.filterQuestions('Celebrities'); 
                    this.renderQuestion();  
                    break;
                case 'Computer Science':
                    this.filterQuestions('Computer Science');
                    this.renderQuestion();  
                    break;
                case 'Geography':
                    this.filterQuestions('Geography');
                    this.renderQuestion();  
                    break;
                case 'History':
                    this.filterQuestions('History');
                    this.renderQuestion();  
                    break;
                case 'Mathematics':
                    this.filterQuestions('Mathematics');
                    this.renderQuestion();  
                    break;
                case 'Music':
                    this.filterQuestions('Music');
                    this.renderQuestion();  
                    break;
                case 'Sports':
                    this.filterQuestions('Sports');
                    this.renderQuestion();  
                    break;
            }
        })
    }

    static filterQuestions(category) {
        availableQuestions = Question.all.filter(q => q.category_name === category);
    }

    static renderQuestion() {  
        containerDiv.innerHTML = '';

        if (questionCount >= 10 || availableQuestions.length === 0) {
            return endGame();
        }

        questionCount++;

        // Create and Update Score Tracker
        const scoreCount = document.createElement('h1');
        scoreCount.className = 'score-tracker';
        scoreCount.innerText = score;

        const scoreDiv = document.createElement('div');
        scoreDiv.id = 'tracker';
        scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`
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
        questionTracker.innerHTML = `${questionCount} / 10`;
        
        // Update Progress Bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress';
        progressBar.innerHTML = `
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${questionCount/12 * 100}" aria-valuemin="0" aria-valuemax="100" style="width: ${questionCount/12 * 100}%"></div> 
        `;

        containerDiv.append(scoreDiv, divContainer, questionTracker, progressBar);

        // Delete previous question from the availableQuestions Array
        availableQuestions.splice(randomIndex, 1);

        // Allow the user to accept an answer 
        acceptAnswer = true;
        this.checkAnswer();
    }

    static checkAnswer() {
        const selections = Array.from(document.getElementsByClassName('list-group-item'));

        selections.forEach((selection) => {
            selection.addEventListener('click', (event) => {
                // If we are not ready accepting answer 
                if (!acceptAnswer) return;
    
                // The user can only click/answer once 
                acceptAnswer = false;
    
                const userAnswer = event.target;

                // Conditionals to check the userAnswer validity
                const addClass = (userAnswer.innerText.trim() === currentQues.answer) ? "correct" : "incorrect";

                // Update Score Count
                if (addClass === "correct") score += 1;

                userAnswer.classList.add(addClass);

                setTimeout( () => {
                    // Update Question cards
                    this.renderQuestion()
                }, 1000)
            })
        })
    }

    endGame() {
        console.log("Goodbye!");

        score = 0;
        questionCount = 0;
        availableQuestions = [];
    }

}