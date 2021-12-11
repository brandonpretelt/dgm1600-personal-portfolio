import { projects } from './project-data/projects.js';
import { renderCard } from './final-utils/index.js';
const projectHighlight = document.querySelector('.project-highlight');
const projectsBtn = document.querySelector('button');
const projectCardContainer = document.createElement('div');
projectCardContainer.className = 'card-container';

projectsBtn.addEventListener('click', () => {
    window.location = '#projects';
});

projects.forEach((project) => {
    renderCard(
        project.name,
        project.description,
        project.url,
        projectCardContainer,
        project.imgUrl
    );
});

projectHighlight.append(projectCardContainer);
