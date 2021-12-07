// global utils
import { addListeners } from '../utils/utils.js';
// pokemon utils
import {
    getData,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    createArray
    // capitalizeFirstLetter
} from './utils/utils.js';

// TODO: Do a not so fancy game but, it's still fun anyway
// TODO: Learned about LocalStorage from online course, maybe implement that somehow?
// ~~ TODO: Maybe change assignment a bit from the example from class?
// ~~ TODO: Add a Pokemon class.

const pokemonLimit = document.getElementById('enter-pokemon-limit');
const btn = document.getElementById('get-pokemon-data');
const modalBtn = document.getElementById('add-pokemon');
const modal = document.querySelector('.modal');
const modalBg = document.querySelector('.modal-background');
const modalClose = document.querySelector('.modal-close');
const createNewBtn = document.querySelector('#create-pokemon');

createNewBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let name, height, abilities;
    (name = document.querySelector('#name').value),
        (height = document.querySelector('#height').value),
        // checked out regex, testing it out here to remove any whitespace and replace with a comma
        (abilities = document
            .querySelector('#abilities')
            .value.replace(/\s/g, ','));
    let newPokemon = new Pokemon(
        name,
        parseInt(height),
        300,
        createArray(abilities)
    );

    populatePokeCard(newPokemon);
    modal.classList.toggle('show-modal');
    document.querySelector('#add-new-pokemon').reset();
    document.querySelector('html').classList.toggle('hide-overflow');
});

modalBtn.addEventListener('click', () => {
    modal.classList.add('show-modal');
    document.querySelector('html').classList.add('hide-overflow');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show-modal');
    document.querySelector('html').classList.close('hide-overflow');
});

modalBg.addEventListener('click', () => {
    modal.classList.remove('show-modal');
    document.querySelector('html').classList.close('hide-overflow');
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

loadPokemon(apiUrl, 25, 0);

btn.addEventListener('click', () => {
    // if (pokemonLimit.value >= 0 && pokemonLimit.value <= 151) {
    //     loadPokemon(apiUrl, pokemonLimit.value);
    // } else {
    //     alert('The range is too high, please try again');
    // }
    loadPokemon(apiUrl, pokemonLimit.value);
});
