const PolicticalParty = {
    D: 'Democrat',
    R: 'Republican',
    ID: 'Independent'
};

const congressCard = (member, container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const card = document.createElement('div');
    card.className = 'congress-card';

    const cardInfo = document.createElement('div');
    cardInfo.className = 'card-info';

    const figure = document.createElement('figure');
    figure.className = 'card-img';
    cardInfo.append(figure);

    const img = document.createElement('img');
    img.src = `${member.fullURL}`;
    figure.append(img);

    const congressCardHeading = document.createElement('div');
    congressCardHeading.className = 'congress-card-heading';

    const congressH1 = document.createElement('h1');
    congressH1.textContent = `${member.fullName}`;
    congressCardHeading.append(congressH1);

    const congressInfo = document.createElement('div');
    congressInfo.className = 'congress-card-info';

    const congressText = document.createElement('div');
    congressText.className = 'congress-card-text';
    congressInfo.append(congressText);

    const congressH3 = document.createElement('h3');
    const congressH3Chamber = document.createElement('h3');
    congressH3.className = 'congress-party';
    congressH3.textContent = `${member.party}`;
    congressH3Chamber.textContent = `${member.chamber}`;
    congressText.append(congressH3, congressH3Chamber);

    const congressFacebook = document.createElement('a');
    congressFacebook.href = `https://facebook.com/${member.facebook}`;
    congressFacebook.setAttribute('target', '_blank');
    congressFacebook.textContent = `${member.firstName}'s Facebook`;

    if (member.facebook !== null) {
        congressText.append(congressFacebook);
    }
    card.append(cardInfo, congressCardHeading, congressInfo);
    container.append(card);
};

const render = (member, container) => {
    // container = document.querySelector('.card-container');
    // const cardContainer = document.querySelector('.card-container');
    // console.log(member.short_chamber);
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.innerHTML = `
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

export { congressCard, PolicticalParty, render };
