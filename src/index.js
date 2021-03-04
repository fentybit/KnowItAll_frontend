// Identify Database URLs
const api = new apiCategory('http://localhost:3000/api/v1');
const userApi = new apiUser('http://localhost:3000/api/users');
let acceptAnswer = false;

// Identify HTML elements from index.html
const greeter = document.getElementById('greeter');
const userForm = document.querySelector('.input-group');
const loginBtn = document.getElementById('login-btn');
const userNote = document.querySelector('.user-note');
const playBtn = document.getElementById('play');
const containerDiv = document.querySelector('.container');

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    Category.getAll();
})

// Identify all Users
User.getAllUsers();

userForm.addEventListener('click', (event) => {    
    if (event.target.innerHTML === "Log In") User.checkUserLogin();
    if (event.target.innerHTML === "Sign Up") User.userSignUp();
})