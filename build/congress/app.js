import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';
import { PolicticalParty, addListeners } from '../utils/utils.js';

const searchInput = document.querySelector('#search-input');
const btns = document.querySelectorAll('button');

addListeners(document.querySelector('form'), 'submit', (e) => {
    e.preventDefault();
});

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
    const facebook = !member.facebook_account ? null : member.facebook_account;
    // const facebook = member.facebook_account;

    const firstName = member.first_name,
        middleName = member.middle_name,
        lastName = member.last_name;

    const fullName = !middleName
        ? `${firstName} ${lastName}`
        : `${firstName} ${middleName} ${lastName}`;

    // console.log(facebook);

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

const render = (member, container) => {
    // container = document.querySelector('.card-container');
    // const cardContainer = document.querySelector('.card-container');
    // console.log(member.short_chamber);
    // while (container.firstChild) {
    //     container.removeChild(container.firstChild);
    // }

    container.innerHTML += `
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
                    
                    ${
                        // conditionally add in HTML block
                        member.facebook === null
                            ? ''
                            : `<hr> <a href="https://facebook.com/${member.facebook}" target="_blank">${member.facebook}</a>`
                    }
                    
                
                </div>

            </div>
        </div>
    `;

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

const getChamber = (shortChamber) => {
    const cardContainer = document.querySelector('.card-container');
    if (shortChamber === 'All') {
        simpleCongress.forEach((member) => console.log(member));
    }

    if (shortChamber === 'Sen.') {
        const senators = simpleCongress.filter((member) =>
            member.short_chamber === 'Sen.' ? member : null
        );
        console.log(senators);
    }

    if (shortChamber === 'Rep.') {
        const reps = simpleCongress.filter(
            (member) => {
                if (member.short_chamber === 'Rep.') {
                    render(member, cardContainer);
                }
            }
            // member.short_chamber === 'Rep.' ? member.fullName : null
        );
        console.log(reps);
    }

    //(shortChamber === 'members') ?
    //simpleCongress.forEach((member) => console.log(member[shortChamber]));
};
// document.querySelector('.container main').style.display = 'flex';

btns.forEach((btn) => {
    addListeners(btn, 'click', (e) => {
        // console.log(e.target.className);
        if (e.target.className === 'btn btn-senators') {
            getChamber('Sen.');
        }
        if (e.target.className === 'btn btn-reps') {
            getChamber('Rep.');
        } else if (e.target.className === 'btn btn-congress') {
            getChamber('All');
        }
        // if (e.target.classList.contains('btn-congress')) {
        //     renderAllCongress();
        // }
        // if (e.target.classList.contains('btn-senators')) {
        //     renderAllCongress('Sen.');
        // }
        // if (e.target.classList.contains('btn-reps')) {
        //     renderAllCongress('Rep.');
        // }
    });
});

addListeners(searchInput, 'keyup', (e) => {
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
                render(member, cardContainer);
            }
        });
    }

    if (userText === '') {
        cardContainer.innerHTML = '';
    }
});
