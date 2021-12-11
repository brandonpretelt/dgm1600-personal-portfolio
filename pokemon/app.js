// pokemon utils
import {
    getData,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    pokemonGenerations,
    removeOnFocus,
    removeOnBlur,
    loadFromStorage,
    saveToStorage,
    getRandomId
} from './utils/utils.js';

// ? below is optional

// ! Learned about localstorage in a separate tutorial and decided to implement it here

// TODO: Add a view pokemon party container
// TODO: https://stackoverflow.com/questions/59210276/javascript-array-get-first-10-items to display party of 6
// TODO: add a button to add certain pokemon to party
// TODO: Clean up the code... ugly ugly ugly

const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/`;
const startGameBtn = document.querySelector('#game-start');
const pokedexBtn = document.querySelector('#load-pokedex');
const container = document.querySelector('.container');
const pokedexContainer = document.querySelector('.pokedexContainer');
const modalPop = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const modalBg = document.querySelector('.modal-background');
const searchPokemon = document.querySelector('#searchPokemon');

const startGame = () => {
    removeChildren(pokedexContainer);
    wildPokemonAppeared();
    // modalGenSelection.classList.toggle('show-modal');
};

modalBg.addEventListener('click', () => {
    document.querySelector('html').classList.remove('hide-overflow');
});

searchPokemon.addEventListener('input', () => {
    if (searchPokemon.value !== '') {
        if (localStorage.getItem('capturedPokemon') !== null) {
            let pokemonData;
            pokemonData = loadFromStorage();
            pokemonData.forEach((pokemon) => {
                const dataList = document.getElementById('pokemon-suggestion');
                const option = document.createElement('option');

                option.setAttribute('value', `${pokemon.name}`);
                option.textContent = `${pokemon.name}`;
                dataList.append(option);
                if (
                    searchPokemon.value === pokemon.name ||
                    searchPokemon.value.toUpperCase() ===
                        pokemon.name.toUpperCase()
                ) {
                    populatePokedexCard(pokemon);
                }
            });
        }
    }
});

removeOnFocus(pokedexContainer);
removeOnBlur();

const populatePokedexCard = (pokemon) => {
    const pokedexContainer = document.querySelector('.pokedexContainer');

    const card = document.createElement('div');
    card.className = 'pokemon-card';
    card.addEventListener('click', () => card.classList.toggle('is-flipped'));

    const front = populateCardFront(pokemon);
    const back = populateCardBack(pokemon);
    card.append(front);
    card.append(back);
    pokedexContainer.append(card);
};

const addToParty = (pokemon) => {
    saveToStorage(pokemon, modalPop);
    modalClose.addEventListener('click', () => {
        modalPop.classList.remove('show-modal');
        document.querySelector('html').classList.remove('hide-overflow');
    });
};

const loadPokedex = () => {
    removeChildren(pokedexContainer);
    loadFromStorage(populatePokedexCard);
};

pokedexBtn.addEventListener('click', () => {
    loadPokedex();
});

const wildPokemonAppeared = () => {
    getData(`${pokemonApiUrl}${getRandomId(151)}`).then(async (data) => {
        const { name, id, abilities, stats, sprites } = await data;
        const appearedPokemon = new Pokemon(
            name,
            id,
            abilities,
            stats,
            sprites
        );
        container.innerHTML = `
            <div class="wild-pokemon pokemon-card">
                <div class="card-card_face front">
                <p>A wild <em>${appearedPokemon.name}</em> appeared!</p>
                <img src=${appearedPokemon.sprites.other['official-artwork'].front_default} alt='${appearedPokemon.name}' aria-label="${appearedPokemon.name}" loading="lazy">
                </div>
            </div>
        `;
        const wildPkemon = document.querySelector('.wild-pokemon');
        const captureBtn = document.createElement('button');
        wildPkemon.append(captureBtn);
        captureBtn.style.marginTop = '1em';
        captureBtn.textContent = 'Capture!';
        captureBtn.className = 'capture-pokemon';
        wildPkemon.append(captureBtn);
        captureBtn.addEventListener('click', () => {
            addToParty(appearedPokemon);
            removeChildren(container);
            removeChildren(pokedexContainer);
        });
    });
};

startGameBtn.addEventListener('click', () => startGame(), true);
