import { films } from '../data/films.js';
import { addListeners, sortStringArr, isolateID } from '../utils/utils.js';
// ~~ TODO: set default film cover
// ~~ TODO: set default film crawl
// ~~ TODO: Clean up comments

const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');

    let orderedFilms = [];

    let imgArr = [];
    let containerDiv;

    let featured;
    let featuredImg;
    const openings = [];

    orderedFilms = data.sort((a, b) => {
        return a.episode_id - b.episode_id;
    });

    const createCard = (arr1, arr2) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const imgElement = document.createElement('img');
        containerDiv = document.createElement('div');

        const divCrawlElement = document.createElement('div');
        const crawlPElement = document.createElement('p');

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divCrawlElement.classList.add('card-content');

        crawlPElement.textContent = arr1.opening_crawl;
        h1Element.textContent = arr1.title;
        const id = isolateID(arr1);
        imgElement.src = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
        arr2.push(imgElement);

        divElement.append(imgElement);
        container.append(divElement);
    };

    orderedFilms.forEach((film) => {
        createCard(film, imgArr);
    });

    data.forEach((x) => openings.push(x));

    const orderedImgs = sortStringArr(imgArr);

    const displayFeatured = (arrItem1, theIndex) => {
        featured = document.createElement('div');
        featuredImg = document.createElement('img');

        featuredImg.setAttribute('data-main', 'main');
        featured.append(featuredImg);

        const p = document.createElement('p');
        const newH1 = document.createElement('h1');

        featuredImg.src = `${orderedImgs[3].src}`;
        p.innerHTML = openings[3].opening_crawl;
        newH1.innerHTML = openings[3].title;

        const displayUI = () => {
            return `
            <img src=${(featuredImg.src = arrItem1.src)}>
            <h1>${openings[theIndex].title}</h1>
            <p>${openings[theIndex].opening_crawl}</p>
            `;
        };

        addListeners(
            arrItem1,
            'click',
            () => (featured.innerHTML = displayUI())
        );

        featured.append(newH1);
        featured.append(p);
    };

    orderedImgs.forEach((item, index) => {
        displayFeatured(item, index);
    });

    featured.classList.add('featured');
    mainHeader.classList.add('main-heading');
    container.classList.add('container');

    container.prepend(featured);

    rootApp.append(container);
    rootApp.insertBefore(featured, container);
};
app(films);
