// HTML Elementlerini Seç
const searchBtn = document.getElementById("search-btn");
const usernameInput = document.getElementById("username");
const repoContainer = document.getElementById("repo-container");

const searchBtn2 = document.getElementById("search-btn2");
const usernameInput2 = document.getElementById("username2");
const userInfoContainer = document.getElementById("user-container");

// 1. Repository Data Fetch
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

// 2. Repository Display
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

// 3. User Info Data Fetch
const fetchUserInfo = async () => {
  const username = usernameInput2.value.trim();

  if (username === "") {
    userInfoContainer.innerHTML = "<p style='color:red;'>Please enter a username</p>";
    return;
  }

  const userApiUrl = `https://api.github.com/users/${username}`;
  const repoApiUrl = `https://api.github.com/users/${username}/repos`;

  try {
    const [userResponse, repoResponse] = await Promise.all([
      fetch(userApiUrl),
      fetch(repoApiUrl),
    ]);

    if (!userResponse.ok || !repoResponse.ok) {
      throw new Error("User not found or API error");
    }

    const userData = await userResponse.json();
    const repoData = await repoResponse.json();

    displayUserInfo(userData);
    displayUserStats(userData, repoData);
  } catch (error) {
    userInfoContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
};

// 4. User Info Display
const displayUserInfo = (user) => {
  userInfoContainer.innerHTML = `
    <div class="user-info">
      <img src="${user.avatar_url}" alt="${user.name}" />
      <h3>${user.name || "No Name Provided"}</h3>
      <p>${user.bio || "No Bio Available"}</p>
      <div class="user-stats">
        <div><strong>Followers</strong><p>${user.followers}</p></div>
        <div><strong>Following</strong><p>${user.following}</p></div>
        <div><strong>Public Repos</strong><p>${user.public_repos}</p></div>
      </div>
    </div>
  `;
};

// 5. User Stats Display
const displayUserStats = (user, repos) => {
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const totalPRs = repos.length;
  const totalIssues = repos.reduce((acc, repo) => acc + repo.open_issues_count, 0);

  const statsCard = document.createElement("div");
  statsCard.classList.add("github-stats-card");
  statsCard.innerHTML = `
    <h2>${user.name || user.login}'s GitHub Stats</h2>
    <iframe src="https://github-readme-stats.vercel.app/api?username=${user.login}&show_icons=true&theme=dark" width="100%" frameborder="0"></iframe>
    <iframe src="https://github-readme-streak-stats.herokuapp.com/?user=${user.login}&theme=dark" width="100%" frameborder="0"></iframe>
    <iframe src="https://github-readme-stats.vercel.app/api/top-langs/?username=${user.login}&layout=compact&theme=dark" width="100%" frameborder="0"></iframe>
    <p><strong>⭐ Total Stars Earned:</strong> ${totalStars}</p>
    <p><strong>🔃 Total PRs:</strong> ${totalPRs}</p>
    <p><strong>❗ Total Issues:</strong> ${totalIssues}</p>
  `;
  userInfoContainer.appendChild(statsCard);
};



// Event Listeners
searchBtn.addEventListener("click", fetchRepositories);
searchBtn2.addEventListener("click", fetchUserInfo);
