import { films } from '../data/films.js';
import { people } from '../data/people.js';
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

    // let orderedFilms2 = [];
    // let prequels = [],
    //     ot = [],
    //     st = [];
    // orderedFilms2 = data.filter((a) => {
    //     if (a.episode_id < 4) {
    //         prequels.push(a);
    //     }
    //     if (a.episode_id <= 6 && a.episode_id > 3) {
    //         ot.push(a);
    //     }
    // });
    // console.log(prequels);
    // console.log(ot);
    let imgArr = [];
    let containerDiv;
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

        // headerElement.append(h1Element);
        // divElement.append(headerElement);
        divElement.append(imgElement);
        // divCrawlElement.append(crawlPElement);
        // divElement.append(divCrawlElement);
        // containerDiv.append(divElement);
        // containerDiv.classList.add('test');
        // containerDiv.append(divElement);
        container.append(divElement);
    });

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
        // const text = document.createTextNode(openings[0].opening_crawl);
        // featuredImg.src = item.src;
        // alert(item[item.length]);
        // p.innerHTML = `${openings[0].opening_crawl}`;
        // p.append(text);
        // alert(openings[0].opening_crawl);
        const p = document.createElement('p');
        const newH1 = document.createElement('h1');
        featuredImg.src = `https://starwars-visualguide.com/assets/img/films/4.jpg`;
        p.textContent = openings[0].opening_crawl;
        newH1.textContent = openings[0].title;

        // p.prepend(newH1);
        featured.append(newH1);
        featured.append(p);
        item.addEventListener('click', () => {
            const p = document.createElement('p');
            const newH1 = document.createElement('h1');
            // div = document.querySelector('.bleh');
            // p;
            // console.log(item.src);
            // console.log(item.src[index]);
            // let someId = item.src[item.src.length - 5];
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
            // item.classList.add('active');
            featured.innerHTML = `
            <img src=${(featuredImg.src = item.src)}>
            <h1>${openings[index].title}</h1>
            <p>${openings[index].opening_crawl}</p>
            `;
            // p.textContent = 'hello';

            //  p.prepend(newH1);
            // newH1.innerHTML = `${openings[0].title}`;
            //featuredImg.src = item.src;
        });
        featured.append(p);
    });

    // console.log(data.opening_crawl, ': test');

    // console.log(orderedFilms);

    // mainHeaderHeading.textContent = 'Star Wars Films';

    featured.classList.add('featured');
    mainHeader.classList.add('main-heading');
    container.classList.add('container');
    // mainHeader.append(featured);
    container.prepend(featured);
    containerDiv.classList.add('test-test');
    // mainHeader.insertBefore(featured, container);
    // container.insertBefore(featured, containerDiv);
    // mainHeader.append(mainHeaderHeading);
    // featured.insertBefore(mainHeader, container);
    rootApp.append(container);
    rootApp.insertBefore(featured, container);
    // document.querySelector('.bleh')
};

app(films);
