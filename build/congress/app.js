import { senators } from '../data/senators.js';
import { representatives } from '../data/representatives.js';

// ~~ TODO: Erase commented out code
// ~~ TODO: Look for an idea for reduce function... mine ain't working :P

// generic utils
import { addListeners } from '../utils/utils.js';

// congress specific utilities
import { PolicticalParty, render } from './congress-utils/utils.js';

const searchInput = document.querySelector('#search-input');
const modal = document.querySelector('.modal');
const members = [...senators, ...representatives];
const partyVoteBox = document.querySelector('.party-vote');
const ul = document.createElement('ul');

searchInput.value = '';

addListeners(searchInput, 'focus', () => {
    searchInput.value = '';
});

addListeners(searchInput, 'blur', () => {
    searchInput.value = '';
});

function openModal() {
    modal.classList.add('is-active');
}
function closeModal() {
    modal.classList.remove('is-active');
}

addListeners(document, 'click', (e) => {
    if (e.target.className === 'modal-close is-large') {
        modal.classList.remove('is-active');
    }
});

addListeners(document, 'click', (e) => {
    if (e.target.id === 'modal-open') {
        openModal();
    }
});

addListeners(document.querySelector('form'), 'submit', (e) => {
    e.preventDefault();
});

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
        partyVote: member.votes_with_party_pct,
        fullURL
    };
});

const partyVotePercent = simpleCongress.reduce((acc, memberOfCongress) => {
    if (memberOfCongress.partyVote === 100) {
        acc.push(memberOfCongress);
    }
    return acc;
}, []);

partyVotePercent.forEach((member) => {
    ul.innerHTML += `<li>${member.fullName}</li>`;
    partyVoteBox.append(ul);
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
});
