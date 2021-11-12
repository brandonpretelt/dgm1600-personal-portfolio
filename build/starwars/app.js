const allLinks = document.querySelectorAll('a');
allLinks.forEach((link) => {
    console.log(link.parentElement);
    // link.addEventListener('click', (e) => e.preventDefault());
    link.firstElementChild.addEventListener('mouseenter', () => {
        const getStyles = window.getComputedStyle(link.parentElement);
        const opacity = getStyles.getPropertyValue('opacity');
        link.style.opacity = opacity;
        link.classList.add('link-item-transition');
    });
    link.firstElementChild.addEventListener('mouseleave', () => {
        link.style.opacity = 0;
        link.classList.remove('link-item-transition');
    });
});

const linkItem = document.querySelectorAll('.link-item > .link-title-inner'); //[0].firstElementChild

linkItem.forEach((title) => {
    title.addEventListener('mouseover', () => {
        console.log('hello there!!');
    });
});
