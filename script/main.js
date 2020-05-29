// const IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';



// const leftMenu = document.querySelector('.left-menu');
// const hamburger = document.querySelector('.hamburger');
// const tvShowsList = document.querySelector('.tv-shows__list');
// const modal = document.querySelector('.modal');
// const tvShows = document.querySelector('.tv-shows');
// const tvCardImg = document.querySelector('.tv-card__img');
// const modalTitle = document.querySelector('.modal__title');
// const genresList = document.querySelector('.genres-list');
// const rating = document.querySelector('.rating');
// const description = document.querySelector('.description');
// const modalLink = document.querySelector('.modal__link');
// const searchForm = document.querySelector('.search__form');
// const searchFormInput = document.querySelector('.search__form-input');
// const tvShowsHead = document.querySelector('.tv-shows__head');
// const pagination = document.querySelector('.pagination');



// const loading = document.createElement('div');
// loading.className = 'loading';

// class DBService {

//     constructor() {
//         this.SERVER = 'https://api.themoviedb.org/3';
//         this.API_KEY = 'c6abbe122b536866da931606332c255f';
//     }

//     getData = async (url) => {
//         tvShows.append(loading);
//         const res = await fetch(url);

//         if (res.ok) {
//             return res.json();
//         } else {
//             throw new Error(`Не удалось получить данные по адресу ${url}`);
//         }
//     }

//     getTestData = () => {
//         return this.getData('test.json');
//     }

//     getTestCard = () => {
//         return this.getData('card.json');
//     }

//     getSearchResult = query => {
//         this.temp = `${this.SERVER}/search/tv?api_key=${this.API_KEY}&language=ru-RU&query=${query}`;
//         return this.getData(this.temp);
//     }

//     getNextPrevPage = page => {
//         return this.getData(this.temp + '&page=' + page);
//     }

//     getTvShow = id => this.getData(`${this.SERVER}/tv/${id}?api_key=${this.API_KEY}&language=ru-RU`);

//     getTopRated = () => this.getData(`${this.SERVER}/tv/top_rated?api_key=${this.API_KEY}&language=ru-RU`);
//     getPopular = () => this.getData(`${this.SERVER}/tv/popular?api_key=${this.API_KEY}&language=ru-RU`);
//     getToday = () => this.getData(`${this.SERVER}/tv/airing_today?api_key=${this.API_KEY}&language=ru-RU`);
//     getWeek = () => this.getData(`${this.SERVER}/tv/on_the_air?api_key=${this.API_KEY}&language=ru-RU`);
// }

// const dbservice = new DBService();

// const renderCard = (response, target) => {

//     tvShowsList.textContent = '';


//     if (response.total_results == 0) {
//         tvShowsHead.textContent = 'По вашему запросу ничего не было найдено!';
//         tvShowsHead.className = 'error';
//         pagination.textContent = '';

//         loading.remove();
//         tvShows.prepend(tvShowsHead);

//         return;
//     }

//     tvShowsHead.textContent = target ? target.textContent : 'Результат поиска';
//     tvShowsHead.className = 'tv-shows__head';

//     response.results.forEach(item => {
//         const {
//             backdrop_path: backdrop,
//             name: title,
//             poster_path: poster,
//             vote_average: vote,
//             id
//         } = item;

//         const posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
//         const backdropIMG = backdrop ? IMG_URL + backdrop : '';
//         const voteElem = vote ? `<span class="tv-card__vote">${vote}</span>` : '';

//         const card = document.createElement('li');
//         card.classList.add('tv-shows__item');
//         card.innerHTML = `<a href="#" id="${id}" class="tv-card">
// ${voteElem}

// <img class="tv-card__img"
// src="${posterIMG}"
// data-backdrop="${backdropIMG}"

// alt="${title}">
// <h4 class="tv-card__head">${title}</h4>
// </a>`;

//         loading.remove();
//         tvShowsList.append(card);

//     });

//     pagination.textContent = '';

//     if (!target && response.total_pages > 1) {
//         for (let i = 1; i <= response.total_pages; i++) {
//             pagination.innerHTML += `<li><a href="#" class="pages">${i}</a></li>`;
//         }
//     }
// };

// searchForm.addEventListener('submit', event => {
//     event.preventDefault();
//     const value = searchFormInput.value.trim();
//     if (value) {
//         dbservice.getSearchResult(value).then(renderCard);
//     }
//     searchFormInput.value = '';
// });


// //открытие/закрытие меню


// hamburger.addEventListener('click', (event) => {
//     leftMenu.classList.toggle('openMenu');
//     hamburger.classList.toggle('open');
// });

// document.addEventListener('click', (event) => {
//     if (!event.target.closest('.left-menu')) {
//         leftMenu.classList.remove('openMenu');
//         hamburger.classList.remove('open');
//     }
// });

// leftMenu.addEventListener('click', (event) => {
//     event.preventDefault();
//     const target = event.target;
//     const dropdown = target.closest('.dropdown');

//     if (dropdown) {
//         dropdown.classList.toggle('active');
//         leftMenu.classList.add('openMenu');
//         hamburger.classList.add('open');
//     }

//     if (target.closest('#top-rated')) {
//         dbservice.getTopRated().then((response) => renderCard(response, target));
//     }

//     if (target.closest('#popular')) {
//         dbservice.getPopular().then((response) => renderCard(response, target));
//     }

//     if (target.closest('#today')) {
//         dbservice.getToday().then((response) => renderCard(response, target));
//     }

//     if (target.closest('#week')) {
//         dbservice.getWeek().then((response) => renderCard(response, target));
//     }

//     if (target.closest('#search')) {
//         tvShowsList.textContent = '';
//         tvShowsHead.textContent = '';
//     }
// });


// //открытие модального окна
// tvShowsList.addEventListener('click', event => {
//     event.preventDefault();

//     const target = event.target;
//     const card = target.closest('.tv-card');

//     if (card) {

//         dbservice.getTvShow(card.id).then(data => {
//             if (data.poster_path == null) {
//                 tvCardImg.parentNode.classList.add('hide');
//             } else {
//                 tvCardImg.parentNode.classList.remove('hide');
//                 tvCardImg.src = IMG_URL + data.poster_path;
//                 tvCardImg.alt = data.name;
//             }

//             modalTitle.textContent = data.name;
//             genresList.textContent = '';
//             for (const item of data.genres) {
//                 genresList.innerHTML += `<li>${item.name}</li>`;
//             }

//             rating.textContent = data.vote_average;
//             description.textContent = data.overview;
//             modalLink.href = data.homepage;

//         }).then(() => {
//             document.body.style.overflow = 'hidden';
//             modal.classList.remove('hide');
//         }).then(() => {
//             loading.remove();
//         })

//     }

// });

// //закрытие

// modal.addEventListener('click', event => {

//     if (event.target.closest('.cross') ||
//         event.target.classList.contains('modal')) {
//         document.body.style.overflow = '';
//         modal.classList.add('hide');
//     }
// });

// //смена карточки

// const changeImage = event => {
//     const card = event.target.closest('.tv-shows__item');


//     if (card) {
//         const img = card.querySelector('.tv-card__img');
//         if (img.dataset.backdrop) {
//             [img.src, img.dataset.backdrop] = [img.dataset.backdrop, img.src]

//         }

//     }
// };



// tvShowsList.addEventListener('mouseover', changeImage);
// tvShowsList.addEventListener('mouseout', changeImage);

// pagination.addEventListener('click', event => {

//     event.preventDefault();
//     const target = event.target;
//     if (target.classList.contains('pages')) {
//         tvShows.append(loading);
//         dbservice.getNextPrevPage(target.textContent).then(renderCard);
//     }

// });

























'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var IMG_URL = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2';

var leftMenu = document.querySelector('.left-menu');
var hamburger = document.querySelector('.hamburger');
var tvShowsList = document.querySelector('.tv-shows__list');
var modal = document.querySelector('.modal');
var tvShows = document.querySelector('.tv-shows');
var tvCardImg = document.querySelector('.tv-card__img');
var modalTitle = document.querySelector('.modal__title');
var genresList = document.querySelector('.genres-list');
var rating = document.querySelector('.rating');
var description = document.querySelector('.description');
var modalLink = document.querySelector('.modal__link');
var searchForm = document.querySelector('.search__form');
var searchFormInput = document.querySelector('.search__form-input');
var tvShowsHead = document.querySelector('.tv-shows__head');
var pagination = document.querySelector('.pagination');

var loading = document.createElement('div');
loading.className = 'loading';

var DBService = function DBService() {
    var _this = this;

    _classCallCheck(this, DBService);

    this.SERVER = 'https://api.themoviedb.org/3';
    this.API_KEY = 'c6abbe122b536866da931606332c255f';

    getData = async function getData(url) {
        tvShows.append(loading);
        var res = await fetch(url);

        if (res.ok) {
            return res.json();
        } else {
            throw new Error('\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u043B\u0443\u0447\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 \u043F\u043E \u0430\u0434\u0440\u0435\u0441\u0443 ' + url);
        }
    };

    getTestData = function getTestData() {
        return _this.getData('test.json');
    };

    getTestCard = function getTestCard() {
        return _this.getData('card.json');
    };

    getSearchResult = function getSearchResult(query) {
        _this.temp = _this.SERVER + '/search/tv?api_key=' + _this.API_KEY + '&language=ru-RU&query=' + query;
        return _this.getData(_this.temp);
    };

    getNextPrevPage = function getNextPrevPage(page) {
        return _this.getData(_this.temp + '&page=' + page);
    };

    getTvShow = function getTvShow(id) {
        return _this.getData(_this.SERVER + '/tv/' + id + '?api_key=' + _this.API_KEY + '&language=ru-RU');
    };

    getTopRated = function getTopRated() {
        return _this.getData(_this.SERVER + '/tv/top_rated?api_key=' + _this.API_KEY + '&language=ru-RU');
    };
    getPopular = function getPopular() {
        return _this.getData(_this.SERVER + '/tv/popular?api_key=' + _this.API_KEY + '&language=ru-RU');
    };
    getToday = function getToday() {
        return _this.getData(_this.SERVER + '/tv/airing_today?api_key=' + _this.API_KEY + '&language=ru-RU');
    };
    getWeek = function getWeek() {
        return _this.getData(_this.SERVER + '/tv/on_the_air?api_key=' + _this.API_KEY + '&language=ru-RU');
    };
};

var dbservice = new DBService();

var renderCard = function renderCard(response, target) {

    tvShowsList.textContent = '';

    if (response.total_results == 0) {
        tvShowsHead.textContent = 'По вашему запросу ничего не было найдено!';
        tvShowsHead.className = 'error';
        pagination.textContent = '';

        loading.remove();
        tvShows.prepend(tvShowsHead);

        return;
    }

    tvShowsHead.textContent = target ? target.textContent : 'Результат поиска';
    tvShowsHead.className = 'tv-shows__head';

    response.results.forEach(function (item) {
        var backdrop = item.backdrop_path,
            title = item.name,
            poster = item.poster_path,
            vote = item.vote_average,
            id = item.id;


        var posterIMG = poster ? IMG_URL + poster : 'img/no-poster.jpg';
        var backdropIMG = backdrop ? IMG_URL + backdrop : '';
        var voteElem = vote ? '<span class="tv-card__vote">' + vote + '</span>' : '';

        var card = document.createElement('li');
        card.classList.add('tv-shows__item');
        card.innerHTML = '<a href="#" id="' + id + '" class="tv-card">\n' + voteElem + '\n<img class="tv-card__img"\nsrc="' + posterIMG + '"\ndata-backdrop="' + backdropIMG + '"\nalt="' + title + '">\n<h4 class="tv-card__head">' + title + '</h4>\n</a>';

        loading.remove();
        tvShowsList.append(card);
    });

    pagination.textContent = '';

    if (!target && response.total_pages > 1) {
        for (var i = 1; i <= response.total_pages; i++) {
            pagination.innerHTML += '<li><a href="#" class="pages">' + i + '</a></li>';
        }
    }
};

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var value = searchFormInput.value.trim();
    if (value) {
        dbservice.getSearchResult(value).then(renderCard);
    }
    searchFormInput.value = '';
});

//открытие/закрытие меню


hamburger.addEventListener('click', function (event) {
    leftMenu.classList.toggle('openMenu');
    hamburger.classList.toggle('open');
});

document.addEventListener('click', function (event) {
    if (!event.target.closest('.left-menu')) {
        leftMenu.classList.remove('openMenu');
        hamburger.classList.remove('open');
    }
});

leftMenu.addEventListener('click', function (event) {
    event.preventDefault();
    var target = event.target;
    var dropdown = target.closest('.dropdown');

    if (dropdown) {
        dropdown.classList.toggle('active');
        leftMenu.classList.add('openMenu');
        hamburger.classList.add('open');
    }

    if (target.closest('#top-rated')) {
        dbservice.getTopRated().then(function (response) {
            return renderCard(response, target);
        });
    }

    if (target.closest('#popular')) {
        dbservice.getPopular().then(function (response) {
            return renderCard(response, target);
        });
    }

    if (target.closest('#today')) {
        dbservice.getToday().then(function (response) {
            return renderCard(response, target);
        });
    }

    if (target.closest('#week')) {
        dbservice.getWeek().then(function (response) {
            return renderCard(response, target);
        });
    }

    if (target.closest('#search')) {
        tvShowsList.textContent = '';
        tvShowsHead.textContent = '';
    }
});

//открытие модального окна
tvShowsList.addEventListener('click', function (event) {
    event.preventDefault();

    var target = event.target;
    var card = target.closest('.tv-card');

    if (card) {

        dbservice.getTvShow(card.id).then(function (data) {
            if (data.poster_path == null) {
                tvCardImg.parentNode.classList.add('hide');
            } else {
                tvCardImg.parentNode.classList.remove('hide');
                tvCardImg.src = IMG_URL + data.poster_path;
                tvCardImg.alt = data.name;
            }

            modalTitle.textContent = data.name;
            genresList.textContent = '';
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = data.genres[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    genresList.innerHTML += '<li>' + item.name + '</li>';
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            rating.textContent = data.vote_average;
            description.textContent = data.overview;
            modalLink.href = data.homepage;
        }).then(function () {
            document.body.style.overflow = 'hidden';
            modal.classList.remove('hide');
        }).then(function () {
            loading.remove();
        });
    }
});

//закрытие

modal.addEventListener('click', function (event) {

    if (event.target.closest('.cross') || event.target.classList.contains('modal')) {
        document.body.style.overflow = '';
        modal.classList.add('hide');
    }
});

//смена карточки

var changeImage = function changeImage(event) {
    var card = event.target.closest('.tv-shows__item');

    if (card) {
        var img = card.querySelector('.tv-card__img');
        if (img.dataset.backdrop) {
            var _ref = [img.dataset.backdrop, img.src];
            img.src = _ref[0];
            img.dataset.backdrop = _ref[1];
        }
    }
};

tvShowsList.addEventListener('mouseover', changeImage);
tvShowsList.addEventListener('mouseout', changeImage);

pagination.addEventListener('click', function (event) {

    event.preventDefault();
    var target = event.target;
    if (target.classList.contains('pages')) {
        tvShows.append(loading);
        dbservice.getNextPrevPage(target.textContent).then(renderCard);
    }
});