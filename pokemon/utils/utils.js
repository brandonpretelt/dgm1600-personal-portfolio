class Pokemon {
    constructor(name, height, weight, abilities) {
        (this.id = 9001),
            (this.name = name),
            (this.height = height),
            (this.weight = weight),
            (this.abilities = abilities);
    }
}

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

const capitalizeFirstLetter = (letterToCap) => {
    return letterToCap[0].toUpperCase() + letterToCap.slice(1);
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

    const pokemonName = capitalizeFirstLetter(pokemon.name);
    // const pokemonName =
    //     pokemon.name[0] === pokemon.name[0].toUpperCase()
    //         ? console.log('yes')
    //         : pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    cardFront.className = 'card_face front';
    cardImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
    cardCaption.textContent = `${pokemon.id} ${pokemonName}`;
    cardFront.append(cardImg, cardCaption);
    return cardFront;
};

const populateCardBack = (pokemon) => {
    const cardBack = document.createElement('div');
    const label = document.createElement('h4');
    const abilityList = document.createElement('ul');
    label.textContent = 'Abilities';
    if (pokemon.abilities.length <= 3) {
        pokemon.abilities.forEach((ability) => {
            let abilityItem = document.createElement('li');
            abilityItem.textContent =
                ability.ability.name[0].toUpperCase() +
                ability.ability.name.slice(1);
            // abilityItem.textContent = capitalizeFirstLetter(
            //     ability.ability.name
            // );
            cardBack.className = 'card_face back';
            abilityList.appendChild(abilityItem);
        });
    } else {
        pokemon.abilities.forEach((ability) => {
            let abilityItem = document.createElement('li');
            abilityItem.textContent =
                ability.ability.name[0].toUpperCase() +
                ability.ability.name.slice(1);
            // abilityItem.textContent = capitalizeFirstLetter(
            //     ability.ability.name
            // );
            cardBack.className = 'card_face back too-big';
            abilityList.appendChild(abilityItem);
        });
    }
    cardBack.append(label, abilityList);
    return cardBack;
};

const removeChildren = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
};

// console.log(getEncounters(getPokemonId(151)));

export {
    getData,
    getPokemonId,
    getEncounters,
    populateCardFront,
    populateCardBack,
    removeChildren,
    Pokemon,
    createArray
    // capitalizeFirstLetter
};
