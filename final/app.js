import { projects } from './data/projects.js';
const projectHighlight = document.querySelector('.project-highlight');

const renderCard = (title, info, url) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardTitle = document.createElement('div');
    const cardH2 = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardH2.textContent = title;
    cardTitle.append(cardH2);

    const cardInfo = document.createElement('div');
    const cardPara = document.createElement('p');
    const cardLink = document.createElement('a');
    cardLink.className = 'card-link';
    cardInfo.className = 'card-info';
    cardPara.textContent = info;
    cardLink.textContent = 'Link to Project';
    cardLink.href = url;
    cardInfo.append(cardPara, cardLink);
    card.append(cardTitle, cardInfo);
    projectHighlight.append(card);
};

projects.forEach((project) => {
    renderCard(project.name, project.description, project.url);
    console.log(project.name, project.description, project.url);
});
