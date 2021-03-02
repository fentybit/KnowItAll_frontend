class Api {
    
    constructor(url) {
        this.url = url;
    }

    getCategories = () => fetch(`${this.url}/categories`).then(resp => resp.json())

    // getQuestions = () => fetch()
}