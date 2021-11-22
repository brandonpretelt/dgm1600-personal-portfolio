import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';
import { PolicticalParty } from '../utils/utils.js';

const searchInput = document.querySelector('#search-input');
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
});

// document.querySelector('.container main').style.display = 'flex';

const members = [...senators, ...representatives];

const simpleCongress = members.map((member) => {
    const fullURL = `https://www.govtrack.us/static/legislator-photos/${member.govtrack_id}-100px.jpeg`;

    const congressParty = member.party;

    const party = !PolicticalParty[congressParty]
        ? undefined
        : PolicticalParty[congressParty];

    const chamber = member.title,
        short_chamber = member.short_title;

    const id = member.govtrack_id;
    const facebook = !member.facebook_account ? '' : member.facebook_account;
    // const facebook = member.facebook_account;

    const firstName = member.first_name,
        middleName = member.middle_name,
        lastName = member.last_name;

    const fullName = !middleName
        ? `${firstName} ${lastName}`
        : `${firstName} ${middleName} ${lastName}`;

    return {
        firstName,
        lastName,
        middleName,
        fullName,
        party,
        facebook,
        chamber,
        short_chamber,
        id,
        fullURL
    };
});

// document.querySelector('button').addEventListener('click', (e) => {
//     e.preventDefault();

//     // document.querySelector('.congress-card').classList.remove('hide');
//     const render = (member) => {
//         const cardContainer = document.querySelector('.card-container');
//         while (cardContainer.firstChild) {
//             cardContainer.removeChild(cardContainer.firstChild);
//         }

//         cardContainer.innerHTML += `
//         <div class="congress-card">
//         <div class="card-info">
//         <figure class="card-img">
//             <img src="${member.fullURL}">
//         </figure>

//     </div>
//         <div class="congress-card-heading">
//             <h1>${member.fullName}</h1>
//         </div>
//         <div class="congress-card-info">
//             <div class="congress-card-text">
//                 <h3 class="congress-party">${member.party}</h3>
//                 <h3>${member.chamber}</h3>
//             </div>

//         </div>
//         </div>
//         `;
//     };

//     let userText = searchInput.value.toLowerCase();
//     let memberFirstName;
//     let memberLastName;
//     let memberFullName;
//     if (!userText !== '') {
//         simpleCongress.forEach((member) => {
//             memberFirstName = member.firstName.toLowerCase();
//             memberLastName = member.lastName.toLowerCase();
//             memberFullName = member.fullName.toLowerCase();
//             if (
//                 memberFirstName === userText ||
//                 memberLastName === userText ||
//                 memberFullName === userText
//             ) {
//                 render(member);
//                 console.log(member);
//             }
//         });
//         // members.forEach((member) => {
//         //     memberFirstName = member.first_name.toLowerCase();
//         //     memberLastName = member.last_name.toLowerCase();
//         //     memberFullName = `${memberFirstName} ${memberLastName}`;
//         //     if (
//         //         memberFirstName === userText ||
//         //         memberLastName === userText ||
//         //         memberFullName === userText
//         //     ) {
//         //         render(member);
//         //         console.log(member);
//         //     }
//         // });
//         searchInput.value = '';
//     }

//     const congressParty = document.querySelector('.congress-party');
//     switch (congressParty.innerHTML) {
//         case 'Republican':
//             congressParty.classList.add('republican');
//             break;
//         case 'Democrat':
//             congressParty.classList.add('democrat');
//             break;
//         default:
//             congressParty.classList.add('independent');
//     }
// });

const render = (member) => {
    const cardContainer = document.querySelector('.card-container');
    while (cardContainer.firstChild) {
        cardContainer.removeChild(cardContainer.firstChild);
    }

    cardContainer.innerHTML = `
        <div class="congress-card">
            <div class="card-info">
                <figure class="card-img">
                    <img src="${member.fullURL}">
                </figure>

            </div>
            <div class="congress-card-heading">
                <h1>${member.fullName}</h1>
            </div>
            <div class="congress-card-info">
                <div class="congress-card-text">
                    <h3 class="congress-party">${member.party}</h3>
                    <h3>${member.chamber}</h3>
                    <a href="https://facebook.com/${member.facebook}" target="_blank">${member.facebook}</a>
                
                </div>

            </div>
        </div>
    `;
    {
        /* <a href="https://facebook.com/${member.facebook}" target="_blank">${member.facebook}</a> */
    }
    const congressParty = document.querySelector('.congress-party');
    switch (congressParty.innerHTML) {
        case 'Republican':
            congressParty.classList.add('republican');
            break;
        case 'Democrat':
            congressParty.classList.add('democrat');
            break;
        default:
            congressParty.classList.add('independent');
    }
};

searchInput.addEventListener('keyup', (e) => {
    const cardContainer = document.querySelector('.card-container');

    let userText = e.target.value.toLowerCase();
    let memberFirstName;
    let memberLastName;
    let memberFullName;
    if (!userText !== '') {
        simpleCongress.forEach((member) => {
            memberFirstName = member.firstName.toLowerCase();
            memberLastName = member.lastName.toLowerCase();
            memberFullName = member.fullName.toLowerCase();
            if (
                memberFirstName === userText ||
                memberLastName === userText ||
                memberFullName === userText
            ) {
                render(member);
            }
        });
    }

    if (userText === '') {
        cardContainer.innerHTML = '';
    }
});
