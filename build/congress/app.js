import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';

const searchInput = document.querySelector('#search-input');
document.querySelector('.congress-card').className = 'hide';
// senators.forEach((senator) => console.log(senator));
const members = [...senators, ...representatives];

const simpleCongress = members.map((member) => {
    const fullName = !member.middle_name
        ? `${member.first_name} ${member.last_name}`
        : `${member.first_name} ${member.middle_name} ${member.last_name}`;
    return {
        firstName: member.first_name,
        lastName: member.last_name,
        fullName,
        party: member.party,
        chamber: member.title,
        short_chamber: member.short_title,
        id: member.govtrack_id
    };
});

// simpleCongress.forEach((member) => {
//     console.log(member.fullName);
// });

const getChamber = (chamber) => {
    const membersOfCongress = simpleCongress.filter((congress) => {
        if (congress.short_chamber.includes(chamber)) {
            return congress;
        }
    });
    return membersOfCongress;
};

const getParty = (party) => {
    const membersOfCongress = simpleCongress.filter((congress) => {
        if (congress.party.includes(party)) {
            return congress;
        }
    });
    return membersOfCongress;
};

console.log(getChamber('Sen'));
console.log(getParty('D'));
// console.log(simpleCongress);
// const senate = members.filter((member) =>
//     member.short_title.includes('Sen') ? member : false
// );
// const house = members.filter((member) =>
//     member.short_title.includes('Rep') ? member : false
// );

// console.log(senate);

//const getCongress = (congress) => {
// const senate = members.filter((member) => {
//     let senators = {};
//     if (member.short_title.includes('Sen')) {
//         const firstName = member.first_name;
//         const middleName = member.middle_name;
//         const lastName = member.last_name;
//         const fullName = !middleName
//             ? `${firstName} ${lastName}`
//             : `${firstName} ${middleName} ${lastName}`;
//     }
// });

// const house = members.filter((member) => {
//     if (member.short_title.includes('Rep')) {
//         return member;
//     }
// });

// console.log(senate.firstName);
// console.log(house);
// const filterHouse = (chamberHouse) => {
//     console.log(chamberHouse);
// };
// const congress = members.map((member) => {
//     return {
//         party: member.party
//     };
// });
// };

// getCongress();

// console.log(congress);

// const republicans = members.map((member) => {
//     if (member.party === 'R') {
//         return member.party;
//     }
// });

// console.log(republicans);

// const democrats = members.filter((member) => {
//     if (member.party === 'D') {
//         return member;
//     }
// });

const searchParty = () => {
    return;
};

document.querySelector('button').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('.congress-card').classList.remove('hide');
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
        congressCardH1.innerHTML = `${member.fullName}`;
        // congressCardH1.innerHTML = `${member.first_name} ${member.last_name}`;

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
        simpleCongress.forEach((member) => {
            // console.log(member);
            memberFirstName = member.firstName.toLowerCase();
            memberLastName = member.lastName.toLowerCase();
            memberFullName = member.fullName.toLowerCase();
            // let firstName = firstName.toLowerCase();
            // let lastName = member.lastName.toLowerCase();
            // let fullName = member.fullName.toLowerCase();
            if (
                memberFirstName === userText ||
                memberLastName === userText ||
                memberFullName === userText
            ) {
                render(member);
                console.log(member);
            }
        });
        // members.forEach((member) => {
        //     memberFirstName = member.first_name.toLowerCase();
        //     memberLastName = member.last_name.toLowerCase();
        //     memberFullName = `${memberFirstName} ${memberLastName}`;
        //     if (
        //         memberFirstName === userText ||
        //         memberLastName === userText ||
        //         memberFullName === userText
        //     ) {
        //         render(member);
        //         console.log(member);
        //     }
        // });
        searchInput.value = '';
    }
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
