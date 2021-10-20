import { films } from '../data/films.js';
// let results = [];
// const filterAndSort = (arr, filmProp) => {
//     results = arr.filter((d) => {
//         return d.filmProp;
//     });

//     results.sort((a, b) => {
//         return a.filmProp - b.filmProp;
//     });
//     return results;
// };

const app = (data) => {
    const rootApp = document.getElementById('App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');
    let orderedFilms = [];

    orderedFilms = films
        // .filter((d) => {
        //     return {
        //         url: d.episode_id
        //     };
        // })
        .sort((a, b) => {
            return a.episode_id - b.episode_id;
        });

    // console.log(orderedFilms);
    // orderedFilms.sort((a, b) => {
    //     return a.episode_id - b.episode_id;
    // });
    console.log(orderedFilms);

    // filterAndSort(films, 'episode_id');

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
        const id = film.url.slice(film.url.length - 2).substr(0, 1);
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

    /* data.forEach((d, index) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const imgElement = document.createElement('img');

        const divCrawlElement = document.createElement('div');
        const crawlPElement = document.createElement('p');

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divCrawlElement.classList.add('card-content');
        // console.log(d);

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
    }); */

    rootApp.append(mainHeader, container);
};

// films.find((x) => {
//     if (x.url === 'https://swapi.co/api/films/6/') console.log(x.url);
// });

// NOPE to below code

// const newArr = [];
// films.forEach((film) => {
//     newArr.push(film.title);
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
/**
         * let names= ["Style","List","Raw"];
            let results= names.filter(x => x.includes("s"));
            console.log(results); //["List"]

         */

// const results = films.filter((d) => {
//     return {
//         url: d.url.includes(7)
//     };
// });

// console.log(results);
// results.sort((a, b) => {
//     return a.episode_id - b.episode_id;
// });
// console.log(results);
