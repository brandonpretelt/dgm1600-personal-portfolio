import { films } from '../data/films.js';

const app = (data) => {
    const rootApp = document.getElementById('App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    mainHeaderHeading.textContent = 'Star Wars Films';
    mainHeader.append(mainHeaderHeading);
    container.classList.add('container');

    data.forEach((d, index) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const imgElement = document.createElement('img');

        const divCrawlElement = document.createElement('div');
        const crawlPElement = document.createElement('p');

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divCrawlElement.classList.add('card-content');

        h1Element.textContent = d.title;
        crawlPElement.textContent = d.opening_crawl;
        imgElement.src = `https://starwars-visualguide.com/assets/img/films/${
            index + 1
        }.jpg`;

        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divCrawlElement.append(crawlPElement);
        divElement.append(divCrawlElement);
        container.append(divElement);
    });
    rootApp.append(mainHeader, container);
};

// NOPE to below code

// const newArr = [];
// films.forEach((film) => {
//     newArr.push(film.episode_id);
// });

// const sortedArr = newArr;
// sortedArr.sort((a, b) => {
//     return a - b;
// });
// console.log(sortedArr);

// filmsEpisodes.sort((a, b) => {
//     console.log(a - b);
// });

// const findByFilmNumber = (arr) => {
//     const OT = [];
//     const PT = [];
//     const ST = [];
//     let title;
//     arr.find((element) => {
//         if (element.url.includes(1)) {
//             OT.push(element.title);
//         }
//     });
//     title = OT;
//     return title;
// };

// findByFilmNumber(films);
app(films);
