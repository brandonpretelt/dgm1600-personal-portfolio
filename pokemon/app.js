// pokemon utils
import {
    getData,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon
} from './utils/utils.js';

// ? below is optional
// TODO: Add a view pokemon party container
// TODO: https://stackoverflow.com/questions/59210276/javascript-array-get-first-10-items to display party of 6
// TODO: add a button to add certain pokemon to party
// TODO: Clean up the code... ugly ugly ugly

const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/`;
const startGameBtn = document.querySelector('#game-start');
const pokedexBtn = document.querySelector('#load-pokedex');
const container = document.querySelector('.container');
const pokedexContainer = document.querySelector('.pokedexContainer');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');

const startGame = () => {
    removeChildren(pokedexContainer);
    wildPokemonAppeared();
};

document.querySelector('.modal-background').addEventListener('click', () => {
    document.querySelector('html').classList.remove('hide-overflow');
    modal.classList.remove('show-modal');
});

document.querySelector('#searchPokemon').addEventListener('input', () => {
    if (document.querySelector('#searchPokemon').value !== '') {
        if (localStorage.getItem('capturedPokemon') !== null) {
            const pokemonData = JSON.parse(
                localStorage.getItem('capturedPokemon')
            );
            // console.log(parseInt(pokemonData.length / 5));
            pokemonData.forEach((pokemon) => {
                if (
                    document.querySelector('#searchPokemon').value ===
                        pokemon.name ||
                    document
                        .querySelector('#searchPokemon')
                        .value.toUpperCase() === pokemon.name.toUpperCase()
                ) {
                    pokedexContainer.style.setProperty('width', 'auto');
                    populatePokedexCard(pokemon);
                    if (document.querySelectorAll('.pokemon-card')) {
                        console.log();
                        document
                            .querySelector(':root')
                            .style.setProperty(
                                '--poke-limit',
                                document.querySelectorAll('.pokemon-card')
                                    .length
                            );
                    }
                }
            });
        }
    }
});

document.querySelector('#searchPokemon').addEventListener('focus', () => {
    document.querySelector('#searchPokemon').value = '';
    removeChildren(pokedexContainer);
});

document.querySelector('#searchPokemon').addEventListener('blur', () => {
    document.querySelector('#searchPokemon').value = '';
});

const getChancesOfCapture = () => {
    return Math.floor(Math.random() * 6) + 1;
};

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
    console.log(pokemon);
    let capturedPokemon;
    let pokemonCount = 0;
    if (localStorage.getItem('capturedPokemon') === null) {
        capturedPokemon = [];
    } else {
        capturedPokemon = JSON.parse(localStorage.getItem('capturedPokemon'));
        if (capturedPokemon.includes(pokemon)) {
            console.log('Blah');
        }
    }
    if (!capturedPokemon.includes(pokemon)) {
        capturedPokemon.push(pokemon);
        localStorage.setItem(
            'capturedPokemon',
            JSON.stringify(capturedPokemon)
        );
        modal.classList.add('show-modal');
        document.querySelector('.modal-msg').textContent = 'You caught it!';
        document.querySelector('html').classList.add('hide-overflow');
    } else {
        // pokemonCount++;
        console.log('some placeholder');
    }
    // console.log(pokemonCount);
    console.log(capturedPokemon);
    modalClose.addEventListener('click', () => {
        modal.classList.remove('show-modal');
        document.querySelector('html').classList.remove('hide-overflow');
    });
};

const loadPokedex = () => {
    removeChildren(pokedexContainer);
    let pokemonData;
    if (localStorage.getItem('capturedPokemon') !== null) {
        pokemonData = JSON.parse(localStorage.getItem('capturedPokemon'));
        console.log(parseInt(pokemonData.length / 5));
        pokemonData.forEach((pokemon) => {
            populatePokedexCard(pokemon);
        });
    } else {
        pokemonData = [];
    }
};

pokedexBtn.addEventListener('click', () => {
    loadPokedex();
});

const wildPokemonAppeared = () => {
    getData(`${pokemonApiUrl}${getRandomId(500)}`).then(async (data) => {
        const { name, id, sprites, stats, abilities } = await data;
        const newPokemon = new Pokemon(name, id, sprites, stats, abilities);
        newPokemon.pokemonParty();
        container.innerHTML = `
            <div class="wild-pokemon pokemon-card">
                <div class="card-card_face front">
                <p>A wild <em>${name}</em> appeared!</p>
                <img src=${sprites.other['official-artwork'].front_default} alt='${name}' aria-label="${name}" loading="lazy">
                </div>
            </div>
        `;
        const wildPkemon = document.querySelector('.wild-pokemon');
        const captureBtn = document.createElement('button');
        wildPkemon.append(captureBtn);
        captureBtn.style.marginTop = '1em';
        captureBtn.textContent = 'Capture!';
        captureBtn.className = 'capture-pokemon';

        if (document.querySelector('button.capture-pokemon')) {
            wildPkemon.append(captureBtn);
            captureBtn.addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                    let count = 0;
                    addToParty({ name, id, stats, sprites, abilities });
                    if (e.target.className === 'capture-pokemon') {
                        console.log('oops');
                    }
                    // count++;
                    removeChildren(container);
                    removeChildren(pokedexContainer);
                },
                false
            );
        }
    });
};

const getRandomId = (id) => {
    // TODO: added function so user can select different gen pokemon
    return Math.floor(Math.random() * id) + 1;
};

startGameBtn.addEventListener('click', () => startGame(), true);
