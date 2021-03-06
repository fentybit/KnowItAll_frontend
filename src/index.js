// Identify Database URLs
const categoryApi = new apiCategory('http://localhost:3000/api/v1');
const userApi = new apiUser('http://localhost:3000/api/users');
const questionApi = new apiQuestion('http://localhost:3000/api/v1/categories')

// Identify HTML elements from index.html
const greeter = document.getElementById('greeter');
const userForm = document.querySelector('.input-group');
const loginBtn = document.getElementById('login-btn');
const userNote = document.querySelector('.user-note');
const playBtn = document.getElementById('play');
const containerDiv = document.querySelector('.container');

// Identify Current Category Selection
let currentCategory = '';

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    Category.getAll();
})

// Identify all Users
User.getAllUsers();

// Identify Current User 
let currentUser = {};

userForm.addEventListener('click', (event) => {    
    if (event.target.innerHTML === "Log In") User.checkUserLogin();
    if (event.target.innerHTML === "Sign Up") User.userSignUp();
})

Question.init();
Question.startGame();