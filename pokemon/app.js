// pokemon utils
import {
    getData,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    createArray,
    sortStringArrAscending
    // capitalizeFirstLetter
} from './utils/utils.js';

// ~~ TODO: Create game container
// ~~ TODO: Create game button
// TODO: Create pokeball button ! maybe
// TODO: Create pokedex ! maybe
// ~~ TODO: Clean up code and remove comments
// TODO: Move flippable cards to this file
// ? This is a sort of game

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

const getChancesOfCapture = () => {
    return Math.floor(Math.random() * 6) + 1;
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
            // ! temporary solution, replace with CSS
            // console.log(pokemon.sprites);
            const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

            const pokemonStats = pokemon.stats.map((stat) => {
                return {
                    hp: stat.base_stat
                };
            });

            const pokedexDiv = document.createElement('div');
            const id = pokemon.id;
            const nameDiv = document.createElement('div');
            const nameHeading = document.createElement('h2');
            const pokemonImg = document.createElement('img');
            nameHeading.textContent = `${id}: ${name}`;
            nameDiv.append(nameHeading);

            const statsDiv = document.createElement('div');
            const statsSpan = document.createElement('span');

            statsSpan.style.color = '#000';

            statsSpan.textContent = `HP: ${pokemonStats[0].hp}`;
            pokemonImg.src = `${pokemon.sprites.other['official-artwork'].front_default}`;
            statsDiv.append(statsSpan);
            pokedexDiv.append(pokemonImg, nameDiv, statsDiv);
            pokedexDiv.className = 'pokedex';
            pokedexDiv.style.backgroundColor = 'var(--pokemon-red)';
            pokedexDiv.style.padding = '1rem';
            pokedexContainer.append(pokedexDiv);
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
        const { name, id, sprites, stats } = await data;

        // const newPokemon = new Pokemon(name, id, sprites, stats, abilities);
        container.innerHTML = `
            <div class="wild-pokemon">
                <p>A wild <em>${name}</em> appeared!</p>
                <img src=${sprites.other['official-artwork'].front_default} alt='${name}' aria-label="${name}" loading="lazy">
                
            </div>
        `;
        const wildPkemon = document.querySelector('.wild-pokemon');
        const captureBtn = document.createElement('button');
        wildPkemon.append(captureBtn);
        captureBtn.textContent = 'Capture!';
        captureBtn.className = 'capture-pokemon';

        if (document.querySelector('button.capture-pokemon')) {
            wildPkemon.append(captureBtn);
            captureBtn.addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                    let count = 0;
                    addToParty({ name, id, stats, sprites });
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
