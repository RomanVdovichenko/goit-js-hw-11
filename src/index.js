import '~node_modules/modern-normalize/modern-normalize.css';
import './css/styles.css';
import SimpleLightbox from "~node_modules/simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import searchQuery from './search-query';
import markup from './markup-card';
const perPage = 40;
let page = 1;
let photoCard = new SimpleLightbox(".photo-card a", {
    captionsData: "alt",
    captionPosition: "bottom",
    captionDelay: 250,
    scrollZoom: false,
    docClose: false,
});

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('#load-more');
const searchBtn = document.querySelector('#searh');
const gallery = document.querySelector('.gallery');

form.addEventListener('input', onInput);
form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

function onInput() {
    page = 1;
    searchBtn.removeAttribute('disabled');
    gallery.innerHTML = '';
    hiddenBtn(loadMoreBtn)
}

function onSearch(evt) {
    evt.preventDefault();
    searchBtn.setAttribute('disabled', '');
    let inputQuery = form.elements.searchQuery.value.trim();
    let perPages = perPage;
    if (!inputQuery) {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return
    }
    searchQuery(inputQuery, page, perPages)
        .then(resp => {
            const totalHits = resp.data.totalHits;
            if (!resp.data.hits.length) {
                hiddenBtn(loadMoreBtn);
                Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
                return
            } else if (resp.data.hits.length < perPage || totalHits === perPage) {
                hiddenBtn(loadMoreBtn);
                Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`); 
                gallery.insertAdjacentHTML('beforeend', markup(resp.data.hits));
                photoCard.refresh();
                return
            }
            Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`); 
            gallery.insertAdjacentHTML('beforeend', markup(resp.data.hits));
            photoCard.refresh();
            loadMoreBtn.removeAttribute('hidden');
            loadMoreBtn.classList.add('load-more');
        })
        .catch(err => {
            console.error(err);
        })
}

function onLoadMore() {
    page += 1;
    let inputQuery = form.elements.searchQuery.value.trim();
    let perPages = perPage;
    searchQuery(inputQuery, page, perPages)
        .then(resp => {
            if ((resp.data.totalHits - page * perPage) < perPage) {          
                perPages = resp.data.totalHits - page * perPage;
            }
            gallery.insertAdjacentHTML('beforeend', markup(resp.data.hits));
            photoCard.refresh();

            scrollBy(".gallery");

            if (resp.data.hits.length < perPage || (resp.data.totalHits - page * perPage) <= 0) {
                hiddenBtn(loadMoreBtn);
                Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
                return
            } 
        }) 
        .catch(err => {
            console.error(err);
        })
}

function hiddenBtn(btn) {
    btn.setAttribute('hidden', '');
    btn.classList.remove('load-more');
}

function scrollBy(classValue) {
    const { height: cardHeight } = document
        .querySelector(classValue)
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    })
}
