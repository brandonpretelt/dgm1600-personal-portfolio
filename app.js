import { projects } from './project-data/projects.js';
import { renderCard } from './final-utils/index.js';
const projectHighlight = document.querySelector('.project-highlight');
// const projectsBtn = document.querySelector('button');
const projectCardContainer = document.createElement('div');
projectCardContainer.className = 'card-container';

// projectsBtn.addEventListener('click', () => {
//     window.location = '#projects';
// });

// fetch('http://localhost:3001/api/projects')
//     .then((res) => res.json())
//     .then((data) => {
//         const { data: results } = data;
//         results.forEach((result) => {
//             const { name, description, url, imgUrl } = result;
//             renderCard(name, description, url, projectCardContainer, imgUrl);
//         });
//     });

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

document.addEventListener('scroll', () => {
    console.log(document.documentElement);
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 10) {
        document.querySelector('nav').classList.add('on-scroll');
    } else {
        document.querySelector('nav').classList.remove('on-scroll');
    }
});
