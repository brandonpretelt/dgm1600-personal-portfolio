import { people } from '../data/people.js';

const createElements = (theElement) => {
    const container = document.createElement(theElement);

    return container;
};

const app = (data) => {
    const rootApp = document.getElementById('App');
    const container = createElements('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');
    createElements('div', 'header', 'h1');
    let homeworlds = [];
    data.forEach((person) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const divInfoElement = document.createElement('div');
        const pInfoElement = document.createElement('p');
        const imgElement = document.createElement('img');
        homeworlds.push({ world_url: person.homeworld });
        //      const newWorlds = homeworlds.sort();
        //        console.log(newWorlds, ': sorted?');

        // const homeworldsSort = homeworlds.sort((a, b) => {
        //     console.log(a.slice(0, -1) - b.slice(0, -1));
        // });
        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divInfoElement.classList.add('card-content');
        h1Element.textContent = person.name;
        pInfoElement.textContent = `${person.name} was born on ${person.birth_year}.`;
        let id;
        id = person.url.slice(person.url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            newId = newId.slice(1);
        } else {
            newId = id.slice(0, -1);
        }
        console.log(newId, ': for the imgs');
        imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${newId}.jpg`;
        // if (person.url.length - 2 > 1) {
        //     id = person.url.slice(person.url.length - 3);
        //     let newId = id.slice(0, -1);
        //     imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${newId}.jpg`;
        // }

        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divElement.append(divInfoElement);
        divInfoElement.append(pInfoElement);
        container.append(divElement);
    });

    const world_ids = [];
    homeworlds.forEach((world) => {
        const id = world.world_url.slice(world.world_url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            newId = newId.slice(1);
        } else {
            newId = id.slice(0, -1);
        }
        world_ids.push(newId);

        // if (world.world_url.length - 2 > 1) {
        //     console.log(world.world_url.substring(world.world_url.length - 3));
        // }
    });
    // world_ids.sort((a, b) => a - b);
    let worlds = [...new Set(world_ids)];
    console.log(worlds.sort((a, b) => a - b));
    const worldResidents = Object.assign({}, worlds);
    console.log(worldResidents);

    mainHeaderHeading.textContent = 'Star Wars Characters';
    mainHeader.classList.add('main-heading');
    mainHeader.append(mainHeaderHeading);
    container.classList.add('container');

    rootApp.append(mainHeader, container);
};

app(people);

/**
 * 
 *     const loadPlanetData = async () => {
        const res = await fetch('https://swapi.dev/api/planets');
        const planet_data = await res.json();
        // planet_data.results.forEach((planet) => {
        //     planet.filter((x) => {
        //         if (x.name === 'Tatootine') {
        //             return x.name;
        //         }
        //     });
        // });
        // console.log(planet_data.results.residents[0]);
        let planetPeople = [];
        people.forEach((person) => {
            planetPeople.push({
                name: person.name,
                url: person.url,
                homeworld: person.homeworld
            });
        });
        let planetsResidents = [];
        // console.log(planetPeople);

        // console.log(planetsResidents);
        // console.log(planet_data.results);
        const { results } = planet_data;
        console.log(results);
        const residents = results.filter((x) => {
            if (x.url.includes(planetPeople.homeworld)) {
                console.log('hlelo thre');
            }
            // if (x.residents.includes('1')) return x.residents;
            // if (x.residents.includes(1)) {
            //     console.log('Use the force, Luke!');
            // }
        });
        // console.log(residents);
        // console.log(planetPeople, ' I am planet people');
        // const { residents } = planet_data.results[];
        // residents.forEach((resident) => {
        //     console.log(resident);
        // });
        // console.log(residents, ' i am residents');
        // if (residents[0].includes(11)) {
        //     console.log('hi');
        // }
        // console.log(planet_data.results[0].residents);
        // const tatooineResidents = residents.filter((x) => {
        //     if (x.includes(planetPeople[0])) {
        //         console.log('hi');
        //     }
        // });
        // console.log(tatooineResidents);
    };

    // loadPlanetData().catch((e) => {
    //     console.log(e);
    // });
 * 
 */
