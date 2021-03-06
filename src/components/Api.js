class Api {
    constructor(url) {
        this.url = url;
    }
}

class apiUser extends Api {
    getUsers = () => fetch(`${this.url}`).then(resp => resp.json());
    
    postUser = (user) => {
        fetch(`${this.url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

    updateScore() {
        console.log("In the updateScore method")
    }
}

class apiCategory extends Api {
    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());
}

class apiQuestion extends Api {
    getQuestions = (id) => fetch(`${this.url}/${id}/questions`).then(resp => resp.json());
}