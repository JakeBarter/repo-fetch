// Task 1: GitHub repositories page
// Steps:
// 1. Write getRepos(username) using fetch and async/await. Check response.ok.
// 2. Write showRepos(repos): one link per repository. Use textContent, not innerHTML.
// 3. Write init(): call getRepos inside try/catch and show a message if it fails.
// 4. Add a JSDoc comment above every function.
// 5. Call init() at the bottom of the file.


class gitHubRepositoriesPage {
    constructor() { //constructor holds variables that can be accessed by all functions in the class using .this
        //they work like a more secure version of global variables
        this.username = "OmniXenomorph";
        this.repoList = document.querySelector("#repos");
        this.useLocalFile = false;

    }
    async getRepos() {
        const address = this.useLocalFile//if useLocalFile = false, then it will use :, if its true it will use ?
            ? "repos.json"
            : `https://api.github.com/users/${this.username}/repos?per_page=100`;
        const response = await fetch(address);
        //fetch gets the information from the server and as the server sends ends headers (like status 200 OK)
        //await makes the program wait for the process to finish and get the data out before moving on to the next line
        if (!response.ok) {//if the server doesnt send 200 (ok) it will show an error
            throw new Error(`Failed to fetch repos, Github didnt respond ${response.status}`);
        }
        return await response.json();
        //await makes the program wait for the process to finish before moving on to the next line
        /** 
         * return await response.json(); has to:
         * Wait for all the data to finish downloading from the server (await)
         * Read the raw text and parse it from a JSON string into real JavaScript objects and arrays (.json())
        */
    }
    showRepos(repos) {
        this.repoList.textContent = "";
        if (repos.length == 0) {
            this.repoList.textContent = "No Puplic Repos Found, Or account doesnt exist";
            return;
        }

        /**
         * for (let i = 0; i < repos.length; i++) {
         *      const repo = repos[i];
         * }
        */

        //code below (for (const holdOneRepo of repos)) is a cleaner version of the commented code above ^^^

        for (const holdOneRepo of repos) { //Go through the list called repos
            //and for each item in that list, call it holdOneRepo and run the code inside the curly brackets { }
            const itemInRepos = document.createElement("li"); //creats a list item (<li></li>)
            const linkToItemInRepos = document.createElement("a"); //creates a clickable hyperlink (<a></a>)

            linkToItemInRepos.href = holdOneRepo.html_url;
            linkToItemInRepos.textContent = holdOneRepo.name;

            itemInRepos.append(linkToItemInRepos);
            this.repoList.append(itemInRepos);

        }
    }
    async runWebsite() {//used to run 
        try {
            const repos = await this.getRepos(); //await makes the program wait for the process to finish before moving on to the next line
            //since sending a request over the internet can take time, if we didnt use await, JS would jst rush to the next line without checking if it got the data
            //Without await it would output: Promise { <pending> }  <-- You get a "receipt/promise", not the data
            //with await it would output: [{ name: "my-repo", ... }] <-- The actual finished data
            //so its always good practice to use await when trying to get data from the internet
            this.showRepos(repos);
        } catch (error) {
            console.error(error);
            this.repoList.textContent = `Account known as: ${this.username}, has been found and loaded but no repos could be found on the account or the account has no public repos`
        }

    }
}

const page = new gitHubRepositoriesPage();
page.runWebsite();
