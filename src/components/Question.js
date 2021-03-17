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
                    currentCategory = 'animals';
                    this.filterQuestions('Animals'); 
                    this.renderQuestion();   
                    break;
                case 'Celebrities':
                    currentCategory = 'celebrities';
                    this.filterQuestions('Celebrities'); 
                    this.renderQuestion();  
                    break;
                case 'Computer Science':
                    currentCategory = 'computer_science';
                    this.filterQuestions('Computer Science');
                    this.renderQuestion();  
                    break;
                case 'Geography':
                    currentCategory = 'geography';
                    this.filterQuestions('Geography');
                    this.renderQuestion();  
                    break;
                case 'History':
                    currentCategory = 'history';
                    this.filterQuestions('History');
                    this.renderQuestion();  
                    break;
                case 'Mathematics':
                    currentCategory = 'mathematics';
                    this.filterQuestions('Mathematics');
                    this.renderQuestion();  
                    break;
                case 'Music':
                    currentCategory = 'music';
                    this.filterQuestions('Music');
                    this.renderQuestion();  
                    break;
                case 'Sports':
                    currentCategory = 'sports';
                    this.filterQuestions('Sports');
                    this.renderQuestion();  
                    break;
            }
        })
    }

    // For time complexity, this logic could be encapsulated in the back-end
    static filterQuestions(category) {
        availableQuestions = Question.all.filter(q => q.category_name === category);
    }

    static renderQuestion() {  
        containerDiv.innerHTML = '';

        if (questionCount >= 10 || availableQuestions.length < 10) {
            return this.endGame();
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
        divContainer.style.width = '100%';
        divContainer.innerHTML = `
            <div class='card-header'>
                ${currentQues.question}
            </div>
            <ul class='list-group list-group-flush'>           
                <li class='list-group-item'>${currentQues.choice1}</li>
                <li class='list-group-item'>${currentQues.choice2}</li>      
                <li class='list-group-item'>${currentQues.choice3}</li>      
                <li class='list-group-item'>${currentQues.choice4}</li>
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
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" role="progressbar" aria-valuenow="${questionCount/11 * 100}" aria-valuemin="0" aria-valuemax="100" style="width: ${questionCount/11 * 100}%"></div> 
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

    static endGame() {
        // Read Final Score
        const endGameSummary = document.createElement('h1');
        endGameSummary.className = 'score-tracker';
        endGameSummary.innerText = score;

        const scoreDiv = document.createElement('div');
        scoreDiv.id = 'tracker';
        scoreDiv.innerHTML = `<p class="text-muted" style="text-align: center;">score</p>`;
        scoreDiv.appendChild(endGameSummary);

        // Set Up Condtionals for Higher Score
        let scoreStatus = '';

        if (currentUser && (currentUser[`${currentCategory}_score`] < score)) {
            currentUser[`${currentCategory}_score`] = score;
            userApi.updateScore(currentUser);

            scoreStatus = document.createElement('div');
            scoreStatus.id = 'greeter';
            scoreStatus.innerHTML = `
                <img src="${currentUser.avatar}" class="img-fluid avatar" alt="avatar">
                <br><br>
                <p class="text-muted" style="text-align: center;">Congratulations ${currentUser.name}!</p>
                <p class="text-muted" style="text-align: center;">This is your highest score in this category.</p>
            `;
        }
    
        // Create Play Back and Home buttons 
        const endGameBtns = document.createElement('div');
        endGameBtns.className = 'd-grid gap-2';
        endGameBtns.style.width = '100%';
        endGameBtns.innerHTML = `
            <button type="button" class="btn btn-outline-secondary id="end-game-btns">Play Again</button>
            <button type="button" class="btn btn-outline-secondary id="end-game-btns">Home</button>
        `;

        containerDiv.append(scoreDiv, scoreStatus, endGameBtns);

        endGameBtns.addEventListener('click', (event) => {
            questionCount = 0;
            score = 0;

            if (event.target.innerText === 'Play Again') {
                // Delete previous buttons
                containerDiv.innerHTML = '';

                // Back to Category Selections
                currentCategory = '';
                Category.getAll();
            } else {
                window.history.go();
            }
        })
    }

}