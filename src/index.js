// Identify Database URLs
const categoryApi = new apiCategory('https://lets-know-it-all.herokuapp.com/api/v1');
const userApi = new apiUser('https://lets-know-it-all.herokuapp.com/api/users');
const questionApi = new apiQuestion('https://lets-know-it-all.herokuapp.com/api/v1/categories');

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
    categoryApi.getCategories()
        .then(categories => categories.data.forEach(category => new Category(category.attributes.name)))
        .catch(error => alert(error));
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

// Suggestions:
// Group addEventListener in one Class