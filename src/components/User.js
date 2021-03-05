class User {

    static all = [];

    constructor(name, avatar, animals_score = 0, celebrities_score = 0, computer_science_score = 0, geography_score = 0, history_score = 0, mathematics_score = 0, music_score = 0, sports_score = 0) {
        this.name = name;
        this.avatar = avatar;
        this.animals_score = animals_score;
        this.celebrities_score = celebrities_score;
        this.computer_science_score = computer_science_score;
        this.geography_score = geography_score;
        this.history_score = history_score;
        this.mathematics_score = mathematics_score;
        this.music_score = music_score;
        this.sports_score = sports_score;
        this.constructor.all.push(this);
    }

    static getAllUsers() {
        userApi.getUsers() 
            .then(users => users.data.forEach(user => new User(user.attributes.name, user.attributes.avatar, user.attributes.animals_score, user.attributes.celebrities_score, user.attributes.computer_science_score, user.attributes.geography_score, user.attributes.history_score, user.attributes.mathematics_score, user.attributes.music_score, user.attributes.sports_score)))
            .catch(error => alert(error));
    }

    static checkUserLogin() {
        const userInput = document.getElementById('user-input').value.trim();
        const userSearch = User.all.find(user => user.name === userInput);

        if (userInput === '') {
            userNote.innerHTML = `<small>Please enter your name.</small>`;
        } else if (userSearch !== undefined) {
            userNote.innerHTML = `<small>Logging in..</small>`
            
            setTimeout(function() {
                userForm.remove();
                userNote.remove();

                greeter.innerHTML = `
                    <img src="${userSearch.avatar}" class="img-fluid avatar" alt="avatar">
                    <br><br>
                    Welcome back, <strong>${userSearch.name}</strong>!
                `
            }, 1300);
        } else {
            userNote.innerHTML = `<small>User is not found.</small>`;
        }
    }
    
    static userSignUp() {
        const userInput = document.getElementById('user-input').value.trim();
        const newUser = new User(`${userInput}`, `https://pokeres.bastionbot.org/images/pokemon/${Math.floor(Math.random()*100) + 1}.png`);
        if (userInput === '') {
            userNote.innerHTML = `<small>Please enter your name.</small>`;
        } else {
            userNote.innerHTML = `<small>Saving..</small>`;

            setTimeout(function() {
                userForm.remove();
                userNote.remove();

                greeter.innerHTML = `
                    <img src="${newUser.avatar}" class="img-fluid avatar" alt="avatar">
                    <br><br>
                    Welcome, <strong>${userInput}</strong>!
                `

                userApi.postUser(newUser)
            }, 1300);
        }
    }
}