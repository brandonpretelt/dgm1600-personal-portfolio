// TODO: Remove capitalize funtion

class Pokemon {
    constructor(name, id, abilities, stats, sprites) {
        (this.id = id),
            (this.name = name),
            (this.abilities = abilities),
            (this.stats = stats),
            (this.sprites = sprites);
    }
    pokemonParty = function () {
        console.log(this.name);
    };
}

const pokemonGenerations = {
    gen1: 151,
    gen2: 251,
    gen3: 386,
    gen4: 493,
    gen5: 649,
    gen6: 721,
    gen7: 809,
    gen8: 898
};

const getData = (url) => {
    try {
        return fetch(url).then((res) => res.json());
    } catch (e) {
        console.log(e, ' error message of sorts');
    }
};

const createArray = (str) => {
    const newArr = str.split(',');
    return newArr.map((abilityName) => {
        return {
            ability: {
                name: abilityName
            }
        };
    });
};

const getRandomId = (id) => {
    // TODO: added function so user can select different gen pokemon
    return Math.floor(Math.random() * id) + 1;
};

const saveToStorage = (pokemon, modal) => {
    let capturedPokemon;
    if (localStorage.getItem('capturedPokemon') === null) {
        capturedPokemon = [];
    } else {
        capturedPokemon = JSON.parse(localStorage.getItem('capturedPokemon'));
        if (capturedPokemon.includes(pokemon)) {
            console.log('Already caught this pokemon');
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
        console.log('some placeholder');
    }
};

const loadFromStorage = (func) => {
    func = func || undefined;
    let pokemonData;
    if (func === undefined) {
        if (localStorage.getItem('capturedPokemon') !== null) {
            pokemonData = JSON.parse(localStorage.getItem('capturedPokemon'));
        }
        return pokemonData;
    } else {
        if (localStorage.getItem('capturedPokemon') !== null) {
            pokemonData = JSON.parse(localStorage.getItem('capturedPokemon'));
            pokemonData.forEach((pokemon) => {
                func(pokemon);
            });
        } else {
            pokemonData = [];
        }
    }
};

const getPokemonId = (offset) => {
    return Math.floor(Math.random() * offset);
};

const getEncounters = (url, pokemon) => {
    getData(`${url}${pokemon}`).then(async (data) => {
        const area = await data.location_area_encounters;
        return area;
    });
};

const populateCardFront = (pokemon) => {
    const cardFront = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardCaption = document.createElement('span');

    const pokemonName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    cardFront.className = 'card_face front';

    console.log(pokemon);
    if (pokemon.id >= 9001) {
        cardImg.src = `https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/f918199f90b468c.png`;
    }
    cardImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    cardCaption.textContent = `${pokemon.id} ${pokemonName}`;
    cardFront.append(cardImg, cardCaption);
    return cardFront;
};

const populateCardBack = (pokemon) => {
    const cardBack = document.createElement('div');
    const label = document.createElement('h4');
    const statList = document.createElement('ul');

    cardBack.className = 'card_face back';
    label.textContent = 'Stats';

    pokemon.stats.filter((stat) => {
        if (stat.stat.name === 'hp') {
            let statItem = document.createElement('li');

            statItem.textContent = `${stat.stat.name.toUpperCase()}: ${
                stat.base_stat
            }`;

            statList.append(statItem);
        }
        if (stat.stat.name === 'attack' || stat.stat.name === 'defense') {
            let statItem = document.createElement('li');

            statItem.textContent = `${
                stat.stat.name[0].toUpperCase() + stat.stat.name.slice(1)
            }: ${stat.base_stat}`;

            statList.append(statItem);
        }
    });

    cardBack.append(label, statList);
    return cardBack;
};

const removeChildren = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

const removeOnFocus = () => {
    document.querySelector('#searchPokemon').addEventListener('focus', () => {
        document.querySelector('#searchPokemon').value = '';
        // removeChildren(container);
    });
};
const removeOnBlur = () => {
    document.querySelector('#searchPokemon').addEventListener('blur', () => {
        document.querySelector('#searchPokemon').value = '';
    });
};

export {
    getData,
    getPokemonId,
    getEncounters,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    pokemonGenerations,
    removeOnFocus,
    removeOnBlur,
    saveToStorage,
    loadFromStorage,
    getRandomId
};
