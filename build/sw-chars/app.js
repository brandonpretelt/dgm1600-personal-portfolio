import { people } from '../data/people.js';

const rootApp = document.querySelector('#App');
const container = document.createElement('div');
const mainHeader = document.createElement('header');
const mainHeaderHeading = document.createElement('h1');
const maleBtn = document.createElement('button');
const femaleBtn = document.createElement('button');

const populateDOM = (arr) => {
    femaleBtn.textContent = 'Female Characters';
    maleBtn.textContent = 'Male Characters';

    rootApp.prepend(maleBtn, femaleBtn);

    const grabLast = (item) => {
        return item.url.slice(item.url.length - 3);
    };

    const isolateID = (item) => {
        let id;
        id = grabLast(item);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            return (newId = newId.slice(1));
        }
        return newId;
    };

    // const render = (element) => {
    //     return (element.innerHTML += `
    //     <header class='card-title'>
    //     <h1>${person.name}</h1>
    //     <img src='https://starwars-visualguide.com/assets/img/characters/${isolateID(
    //         person
    //     )}.jpg'>
    //         </header>
    //         `);
    // };

    // const searchMaleFemale = (g) => {
    //     const divElement = document.createElement('div');
    //     divElement.classList.add('card');
    //     const divClear = document.querySelectorAll('.card');
    //     console.log(divElement);
    //     people.filter((person) => {
    //         if (g === person.gender) {
    //             console.log(person.gender);
    //         }
    //         render(divElement);
    //     });
    //     divClear.innerHTML = '';
    // };
    // maleBtn.addEventListener('click', () => searchMaleFemale('male'));

    arr.forEach((person) => {
        // rewrite as a function, characters as param
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

        imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${isolateID(
            person
        )}.jpg`;

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

const app = () => {
    // TODO: FIX LAYOUT?
    populateDOM(people);
};

app();
