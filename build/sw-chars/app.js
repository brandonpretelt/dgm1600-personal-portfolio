import { people } from '../data/people.js';
import {
    grabLast,
    isolateID,
    renderDOM,
    addListeners
} from '../utils/utils.js';

// TODO: rewrite this to match the films page?

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

const getCharGender = (arr, gender) => {
    return arr.filter((arr_item) => arr_item.gender === gender);
};

const app = () => {
    renderDOM(people, container);

    const theGents = getCharGender(people, 'male');
    const theLadies = getCharGender(people, 'female');

    addListeners(allBtn, 'click', () => renderDOM(people, container));
    addListeners(maleBtn, 'click', () => renderDOM(theGents, container));
    addListeners(femaleBtn, 'click', () => renderDOM(theLadies, container));

    addListeners(otherBtn, 'click', () => {
        const others = people.filter((person) => {
            if (person.gender !== 'male' && person.gender !== 'female') {
                return person;
            }
        });
        renderDOM(others, container);
    });

    rootApp.append(container);
    container.classList.add('container');

    btnContainer.append(allBtn, maleBtn, femaleBtn, otherBtn);
    btnContainer.classList.add('btn-container');
    rootApp.prepend(btnContainer, heading);
    console.log(rootApp);
};

app();
