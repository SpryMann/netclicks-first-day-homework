const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';
const API_KEY = 'c6abbe122b536866da931606332c255f';

// Elements

const leftMenu = document.querySelector('.left-menu');
const hamburger = document.querySelector('.hamburger');
const tvShowsList = document.querySelector('.tv-shows__list');
const modal = document.querySelector('.modal');


class DBService {
    getData = async (url) => {
        const res = await fetch(url);

        if (res.ok) {
            return res.json();
        } else {
            throw new Error(`Не удалось получить данные по адресу ${url}`)
        }
    }

    getTestData = () => {
        return this.getData('test.json')
    }
}

const renderCard = (response) => {
    console.log(response.results);
    tvShowsList.textContent = '';

    response.results.forEach(item => {

        const {
            backdrop_path: backdrop,
            name: title,
            poster_path: poster,
            vote_average: vote
        } = item;
        const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        const backdropIMG = '';
        const voteElem = '';
        const card = document.createElement('li');

        card.classList.add('tv-shows__item');
        card.innerHTML = `
        <a href="#" class="tv-card">
            <span class="tv-card__vote">${vote}</span>
            <img class="tv-card__img"
                src="${posterIMG}"
                data-backdrop="${IMG_URL + backdrop}"
                alt="${title}">
            <h4 class="tv-card__head">${title}</h4>
        </a>
        `;

        tvShowsList.append(card);
    });
};

new DBService().getTestData().then(renderCard);

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

/*  // My code for main part of Netclicks website
// Change images on tv-cards

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
*/

// Open modal window

tvShowsList.addEventListener('click', (event) => {
    event.defaultPrevented();

    const target = event.target;
    const card = target.closest('.tv-card');

    if (card) {
        document.body.style.overflow = "hidden";
        modal.classList.remove('hide');
    }
});

// Close modal window

modal.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal') || event.target.closest('.cross')) {
        document.body.style.overflow = "";
        modal.classList.add('hide');
    }
});

// Changing cards' images

const changeImage = event => {
    const card = event.target.closest('.tv-shows__item');

    /* if (card) {
        const img = card.querySelector('.tv-card__img');
        const changeImg = img.dataset.backdrop;

        if (changeImage) {
            img.dataset.backdrop = img.src;
            img.src = changeImg;
        }
    }
    */

    // Метод деструктуризации

    if (card) {
        const img = card.querySelector('.tv-card__img');

        if (img.dataset.backdrop) {
            [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src];
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);