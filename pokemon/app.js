import { addListeners } from '../utils/utils.js';

const pokemonLimit = document.getElementById('enter-pokemon-limit');
const btn = document.getElementById('get-pokemon-data');

const apiUrl = `https://pokeapi.co/api/v2/pokemon/?limit=`;

const getData = (url) => {
    try {
        return fetch(url).then((res) => res.json());
    } catch (e) {
        console.log(e, ' error message of sorts');
    }
};

addListeners(btn, 'click', () => {
    getData(`${apiUrl}${pokemonLimit.value}`).then(async (data) => {
        let container;
        container = document.querySelector('.container');

        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }

        for (const pokemon of data.results) {
            await getData(pokemon.url).then((pokemon) => {
                const heading1 = document.createElement('h1');
                const heading2 = document.createElement('h2');
                const img = document.createElement('img');
                const div = document.createElement('div');
                div.setAttribute('class', 'pokemon-card');
                console.log(pokemon.id, pokemon.name);
                img.src = `${pokemon.sprites['other']['official-artwork'].front_default}`;
                img.setAttribute('loading', 'lazy');
                const firstLetterUpper =
                    pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
                heading1.textContent = firstLetterUpper;
                heading2.textContent = pokemon.id;
                div.prepend(heading2);
                div.prepend(heading1);
                div.append(img);
                container.append(div);
                // document.body.append(container);
            });
        }

        console.log(container.firstChild);
    });
});
