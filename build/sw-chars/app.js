import { people } from '../data/people.js';
const rootApp = document.querySelector('#App');
const container = document.createElement('div');

const btnContainer = document.createElement('div');
const maleBtn = document.createElement('button');
const femaleBtn = document.createElement('button');
const otherBtn = document.createElement('button');
const allBtn = document.createElement('button');
const heading = document.createElement('h1');

maleBtn.textContent = 'Male Characters';
femaleBtn.textContent = 'Female Characters';
otherBtn.textContent = 'Other Characters';
allBtn.textContent = 'All Characters';
heading.textContent = 'Star Wars Characters';

// TODO: use visual guide to get more data...?

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

const getCharGender = (arr, gender) => {
    return arr.filter((arr_item) => arr_item.gender === gender);
};

const renderDOM = (arr) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    arr.forEach((arr_item) => {
        container.innerHTML += `
            <div class="card">
                <div class="card-profile">
                    <h1 class="card-title">${arr_item.name}</h1>
                    <div class="card-pfp">
                        <img src="https://starwars-visualguide.com/assets/img/characters/${isolateID(
                            arr_item
                        )}.jpg">
                    </div>
                </div>
            </div>
        `;
    });
};

const addListeners = (listenOn, typeOfListener, cb) => {
    return listenOn.addEventListener(typeOfListener, cb);
};

const app = () => {
    renderDOM(people);

    const theGents = getCharGender(people, 'male');
    const theLadies = getCharGender(people, 'female');

    addListeners(allBtn, 'click', () => renderDOM(people));
    addListeners(maleBtn, 'click', () => renderDOM(theGents));
    addListeners(femaleBtn, 'click', () => renderDOM(theLadies));

    addListeners(otherBtn, 'click', () => {
        const others = people.filter((person) => {
            if (person.gender !== 'male' && person.gender !== 'female') {
                return person;
            }
        });
        renderDOM(others);
    });

    rootApp.append(container);
    container.classList.add('container');

    btnContainer.append(allBtn, maleBtn, femaleBtn, otherBtn);
    btnContainer.classList.add('btn-container');
    rootApp.prepend(btnContainer, heading);
    console.log(rootApp);
};

app();

// !! BELOW IS THE OLD CODE
// const rootApp = document.querySelector('#App');
// const container = document.createElement('div');
// const mainHeader = document.createElement('header');
// const mainHeaderHeading = document.createElement('h1');
// const maleBtn = document.createElement('button');
// const femaleBtn = document.createElement('button');

// const getCharGender = (arr, gender) => {
//     return arr.filter((arr_item) => arr_item.gender === gender);
// };

// const maleChars = getCharGender(people, 'male');
// const femaleChars = getCharGender(people, 'female');

// maleBtn.style.cursor = 'pointer';
// femaleBtn.style.cursor = 'pointer';

// const addListeners = (listenOn, typeOfListener, cb) => {
//     return listenOn.addEventListener(typeOfListener, cb);
// };

// const grabLast = (item) => {
//     return item.url.slice(item.url.length - 3);
// };

// const isolateID = (item) => {
//     let id;
//     id = grabLast(item);
//     let newId = id.slice(0, -1);
//     if (newId[0] === '/') {
//         return (newId = newId.slice(1));
//     }
//     return newId;
// };

// const createPerson = (person) => {
//     const headerElement = document.createElement('header');
//     const divElement = document.createElement('div');
//     const h1Element = document.createElement('h1');
//     const divInfoElement = document.createElement('div');
//     const pInfoElement = document.createElement('p');
//     const imgElement = document.createElement('img');

//     divElement.classList.add('card');
//     headerElement.classList.add('card-title');
//     divInfoElement.classList.add('card-content');
//     h1Element.innerHTML = person.name;

//     imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${isolateID(
//         person
//     )}.jpg`;

//     headerElement.append(h1Element);
//     divElement.append(headerElement);
//     divElement.append(imgElement);
//     divElement.append(divInfoElement);
//     divInfoElement.append(pInfoElement);
//     container.append(divElement);
// };

// const populateDOM = (arr) => {
//     femaleBtn.textContent = 'Female Characters';
//     maleBtn.textContent = 'Male Characters';

//     rootApp.prepend(maleBtn, femaleBtn);

//     arr.forEach((person) => {
//         createPerson(person);
//     });

//     mainHeaderHeading.textContent = 'Star Wars Characters';
//     mainHeader.classList.add('main-heading');
//     mainHeader.append(mainHeaderHeading);
//     container.classList.add('container');
//     rootApp.append(mainHeader, container);
// };

// addListeners(maleBtn, 'click', () => populateDOM(maleChars));

// addListeners(femaleBtn, 'click', () => populateDOM(femaleChars));

// const app = () => {
//     // TODO: FIX LAYOUT?
//     if (container.classList.contains('container')) {
//         container.innerHTML = '';
//     }
//     console.log(container);
//     populateDOM(people);
// };

// app();
