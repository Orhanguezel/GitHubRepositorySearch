export class GitHup {
    constructor(){
        this.url = 'https://api.github.com/users/';
}

async getGitHubData(username){
    const responseUser = await fetch(this.url + username);
    const responseRepo = await fetch(this.url + username + '/repos');
    const userData = await responseUser.json();
    const repoData = await responseRepo.json();

    return{
        userData,
        repoData
    }
}

}

