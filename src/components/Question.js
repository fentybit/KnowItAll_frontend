class Question {
    
    static all = [];

    constructor(question, choice1, choice2, choice3, choice4, answer) {
        this.question = question;
        this.choice1 = choice1;
        this.choice2 = choice2;
        this.choice3 = choice3;
        this.choice4 = choice4;
        this.answer = answer;
        this.constructor.all.push(this);
    }

    static startGame() {
        containerDiv.addEventListener('click', (event) => {
            let selectedCategory = event.target.innerHTML;
            
            switch (selectedCategory) {
                case 'Animals':
                    console.log("Animalss")
                    break;
                case 'Celebrities':
                    console.log("Celebritiess")
                    break;
                case 'Computer Science':
                    console.log("Comp Sci")
                    break;
                case 'Geography':
                    console.log('Geographysss')
                    break;
                case 'History':
                    console.log('Nerd')
                    break;
                case 'Mathematics':
                    console.log('Mathematicss')
                    break;
                case 'Music':
                    console.log('La la laa')
                    break;
                case 'Sports':
                    console.log('basketball')
                    break;
            }

        })
    }
}