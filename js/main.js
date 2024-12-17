const searchBtn = document.getElementById("search-btn");
const usernameInput = document.getElementById("username");
const repoContainer = document.getElementById("repo-container");
const userInfoContainer = document.getElementById("user-container");
const usernameInput2 = document.getElementById("username2");
const searchBtn2 = document.getElementById("search-btn2");

// GET /users/{username}/repos
// GET /users/{username}


const fetchRepositories = async () => {
    const username = usernameInput.value.trim();
  
    if (username === "") {
      repoContainer.innerHTML = "<p style='color:red;'>Please enter a username</p>";
      return;
    }
  
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("User not found or API error");
      }
      const data = await response.json();
      displayRepositories(data);
    } catch (error) {
      repoContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
    };

    const displayRepositories = (repos) => {
        repoContainer.innerHTML = "";
      
        if (repos.length === 0) {
          repoContainer.innerHTML = "<p>No repositories found for this user.</p>";
          return;
        }
      
        repos.forEach((repo) => {
          const repoItem = document.createElement("div");
          repoItem.classList.add("repo-item");
          repoItem.innerHTML = `
            <h3>${repo.name}</h3>
            <a href="${repo.html_url}" target="_blank">View on GitHub</a>
          `;
          repoContainer.appendChild(repoItem);
        });
      };



    searchBtn.addEventListener("click", fetchRepositories);




    const fetchUser = async () => {
        const username = usernameInput2.value.trim();

        if (username===""){
            userInfoContainer.innerHTML ="Please enter a username";
        }

        const apiUrl = `https://api.github.com/users/${username}`;

        try{
            const response =await fetch(apiUrl);
            if(!response.ok){
                throw new Error("user not found");
            }
            const data = await response.json();
            displayUser(data);
        } catch (error){
            userInfoContainer.innerHTML = `<p>${error.message}</p>`;
        }
    }

    const displayUser = (users)=>{

        userInfoContainer.innerHTML="";
        if (users.length === 0) {
            userInfoContainer.innerHTML = "<p>No repositories found for this user.</p>";
            return;
          }

            const userInfo = document.createElement("div");
            userInfo.innerHTML = `
              <h3>${users.name}</h3>
              <img src="${users.avatar_url}" alt="${users.name}" />
              <p>${users.bio}</p>
              <p>Followers: ${users.followers}</p>
              <p>Following: ${users.following}</p>
              <p>Repos: ${users.public_repos}</p>
              </div>`;
            
            userInfoContainer.appendChild(userInfo);

        };
            
        searchBtn2.addEventListener("click", fetchUser);