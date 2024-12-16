function toggleGithubProjects() {
    var githubProjectsContainer = document.getElementById('github-projects-container');
    if (githubProjectsContainer.style.display === 'none' || githubProjectsContainer.style.display === '') {
        githubProjectsContainer.style.display = 'block';
    } else {
        githubProjectsContainer.style.display = 'none';
    }
}

function toggleAboutMe() {
    var aboutMeContainer = document.getElementById('about-me-container');
    if (aboutMeContainer.style.display === 'none' || aboutMeContainer.style.display === '') {
        aboutMeContainer.style.display = 'block';
    } else {
        aboutMeContainer.style.display = 'none';
    }
}
