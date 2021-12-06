// global utils
import { addListeners } from '../utils/utils.js';
// pokemon utils
import {
    getData,
    getPokemonId,
    getEncounters,
    populateCardFront,
    populateCardBack,
    removeChildren
} from './utils/utils.js';

// TODO: Do a not so fancy game but, it's still fun anyway
// TODO: Maybe change assignment a bit from the example from class?
// TODO: Add a Pokemon class.
// TODO: Learned about LocalStorage from online course, maybe implement that somehow?

const pokemonLimit = document.getElementById('enter-pokemon-limit');
const btn = document.getElementById('get-pokemon-data');
const modalBtn = document.getElementById('add-pokemon');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

modalBtn.addEventListener('click', () => {
    modal.classList.toggle('hide-modal');
    // if (modal.classList.contains('hide-modal')) {
    //     console.log(true);
    //     modal.className = 'modal show-modal';
    //     modal.classList.remove('hide-modal');
    // }
});

modalClose.addEventListener('click', () => {
    modal.classList.toggle('hide-modal');
});

const apiUrl = `https://pokeapi.co/api/v2/pokemon/`;

const populatePokeCard = (pokemon) => {
    const pokeScene = document.querySelector('.container');
    pokeScene.className = 'container';
    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));

    const front = populateCardFront(pokemon);
    const back = populateCardBack(pokemon);
    card.append(front);
    card.append(back);
    pokeScene.append(card);
};

const loadPokemon = (url, limit = 25, offset = 0) => {
    removeChildren(document.querySelector('.container'));
    getData(`${url}?limit=${limit}&offset=${offset}}`).then(async (data) => {
        for (const pokemon of data.results) {
            await getData(pokemon.url).then((pokemonData) => {
                populatePokeCard(pokemonData);
            });
        }
    });
};

loadPokemon(apiUrl, 12, 0);

btn.addEventListener('click', () => {
    if (pokemonLimit.value >= 0 && pokemonLimit.value <= 151) {
        loadPokemon(apiUrl, pokemonLimit.value);
    } else {
        alert('The range is too high, please try again');
    }
});
