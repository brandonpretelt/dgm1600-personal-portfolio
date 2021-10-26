import { people } from '../data/people.js';

const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    let homeworlds = [];
    data.forEach((person) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const divInfoElement = document.createElement('div');
        const pInfoElement = document.createElement('p');
        const imgElement = document.createElement('img');
        homeworlds.push({ world_url: person.homeworld });

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divInfoElement.classList.add('card-content');
        h1Element.innerHTML = person.name;
        pInfoElement.innerHTML = `${person.name} was born on ${person.birth_year}.`;
        pInfoElement.innerHTML = `${person.homeworld}`;
        let id;
        id = person.url.slice(person.url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            newId = newId.slice(1);
        } else {
            newId = id.slice(0, -1);
        }
        imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${newId}.jpg`;

        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divElement.append(divInfoElement);
        divInfoElement.append(pInfoElement);
        container.append(divElement);
    });

    mainHeaderHeading.textContent = 'Star Wars Characters';
    mainHeader.classList.add('main-heading');
    mainHeader.append(mainHeaderHeading);
    container.classList.add('container');

    rootApp.append(mainHeader, container);
};

app(people);
