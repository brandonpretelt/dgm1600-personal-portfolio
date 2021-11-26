const PolicticalParty = {
    D: 'Democrat',
    R: 'Republican',
    ID: 'Independent'
};

const grabLast = (item, length) => {
    return item.url.slice(item.url.length - length);
};

const isolateID = (item) => {
    let id;
    id = grabLast(item, 3);
    let newId = id.slice(0, -1);
    if (newId[0] === '/') {
        return (newId = newId.slice(1));
    }
    return newId;
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

const renderDOM = (arr, container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    arr.forEach((arr_item) => {
        container.innerHTML += `
            <div class="card">
                <div class="card-profile">
                    <h1 class="card-title">${arr_item.name}</h1>
                    <div class="card-pfp">
                        <img src="https://starwars-visualguide.com/assets/img/characters/${isolateID(
                            arr_item
                        )}.jpg">
                    </div>
                </div>
            </div>
        `;
    });
};

const addListeners = (listenOn, typeOfListener, cb) => {
    return listenOn.addEventListener(typeOfListener, cb);
};

const sortStringArr = (arr) => {
    return arr.sort((a, b) => {
        if (a > b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });
};

export {
    grabLast,
    isolateID,
    renderDOM,
    addListeners,
    sortStringArr,
    PolicticalParty,
    congressCard
};
