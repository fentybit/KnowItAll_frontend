const api = new Api('http://localhost:3000/api/v1');
const apiUser = new Api('http://localhost:3000/api/users');

// Identify HTML elements from index.html
// const greeter = document.getElementById('greeter');
const userForm = document.querySelector('.input-group');
const userNote = document.querySelector('.user-note');
const playBtn = document.getElementById('play');
const containerDiv = document.querySelector('.container');

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    Category.getAll()
})

userForm.addEventListener('click', (event) => {
    const userInput = document.getElementById('user-input').value;
    
    if (event.target.innerHTML === "Log In") {
        if (!userInput) userNote.innerHTML = 'User Name is invalid.';
        // console.log(`${userInput}`)
        User.getAllUsers();
        User.all.map(user => console.log(user.name));
        

    } 
    
    if (event.target.innerHTML === "Sign Up") {
        if (!userInput) userNote.innerHTML = 'User Name is invalid.';

        

        const newUser = new User(`${userInput}`, `https://pokeres.bastionbot.org/images/pokemon/${Math.floor(Math.random()*100) + 1}.png`)
    }
})