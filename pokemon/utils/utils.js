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

const sortStringArrAscending = (arr) => {
    return arr.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        // if (b.name > a.name) {
        //     return 1;
        // }
        return 0;
    });
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
    // const addToMainParty = document.createElement('button');

    cardBack.className = 'card_face back';
    label.textContent = 'Stats';

    // addToMainParty.style.width = '100px';
    // addToMainParty.textContent = 'add to main party';
    // addToMainParty.className = 'addToMainParty';

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

export {
    getData,
    getPokemonId,
    getEncounters,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    createArray,
    sortStringArrAscending
};
