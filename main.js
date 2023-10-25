// Select Elements
let theInput=document.getElementById("input__search");
let theReposBtn=document.getElementById("get__repos");
let theRepos=document.querySelector(".repos");

const getRepos=(reposUrl) => {
    if(theInput.value=="") {
        theRepos.innerHTML=`<div class="error">
            <span>Enter The Name Of User!</span>
        </div>`;
    } else {
        fetch(reposUrl).then((response) => response.json()).then((repos) => {
            console.log(repos);
            theRepos.innerHTML=" ";
            repos.forEach((repo) => {
                // Create div to carry repos
                let div=document.createElement("div");

                let repoDiv=document.createElement("div");
                repoDiv.className="divPosition";
                div.className="repo";
                // Create div textnode
                let repoName=document.createTextNode(repo.name);
                div.appendChild(repoName);

                let repoLink=document.createElement("a");
                repoLink.className="repolink";
                repoLink.href=`https://github.com/${repo.full_name}`;
                repoLink.setAttribute('target', '_blank');
                repoVisit=document.createTextNode("Visit");
                repoLink.appendChild(repoVisit);

                let repoDemo=document.createElement("a");
                repoDemo.className="repolink";
                repoDemo.href=`https://mostafahelal-cs.github.io/${repo.name}/`;
                repoDemo.setAttribute("target", "_blank");
                repoDemo.innerHTML="Demo";

                repoDiv.append(repoDemo ,repoLink);
                div.appendChild(repoDiv);
                theRepos.appendChild(div);
            });
        });
    }
};


theReposBtn.onclick=function () {
    getRepos(`https://api.github.com/users/${theInput.value}/repos`);
};

document.addEventListener('keyup', function (e) {
    if(e.key=="Enter") {
        getRepos(`https://api.github.com/users/${theInput.value}/repos`);
    }
});