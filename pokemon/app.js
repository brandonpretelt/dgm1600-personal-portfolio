// global utils
import { addListeners } from '../utils/utils.js';
// pokemon utils
import { getData, getPokemonId, getEncounters } from './utils/utils.js';

const pokemonLimit = document.getElementById('enter-pokemon-limit');
const btn = document.getElementById('get-pokemon-data');

const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

// console.log(getEncounters(apiUrl, getPokemonId(151)));

document.querySelector('.throw-pokeball-btn').addEventListener('click', () => {
    console.log('You threw a pokeball!');
    setTimeout(() => {
        const getPokemon = getData(`${apiUrl}${getPokemonId(151)}`);
        const pokemonName = getPokemon.then((data) => {
            const pokeScene = document.querySelector('.poke-scene');
            const spriteImg = document.createElement('img');
            const spanNotif = document.createElement('span');

            const {
                name,
                id,
                location_area_encounters: encounter_area,
                sprites
            } = data;

            spriteImg.className = 'pokemon-img';

            // console.log(data.location_area_encounters);
            console.log(encounter_area);
            const pokemon = name[0].toUpperCase() + name.slice(1);
            console.log(
                data.sprites['other']['official-artwork'].front_default
            );

            //${pokemon.sprites['other']['official-artwork'].front_default}
            console.log(`A wild ${pokemon} appeared!!`);

            spriteImg.src = sprites['other']['official-artwork'].front_default;
            spanNotif.textContent = `A wild ${pokemon} appeared!!`;
            document.addEventListener('click', (e) => {
                if (e.target.className === 'pokemon-img') {
                    let count = 1;
                    e.target.style.cursor = 'pointer';
                    if (count === 3) {
                        console.log('You captured a pokemon!');
                    }
                    count++;
                }
            });
            pokeScene.append(spanNotif, spriteImg);
        });
    }, 2000);
});

let count = 1;
document.querySelector('.pokeball-btn').addEventListener('click', () => {
    if (count === 3) {
        alert('A Wild Pokemon appeared!');
    }
    console.log(count);
    count++;
});

addListeners(btn, 'click', () => {
    getData(`${apiUrl}?limit=${pokemonLimit.value}`).then(async (data) => {
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
