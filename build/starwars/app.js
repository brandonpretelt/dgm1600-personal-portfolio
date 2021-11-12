import { addListeners } from '../utils/utils.js';

const allLinks = document.querySelectorAll('a');

allLinks.forEach((link) => {
    const stylesFromParent = (link) => {
        const getStyles = window.getComputedStyle(link.parentElement);
        const opacity = getStyles.getPropertyValue('opacity');
        link.style.opacity = opacity;
        link.classList.add('link-item-transition');
    };
    addListeners(link.firstElementChild, 'mouseenter', () =>
        stylesFromParent(link)
    );
    addListeners(link.firstElementChild, 'mouseleave', () => {
        link.style.opacity = 0;
        link.classList.remove('link-item.transition');
    });
});
