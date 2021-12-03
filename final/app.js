import { projects } from './data/projects.js';
import { renderCard } from './final-utils/index.js';
const projectHighlight = document.querySelector('.project-highlight');
const projectsBtn = document.querySelector('button');

projectsBtn.addEventListener('click', () => {
    window.location = '#projects';
});

projects.forEach((project) => {
    renderCard(
        project.name,
        project.description,
        project.url,
        projectHighlight
    );
});
