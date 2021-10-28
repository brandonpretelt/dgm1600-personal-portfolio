import { people } from '../data/people.js';

const populateDOM = (arr) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');
    const maleBtn = document.createElement('button');
    const femaleBtn = document.createElement('button');

    femaleBtn.textContent = 'Female Characters';
    maleBtn.textContent = 'Male Characters';

    rootApp.prepend(femaleBtn);
    rootApp.prepend(maleBtn);

    const isolateID = (item) => {
        // refactor using lastindexof and chart and end - 2;

        let id;
        id = item.url.slice(item.url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            return (newId = newId.slice(1));
        } else {
            return (newId = id.slice(0, -1));
        }
    };

    const searchMaleFemale = (g) => {
        const divElement = document.createElement('div');
        divElement.classList.add('card');
        const divClear = document.querySelectorAll('.card');
        // const headerElement = document.createElement('header');
        // const h1Element = document.createElement('h1');
        console.log(divElement);
        people.filter((person) => {
            if (g === person.gender) {
                console.log(person.gender);
                return (divElement.innerHTML += `
                <header class='card-title'>
                <h1>${person.name}</h1>
                <img src='https://starwars-visualguide.com/assets/img/characters/${isolateID(
                    person
                )}.jpg'>
                    </header>
                    `);
            }
        });
        divClear.innerHTML = '';
    };
    maleBtn.addEventListener('click', () => searchMaleFemale('male'));
    // searchMaleFemale('male');
    // searchMaleFemale('female');

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
