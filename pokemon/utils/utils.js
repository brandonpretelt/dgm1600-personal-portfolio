const getData = (url) => {
    try {
        return fetch(url).then((res) => res.json());
    } catch (e) {
        console.log(e, ' error message of sorts');
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

// console.log(getEncounters(getPokemonId(151)));

export { getData, getPokemonId, getEncounters };
