import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';

const searchInput = document.querySelector('#search-input');

// senators.forEach((senator) => console.log(senator));
const members = [...senators, ...representatives];

const republicans = members.filter((member) => {
    if (member.party === 'R') {
        return member;
    }
});

const democrats = members.filter((member) => {
    if (member.party === 'D') {
        return member;
    }
});

const searchParty = () => {
    return;
};

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    const render = (member) => {
        const main = document.querySelector('main');
        // const congressCard = document.createElement('div');
        // const congressCardHeading = document.createElement('div');
        // const congressCardH1 = document.createElement('h1');
        // const congressCardInfo = document.createElement('div');
        // const congressCardText = document.createElement('div');
        // const congressCardH3 = document.createElement('h3');
        // const congressCard = document.querySelector('.congress-card');
        // const congressCardHeading = document.querySelector(
        //     '.congress-card-heading'
        // );
        const congressCardH1 = document.querySelector(
            '.congress-card-heading h1'
        );
        // const congressCardInfo = document.querySelector('.congress-card-info');
        // const congressCardText = document.querySelector(
        //     '.congress-card-info .congress-card.text'
        // );
        const congressCardH3 = document.querySelector('.congress-card-text h3');

        congressCardH3.innerHTML = `${member.party}`;
        congressCardH1.innerHTML = `${member.first_name} ${member.last_name}`;

        // Congress Card Text, Info and h3
        // congressCardText.append(congressCardH3);
        // congressCardInfo.append(congressCardText);
        // Congress Card heading
        // congressCardHeading.append(congressCardH1);
        // congressCard.append(congressCardHeading, congressCardInfo);

        // main & congresscard

        // main.append(congressCard);
        // main.innerHTML += `${congressCard}`;
        // main.innerHTML += `
        // <div class="congress-card">
        //     <div class="congress-card-heading">
        //         <h1>${member.first_name} ${member.last_name}</h1>
        //     </div>
        //     <div class="congress-card-info">
        //         <div class="congress-card-text">
        //             <h3 class="congress-party">${member.party}</h3>
        //         </div>

        //     </div>
        // </div>

        // `;
    };
    // render(members.first_name);
    let userText = searchInput.value.toLowerCase();
    let memberFirstName;
    let memberLastName;
    let memberFullName;
    if (!userText !== '') {
        members.forEach((member) => {
            memberFirstName = member.first_name.toLowerCase();
            memberLastName = member.last_name.toLowerCase();
            memberFullName = `${memberFirstName} ${memberLastName}`;
            if (
                memberFirstName === userText ||
                memberLastName === userText ||
                memberFullName === userText
            ) {
                render(member);
                console.log(member);
            }
        });
    }
    userText = '';
});

// console.log(republicans);
// console.log(democrats);

// const allChambers = () => {};

// const fullName = () => {
//     const name = members.map((member) => {
//         let memFullName = !member.middle_name
//             ? `${member.first_name} ${member.last_name}`
//             : `${member.first_name} ${member.middle_name} ${member.last_name}`;
//         return memFullName;
//     });
//     return name;
// };

// const render = (member) => {
//     const main = document.querySelector('main');
//     main.innerHTML = `
//         <div class="card">
//             <div class="card-heading">
//                 <h1>${member.first_name}</h1>
//             </div>
//             <div class="card-info">
//                 <figure class="card-img">
//                     <img src="">
//                 </figure>
//                 <div class="card-text">
//                 </div>
//             </div>
//         </div>
//         `;
// };

// render(members.first_name);

// console.log(members.forEach((member) => console.log(member.first_name)));

// congressInfo(senators);

// searchInput.addEventListener('keyup', (e) => {
//     console.log(congressInfo(e.target.value));
// });
