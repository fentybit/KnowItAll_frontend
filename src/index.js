const api = new Api('http://localhost:3000/api/v1');

// Identify HTML elements from index.html
// const greeter = document.getElementById('greeter');
// const userInput = document.querySelector('.input-group');
// const addNote = document.querySelector('.veri-note');
const playBtn = document.getElementById('play');
const containerDiv = document.querySelector('.container');

playBtn.addEventListener('click', () => {
    containerDiv.innerHTML = '';
    Category.getAll()
})