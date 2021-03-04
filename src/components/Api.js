class Api {
    constructor(url) {
        this.url = url;
    }
}

class apiUser extends Api {
    getUsers = () => fetch(`${this.url}`).then(resp => resp.json());
    
    postUser = (user) => {
        
    }
}

class apiCategory extends Api {
    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());
}

class apiQuestion extends Api {
    // getQuestions = () => fetch()
}