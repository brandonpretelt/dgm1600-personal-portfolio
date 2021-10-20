import { films } from '../data/films.js';
const rootApp = document.getElementById('App');
const container = document.createElement('div');
container.textContent = 'Hello world';
container.classList.add('container');
rootApp.append(container);
// const filmsContainer = document.querySelector('.films-container');

// films.forEach((film, index) => {
//     const h1El = document.createElement('h1');
//     const imgEl = document.createElement('img');
//     const divEl = document.createElement('div');
//     const sw_card = document.createElement('div');
//     const pEl = document.createElement('p');
//     const { title } = film;
//     // .card, .card-title, .card-content
//     h1El.textContent = title;
//     h1El.className = 'card-title';
//     pEl.className = 'characters';
//     imgEl.src = `https://starwars-visualguide.com/assets/img/films/${
//         index + 1
//     }.jpg`;
//     divEl.append(h1El, imgEl);
//     divEl.classList.add(`film-${index}`);
//     divEl.classList.add('card-content');
//     divEl.appendChild(pEl);

//     // append card-content and add a class of card
//     sw_card.classList.add('card');
//     sw_card.appendChild(divEl);

//     // append card to main filmscontainer
//     filmsContainer.append(sw_card);
// });
