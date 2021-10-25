import { films } from '../data/films.js';
// TODO: fix the layout
// ~~ TODO: set default film cover
// ~~ TODO: set default film crawl
// ~~ TODO: Clean up comments

const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    let orderedFilms = [];

    let imgArr = [];
    let containerDiv;

    let featured;
    let featuredImg;
    const openings = [];

    orderedFilms = data.sort((a, b) => {
        return a.episode_id - b.episode_id;
    });

    orderedFilms.forEach((film) => {
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

        crawlPElement.textContent = film.opening_crawl;
        h1Element.textContent = film.title;
        const id = film.url.slice(film.url.length - 2).slice(0, -1);

        imgElement.src = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
        imgArr.push(imgElement);

        divElement.append(imgElement);
        container.append(divElement);
    });

    data.forEach((x) => openings.push(x));

    const orderedImgs = imgArr.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });

    orderedImgs.forEach((item, index) => {
        featured = document.createElement('div');
        featuredImg = document.createElement('img');

        featuredImg.setAttribute('data-main', 'main');
        featured.append(featuredImg);

        const p = document.createElement('p');
        const newH1 = document.createElement('h1');

        featuredImg.src = `${orderedImgs[3].src}`;
        p.innerHTML = openings[3].opening_crawl;
        newH1.innerHTML = openings[3].title;

        featured.append(newH1);
        featured.append(p);
        item.addEventListener('click', () => {
            const p = document.createElement('p');
            const newH1 = document.createElement('h1');
            featured.innerHTML = `
            <img src=${(featuredImg.src = item.src)}>
            <h1>${openings[index].title}</h1>
            <p>${openings[index].opening_crawl}</p>
            `;
        });
        featured.append(p);
    });

    featured.classList.add('featured');
    mainHeader.classList.add('main-heading');
    container.classList.add('container');

    container.prepend(featured);
    containerDiv.classList.add('test-test');

    rootApp.append(container);
    rootApp.insertBefore(featured, container);
};
console.time('test 1');
app(films);
console.timeEnd('test 1');
