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

// ~~ TODO: Create game container
// ~~ TODO: Create game button
// TODO: Create pokeball button
// TODO: Create pokedex
// TODO: Clean up code and remove comments
// ? This is a sort of game

const pokemonApiUrl = `https://pokeapi.co/api/v2/pokemon/`;
const startGameBtn = document.querySelector('#game-start');
const pokedexBtn = document.querySelector('#load-pokedex');
const container = document.querySelector('.container');

const startGame = () => {
    // console.log(name);
    wildPokemonAppeared();
};

const getChancesOfCapture = () => {
    return Math.floor(Math.random() * 6) + 1;
};

const addToParty = (pokemon) => {
    let capturedPokemon;

    // let capturedPokemon;
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
    } else {
        console.log('some placeholder');
    }
    console.log(capturedPokemon);
};

const loadPokedex = () => {
    let pokemonData;
    if (localStorage.getItem('capturedPokemon') !== null) {
        pokemonData = JSON.parse(localStorage.getItem('capturedPokemon'));
        console.log(pokemonData);
        pokemonData.forEach((pokemon) => {
            // ! temporary solution, replace with CSS
            const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
            const hp = pokemon.stats.map((stat) => {
                return {
                    hp: stat.base_stat
                };
                /*              
    let hpStat =
                    stat.stat.name === 'hp' ? console.log(stat.base_stat) : ''; */
                // if (stat.stat.name === 'hp') {
                //     return stat.base_stat;
                // }
                /*            if (stat.stat.name === 'hp') {
                    return stat;
                } */
                // console.log(hpStat);
            });
            console.log(hp[0].hp);
            // console.log(hp[0].base_stat);
            //const stats = pokemon.stats[0].base_stat;
            // console.log(stats);
            // console.log(pokemon.stats['base_stat']);
            const id = pokemon.id;
            const nameDiv = document.createElement('div');
            const nameHeading = document.createElement('h2');
            nameHeading.textContent = `${id}: ${name}`;
            nameDiv.append(nameHeading);

            const statsDiv = document.createElement('div');
            const statsSpan = document.createElement('span');
            // console.log(pokemon.stats);
            statsSpan.style.color = '#000';
            // console.log(hp);
            statsSpan.textContent = `HP: ${hp[0].hp}`;
            statsDiv.append(statsSpan);

            container.append(nameDiv, statsDiv);

            // console.log(pokemon.name[0].toUpperCase() + pokemon.name.slice(1));
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

        /*         const div = document.createElement('div');
        const p = document.createElement('p');
        const img = document.createElement('img');
        const button = document.createElement('button');
        button.className = 'capture-button';
        div.className = 'wild-pokemon'; */

        container.innerHTML = `
            <div class="wild-pokemon">
                <p>A wild <em>${name}</em> appeared!</p>
                <img src=${sprites.other['official-artwork'].front_default} alt='${name}' aria-label="${name}">
                
            </div>
        `;
        const wildPkemon = document.querySelector('.wild-pokemon');
        const button = document.createElement('button');
        wildPkemon.append(button);
        button.textContent = 'Capture!';
        button.className = 'capture-pokemon';
        console.log(wildPkemon);
        //<button class="capture-pokemon">Capture!</button>
        if (document.querySelector('button.capture-pokemon')) {
            wildPkemon.append(button);
            //document
            button.addEventListener(
                'click',
                (e) => {
                    e.stopPropagation();
                    let count = 0;
                    addToParty({ name, id, stats });
                    if (e.target.className === 'capture-pokemon') {
                        console.log('oops');
                        // const chance = getChancesOfCapture();
                        // console.log(chance);
                        // if (chance >= 1 && chance <= 3) {
                        // container.innerHTML = '';
                        // } else if (chance >= 4 && chance <= 6) {
                        //     console.log('The pokemon escaped!!');
                        //     while (container.firstChild) {
                        //         container.removeChild(container.firstChild);
                        //     }
                        // }
                    }
                    // count++;
                },
                false
            );
        }

        // img.setAttribute('loading', 'lazy');
        // img.src = `${sprites.other['official-artwork'].front_default}`;
        // p.innerHTML = `
        // A wild <em>${name}</em> appeared!
        // `;
        // button.textContent = 'Capture!';
        // button.className = 'capture-button';
        // div.className = 'wild-pokemon';
        // div.append(p, img, button);
        // button.addEventListener('click', () => {
        //     console.log('hi');
        // });
        // container.append(div);
    });
};

const getRandomId = (id) => {
    // TODO: added function so user can select different gen pokemon
    return Math.floor(Math.random() * id) + 1;
};

/* const getPokemon = getData(`${pokemonApiUrl}${getRandomId(151)}`);
const name = getPokemon.then((data) => {
    const {
        name,
        id: number,
        sprites,
        species,
        types,
        abilities,
        moves
    } = data;
    return name;
    // console.log(name);
});
// console.log(name); */

startGameBtn.addEventListener('click', () => startGame(), true);

// const newPokemon = {};

const loadTest = (url) => {
    getData(`${pokemonApiUrl}`).then(async (data) => {
        const { results } = await data;
        for (const pokemon of results) {
            console.log(pokemon.name);
        }
    });
};

// loadTest(pokemonApiUrl, 'ditto');
