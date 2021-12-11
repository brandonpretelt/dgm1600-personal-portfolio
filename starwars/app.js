import { addListeners } from '../utils/utils.js';

const allLinks = document.querySelectorAll('a');
const allLinkTitles = document.querySelectorAll('div.link-title-inner');
const places = ['../films', '../sw-chars', '../sw-starships'];

allLinks.forEach((link) => {
    const stylesFromParent = (link) => {
        const getStyles = getComputedStyle(link.parentElement);
        const opacity = getStyles.getPropertyValue('opacity');
        link.style.opacity = opacity;
        link.classList.add('link-item-transition');
    };
    addListeners(link, 'click', (e) => e.preventDefault());
    addListeners(link.firstElementChild, 'mouseenter', () =>
        stylesFromParent(link)
    );
    addListeners(link.firstElementChild, 'mouseleave', () => {
        link.style.opacity = 0;
        link.classList.remove('link-item.transition');
    });
});

allLinkTitles.forEach((title, index) => {
    addListeners(title, 'click', () => {
        switch (index) {
            case 0:
                window.location = places[0];
                break;
            case 1:
                window.location = places[1];
                break;
            case 2:
                window.location = places[2];
                break;
            default:
                console.log('Broken');
                break;
        }
    });
});
