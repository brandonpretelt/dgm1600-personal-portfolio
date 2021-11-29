import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';

// generic utils
// TODO: Rewrite to make more generic
import { addListeners, renderDOM } from '../utils/utils.js';

// congres specific utilities
import {
    congressCard,
    PolicticalParty,
    render
} from './congress-utils/utils.js';

const searchInput = document.querySelector('#search-input');
const btns = document.querySelectorAll('button');
const navBtn = document.querySelector('nav a:not(.links-container a)');
const representativesContainer = document.getElementById('representatives');
const members = [...senators, ...representatives];

searchInput.value = '';

addListeners(document.querySelector('form'), 'submit', (e) => {
    e.preventDefault();
});

// addListeners(navBtn, 'click', (e) => {
//     const icon = document.querySelector('.material-icons');
//     const politicianNav = document.querySelector('.politicians-nav-list');
//     if (icon.textContent === 'apps') {
//         icon.textContent = 'close';
//     } else {
//         icon.textContent = 'apps';
//     }
//     icon.classList.toggle('active');
//     politicianNav.classList.toggle('hide');
// });

// let socialMedia;

// const getSocials = (arr) => {
//     const socials = arr.reduce((acc, member) => {
//         const socialMedia = {
//             name: !member.middle_name
//                 ? `${member.first_name} ${member.last_name}`
//                 : `${member.first_name} ${member.middle_name} ${member.last_name}`,
//             youtube: !member.youtube_account ? '' : member.youtube_account,
//             facebook: !member.facebook_account ? '' : member.facebook_account,
//             twitter: !member.twitter_account ? '' : member.twitter_account
//         };
//         acc.push(socialMedia);
//         return acc;
//     }, []);
//     return socials;
// };

// socialMedia = [...getSocials(members)];

// console.log(socialMedia);

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
    const twitter = !member.twitter_account ? null : member.twitter_account;
    const youtube = !member.youtube_account ? null : member.youtube_account;

    // const socialMedia = member.forEach((m) => console.log(m));
    // const socialMedia = getSocials(this);
    // console.log(socialMedia);
    const socialMedia = {
        facebook,
        twitter,
        youtube
    };

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
        socialMedia,
        party,
        facebook,
        twitter,
        youtube,
        chamber,
        short_chamber,
        id,
        fullURL
    };
});

// simpleCongress.forEach((member) => console.log(member.socialMedia.facebook));

// console.log(simpleCongress);
// console.log(getSocials(simpleCongress));

// for (let i = 0; i < getSocials(simpleCongress).length; i += 1) {
//     const youtube = getSocials(simpleCongress)[i].youtube;
//     const facebook = getSocials(simpleCongress)[i].facebook;
//     const twitter = getSocials(simpleCongress)[i].twitter;
//     console.log(
//         `${
//             getSocials(simpleCongress)[i].name
//         } has these accounts \nYoutube: ${youtube}\n Facebook: ${facebook}\n Twitter: ${twitter}`
//     );
// }

const getChamber = (shortChamber) => {
    const cardContainer = document.querySelector('.card-container');
    if (shortChamber === 'All') {
        simpleCongress.forEach((member) => console.log(member));
    }

    if (shortChamber === 'Sen.') {
        const senators = simpleCongress.filter((member) =>
            member.short_chamber === 'Sen.'
                ? congressCard(member, cardContainer)
                : null
        );
    }

    if (shortChamber === 'Rep.') {
        const reps = simpleCongress.filter(
            (member) => {
                if (member.short_chamber === 'Rep.') {
                    congressCard(member, cardContainer);
                    //congressCard(member, representativesContainer);
                    //renderDOM(member, representativesContainer, member.fullURL);
                }
            }
            // member.short_chamber === 'Rep.' ? member.fullName : null
        );
        console.log(reps);
    }
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
                console.log(member);
                render(member, cardContainer);
            }
        });
    }
});
