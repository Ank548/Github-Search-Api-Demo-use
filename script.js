const MainAPI = "https://api.github.com/users";
const Profile = document.getElementById("profile");
const profileSearch = document.getElementById("profileSearch").firstElementChild;

// const FetchAPI = fetch(MainAPI);
// FetchAPI.then((response) => {
//     return response.json()
// }).then((response) => {
//     console.log(response)
// })

async function fetchUsername(username) {
    let response = await fetch((MainAPI + username));

    if (response.status == 200) {

        let data = await response.json();
        // console.log(data)


        Profile.innerHTML = `
        <div id="profileImage">
        <a id="profileImg" href="${data.html_url}" target="_blank">
        <img src="${data.avatar_url}" alt="">
        </a>
        </div>
        
        <div id="profileDetails">
        <div id="name">
        <h2><a href="${data.html_url}" target="_blank">${data.name}</a></h2>
        </div>
        <div id="bio">
        <p>${data.bio}</p>
        </div>
        <div id="Followers">
        <li>
        <span>${data.followers}</span>
        <div>Followers</div>
        </li>
        <li>
        <span>${data.following}</span>
        <div>Following</div>
        </li>
        <li>
        <span>${data.public_repos}</span>
        <div>Repos</div>
        </li>
        </div>
        
        <div id="repos">
        
        </div>
        </div>
        `;
    }
    else {
        Profile.innerHTML = `<h2 style="margin: auto;">Username Not Found</h2`
    }
}




async function fetchRepos(username) {
    let repos = document.getElementById("repos");
    let response = await fetch(MainAPI + username);
    if (response.status == 200) {

        let data = await response.json();
        // console.table(data)

        data.forEach(repo => {

            repos.innerHTML += `
            <li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>
            `
        });
    }


}


async function Search(username) {
    let Username = await fetchUsername(`/${username}`)
    let Repos = await fetchRepos(`/${username}/repos`)
}



profileSearch.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        SearchBar();
    }
})

profileSearch.addEventListener("focusout", () => {
    SearchBar();
})

function SearchBar() {
    if (profileSearch.value != "") {
        Search(profileSearch.value);
        profileSearch.value = "";
    }
}