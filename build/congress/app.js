import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';

const searchInput = document.querySelector('#search-input');

// senators.forEach((senator) => console.log(senator));
const members = [...senators, ...representatives];

// console.log(members.forEach((member) => console.log(member.first_name)));

const congressInfo = (member) =>
    members.map((member) => {
        let memFullName = !member.middle_name
            ? `${member.first_name} ${member.last_name}`
            : `${member.first_name} ${member.middle_name} ${member.last_name}`;
        return memFullName;
    });

searchInput.addEventListener('change', (e) => {
    console.log(congressInfo(e.target.value));
});
