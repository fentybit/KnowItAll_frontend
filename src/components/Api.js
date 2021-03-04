class Api {
    
    constructor(url) {
        this.url = url;
    }

    getUsers = () => fetch(`${this.url}`).then(resp => resp.json());

    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());

    // getQuestions = () => fetch()
}