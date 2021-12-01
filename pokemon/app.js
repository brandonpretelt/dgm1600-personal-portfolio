import { addListeners } from '../utils/utils.js';

const pokemonLimit = document.getElementById('enter-pokemon-limit');
const offsetNumber = document.getElementById('enter-offset-number');
const btn = document.getElementById('get-pokemon-data');

const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=`;

// btn.addEventListener('click', () => {

// });
// btn.addEventListener('click', () => {
//     fetch(`${apiUrl}${pokemonLimit.value}`)
//         .then((res) => res.json())
//         .then((data) => {
//             const { results } = data;
//             // console.log(results);
//             for (const pokemon of results) {
//                 fetch(pokemon.url)
//                     .then((res) => res.json())
//                     .then((data) => console.log(data.id));
//             }
//         });
// });
const getData = (url) => {
    try {
        return fetch(url, { cache: 'force-cache' }).then((data) => data.json());
    } catch (e) {
        console.log(e, ' error message of sorts');
    }
};

addListeners(btn, 'click', () => {
    getData(`${apiUrl}${pokemonLimit.value}`).then((data) => {
        let container;
        container = document.createElement('div');
        for (const pokemon of data.results) {
            getData(pokemon.url).then((pokemon) => {
                // console.log(pokemon.id, pokemon.name, pokemon);
                container.setAttribute('id', 'container');

                const img = document.createElement('img');
                const div = document.createElement('div');
                div.setAttribute('id', 'pokemon-img-test');
                console.log(
                    pokemon.sprites.other['official-artwork'].front_default
                );
                img.src = `${pokemon.sprites['other']['official-artwork'].front_default}`;
                div.append(img);
                container.append(div);
                document.body.append(container);
            });
        }
    });
});

// btn.addEventListener('click', () => {
//     getData(`${apiUrl}${pokemonLimit.value}`).then((data) => {
//         let container;
//         container = document.createElement('div');
//         for (const pokemon of data.results) {
//             getData(pokemon.url).then((pokemon) => {
//                 // console.log(pokemon.id, pokemon.name, pokemon);
//                 container.setAttribute('id', 'container');

//                 const img = document.createElement('img');
//                 const div = document.createElement('div');
//                 div.setAttribute('id', 'pokemon-img-test');
//                 console.log(
//                     pokemon.sprites.other['official-artwork'].front_default
//                 );
//                 img.src = `${pokemon.sprites['other']['official-artwork'].front_default}`;
//                 div.append(img);
//                 container.append(div);
//                 document.body.append(container);
//             });
//         }
//     });
// });
