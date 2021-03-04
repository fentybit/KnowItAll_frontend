class Api {
    
    constructor(url) {
        this.url = url;
    }

    static getUsers = () => fetch('http://localhost:3000/api/users').then(resp => resp.json());

    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json());

    // getQuestions = () => fetch()
}