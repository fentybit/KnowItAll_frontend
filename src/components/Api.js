class Api {
    constructor(url) {
        this.url = url;
    }
}

class apiUser extends Api {  
    // for User database
    getUsers = () => fetch(`${this.url}`).then(resp => resp.json());
    
    postUser = (user) => {
        fetch(`${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    updateScore = (currentUser) => {
        let updateCategoryScore = {}
        updateCategoryScore[`${currentCategory}_score`] = score;

        fetch(`${this.url}/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }, 
            body: JSON.stringify(updateCategoryScore)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch( (error) => {
            console.error('Error:', error);
        });
    }
}

class apiCategory extends Api { 
    // for Category database
    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());
}

class apiQuestion extends Api {  
    // for Question database
    getQuestions = (id) => fetch(`${this.url}/${id}/questions`).then(resp => resp.json());
}