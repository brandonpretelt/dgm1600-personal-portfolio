import { people } from '../data/people.js';

const app = (data) => {
    // TODO: FIX LAYOUT?

    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    data.forEach((person) => {
        const headerElement = document.createElement('header');
        const divElement = document.createElement('div');
        const h1Element = document.createElement('h1');
        const divInfoElement = document.createElement('div');
        const pInfoElement = document.createElement('p');
        const imgElement = document.createElement('img');

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divInfoElement.classList.add('card-content');
        h1Element.innerHTML = person.name;
        const isolateID = () => {
            let id;
            id = person.url.slice(person.url.length - 3);
            let newId = id.slice(0, -1);
            if (newId[0] === '/') {
                return (newId = newId.slice(1));
            } else {
                return (newId = id.slice(0, -1));
            }
        };

        imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${isolateID()}.jpg`;

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
