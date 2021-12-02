import { projects } from './data/projects.js';
const projectHighlight = document.querySelector('.project-highlight');

const renderCard = (title, info) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardTitle = document.createElement('div');
    const cardH2 = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardH2.textContent = title;
    cardTitle.append(cardH2);

    const cardInfo = document.createElement('div');
    const cardPara = document.createElement('p');
    cardInfo.className = 'card-info';
    cardPara.textContent = info;
    cardInfo.append(cardPara);

    card.append(cardTitle, cardInfo);
    projectHighlight.append(card);
};

projects.forEach((project) => {
    renderCard(project.name, project.description);
    console.log(project.name, project.description);
});
