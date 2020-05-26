// MENU

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');

// Open and close menu

hamburger.addEventListener('click', (event) => {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', (event) => {
    const target = event.target;
    const dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }
});

// Main part

const tvCards = document.querySelectorAll('.tv-card');
const tvCardImages = document.querySelectorAll('.tv-card__img');
let rememberSrc; //variable, which will contain image's src

tvCardImages.forEach(elem => {
    elem.addEventListener('mouseover', (event) => {
        rememberSrc = elem.src;
        elem.src = elem.getAttribute('data-backdrop');
    });
});

tvCardImages.forEach(elem => {
    elem.addEventListener('mouseout', (event) => {
        elem.src = rememberSrc;
    });
});