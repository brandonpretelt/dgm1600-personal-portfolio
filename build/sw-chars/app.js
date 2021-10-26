import { people } from '../data/people.js';

const createElements = (theElement) => {
    const container = document.createElement(theElement);

    return container;
};

const app = (data) => {
    const rootApp = document.querySelector('#App');
    const container = document.createElement('div');
    const mainHeader = document.createElement('header');
    const mainHeaderHeading = document.createElement('h1');

    let homeworlds = [];
    data.forEach((person) => {
        const headerElement = document.createElement('header');
        const h1Element = document.createElement('h1');
        const divElement = document.createElement('div');
        const divInfoElement = document.createElement('div');
        const pInfoElement = document.createElement('p');
        const imgElement = document.createElement('img');
        homeworlds.push({ world_url: person.homeworld });

        divElement.classList.add('card');
        headerElement.classList.add('card-title');
        divInfoElement.classList.add('card-content');
        h1Element.innerHTML = person.name;
        pInfoElement.innerHTML = `${person.name} was born on ${person.birth_year}.`;
        pInfoElement.innerHTML = `${person.homeworld}`;
        let id;
        id = person.url.slice(person.url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            newId = newId.slice(1);
        } else {
            newId = id.slice(0, -1);
        }
        imgElement.src = `https://starwars-visualguide.com/assets/img/characters/${newId}.jpg`;

        headerElement.append(h1Element);
        divElement.append(headerElement);
        divElement.append(imgElement);
        divElement.append(divInfoElement);
        divInfoElement.append(pInfoElement);
        container.append(divElement);
    });

    let world_ids = [];
    let url;
    homeworlds.forEach((world) => {
        const id = world.world_url.slice(world.world_url.length - 3);
        let newId = id.slice(0, -1);
        if (newId[0] === '/') {
            newId = newId.slice(1);
        } else {
            newId = id.slice(0, -1);
        }
        world_ids.push(newId);

        // console.log(world.world_url.length);
        if (world.world_url.length === 32) {
            url = world.world_url.slice(0, world.world_url.length - 3);
        } else {
            url = world.world_url.slice(0, world.world_url.length - 2);
        }
        console.log(url);
        // world_ids.push({
        //     homeworld_url: `${url}`,
        //     homeworld_id: parseInt(newId)
        // });
    });
    console.log(url, 'outside the loop');
    console.log(world_ids);

    /*
 TODO:  create an object with world_ids and characters/residents
 */

    world_ids.sort((a, b) => a - b);
    let worlds = [...new Set(world_ids)]; // create set to filter into unique values
    // console.log(worlds.sort((a, b) => a - b));
    const worldResidents = Object.assign({}, worlds);
    // console.log(worldResidents);
    const newWorld = [];
    for (let id in worldResidents) {
        newWorld.push(`${url}${parseInt(id)}`);
    }
    console.log(newWorld);
    let homeworldFinder = [];
    homeworldFinder = people.find((person) => {
        if (person.homeworld.includes(newWorld)) {
            return true;
        } else {
            return false;
        }
    });

    console.log(homeworldFinder);

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
        // // console.log(planet_data.results.residents[0]);
        let planetPeople = [];
        people.forEach((person) => {
            planetPeople.push({
                name: person.name,
                url: person.url,
                homeworld: person.homeworld
            });
        });
        let planetsResidents = [];
        // // console.log(planetPeople);

        // // console.log(planetsResidents);
        // // console.log(planet_data.results);
        const { results } = planet_data;
        // console.log(results);
        const residents = results.filter((x) => {
            if (x.url.includes(planetPeople.homeworld)) {
                // console.log('hlelo thre');
            }
            // if (x.residents.includes('1')) return x.residents;
            // if (x.residents.includes(1)) {
            //     // console.log('Use the force, Luke!');
            // }
        });
        // // console.log(residents);
        // // console.log(planetPeople, ' I am planet people');
        // const { residents } = planet_data.results[];
        // residents.forEach((resident) => {
        //     // console.log(resident);
        // });
        // // console.log(residents, ' i am residents');
        // if (residents[0].includes(11)) {
        //     // console.log('hi');
        // }
        // // console.log(planet_data.results[0].residents);
        // const tatooineResidents = residents.filter((x) => {
        //     if (x.includes(planetPeople[0])) {
        //         // console.log('hi');
        //     }
        // });
        // // console.log(tatooineResidents);
    };

    // loadPlanetData().catch((e) => {
    //     // console.log(e);
    // });
 *
 */
