const renderCard = (title, info, url, container) => {
    const card = document.createElement('div');
    card.className = 'card';

    const cardTitle = document.createElement('div');
    const cardH2 = document.createElement('h2');
    cardTitle.className = 'card-title';
    cardH2.textContent = title;
    cardTitle.append(cardH2);

    const cardInfo = document.createElement('div');
    const cardPara = document.createElement('p');
    const cardLink = document.createElement('a');
    cardLink.className = 'card-link';
    cardInfo.className = 'card-info';
    cardPara.textContent = info;
    cardLink.textContent = 'Link to Project';
    cardLink.href = url;
    cardLink.setAttribute('target', '_blank');
    cardInfo.append(cardPara, cardLink);
    card.append(cardTitle, cardInfo);
    container.append(card);
};

export { renderCard };
