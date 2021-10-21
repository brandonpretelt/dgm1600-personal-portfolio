import { films } from '../data/films.js';

const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');
    let orderedFilms = [];

    orderedFilms = films.sort((a, b) => {
        return a.episode_id - b.episode_id;
    });

    console.log(orderedFilms);

    let orderedFilms2 = [];
    let prequels = [],
        ot = [],
        st = [];
    orderedFilms2 = films.filter((a) => {
        if (a.episode_id < 4) {
            prequels.push(a);
        }
        if (a.episode_id <= 6 && a.episode_id > 3) {
            ot.push(a);
        }
    });
    console.log(prequels);
    console.log(ot);

    orderedFilms.forEach((film) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const imgElement = document.createElement('img');

        const divCrawlElement = document.createElement('div');
        const crawlPElement = document.createElement('p');

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divCrawlElement.classList.add('card-content');

        crawlPElement.textContent = film.opening_crawl;
        h1Element.textContent = film.title;
        const id = film.url.slice(film.url.length - 2).slice(0, -1);
        imgElement.src = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;

        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divCrawlElement.append(crawlPElement);
        divElement.append(divCrawlElement);
        container.append(divElement);
    });

    console.log(orderedFilms);

    mainHeaderHeading.textContent = 'Star Wars Films';

    mainHeader.classList.add('main-heading');
    mainHeader.append(mainHeaderHeading);
    container.classList.add('container');

    rootApp.append(mainHeader, container);
};

app(films);
