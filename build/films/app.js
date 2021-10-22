import {films} from '../data/films.js';
// TODO: fix the layout
// ~~ TODO: set default film cover
// TODO: set default film crawl
const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    let orderedFilms = [];

    orderedFilms = data.sort((a, b) => {
        return a.episode_id - b.episode_id;
    });

    // console.log(orderedFilms);

    let orderedFilms2 = [];
    let prequels = [],
        ot = [],
        st = [];
    orderedFilms2 = data.filter((a) => {
        if (a.episode_id < 4) {
            prequels.push(a);
        }
        if (a.episode_id <= 6 && a.episode_id > 3) {
            ot.push(a);
        }
    });
    // console.log(prequels);
    // console.log(ot);
    let imgArr = [];
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
        // console.log(film.episode_id);
        // console.log(id, ': film id and what not');
        imgElement.src = `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
        imgArr.push(imgElement);
        // console.log(imgElement, ': wtf is going on');
        // console.log(imgArr, ': insdie of ordered films');
        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divCrawlElement.append(crawlPElement);
        divElement.append(divCrawlElement);
        container.append(divElement);
    });
    // console.log(imgArr, ': IMAGE ARRAY');
    let featured;
    let featuredImg;
    const openings = [];
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

    // console.log(orderedImgs, ': no worky :(');
    // console.log(openings, ': look here!');
    orderedImgs.forEach((item, index) => {
        // console.log(item);
        // console.log(index);
        // if (openings[index] === 0) {
        //     console.log(openings[0].opening_crawl);
        // }
        // console.log(openings[index].opening_crawl, ': le openings');
        featured = document.createElement('div');
        featuredImg = document.createElement('img');
        //featuredImg.src = 'https://via.placeholder.com/150';
        featuredImg.setAttribute('data-main', 'main');
        featured.append(featuredImg);
        // let div;
        const p = document.createElement('p');
        // const text = document.createTextNode(openings[0].opening_crawl);
        // featuredImg.src = item.src;
        // alert(item[item.length]);
        featuredImg.src = `https://starwars-visualguide.com/assets/img/films/4.jpg`;
        // p.innerHTML = `${openings[0].opening_crawl}`;
        // p.append(text);
        // alert(openings[0].opening_crawl);
        item.addEventListener('click', () => {
            // div = document.querySelector('.bleh');
            // p;
            // console.log(item.src);
            // console.log(item.src[index]);
            let someId = item.src[item.src.length - 5];
            // console.log(someId, ': lookie here');
            // console.log(index);
            // console.log(openings[index].opening_crawl);
            // if (p.textContent) {
            //     console.log('exists');
            //     console.log(p.textContent);
            // } else {
            //     console.log('nopes');
            //     console.log(p.textContent);
            // }
            // p.textContent = openings[index].opening_crawl;
            featured.innerHTML = `
            <img src=${(featuredImg.src = item.src)}>
            <p>${openings[index].opening_crawl}</p>
            `;
            //featuredImg.src = item.src;
        });
    });

    // console.log(data.opening_crawl, ': test');

    // console.log(orderedFilms);

    mainHeaderHeading.textContent = 'Star Wars Films';

    mainHeader.classList.add('main-heading');
    mainHeader.append(mainHeaderHeading);
    container.classList.add('container');
    featured.classList.add('featured');
    mainHeader.append(featured);
    rootApp.append(mainHeader, container);
    // document.querySelector('.bleh')
};

app(films);
