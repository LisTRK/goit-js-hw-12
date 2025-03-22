// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import { clearGalleryList, renderGalleryList } from './js/render-functions';

const formEl = document.querySelector('.form');
const loaderEl = document.querySelector('.loader');
const loadMoreBtnEl = document.querySelector('.loadMoreBtn');
const per_page = 15;
let inputValue = '';
let page = 1;

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(e) {
  e.preventDefault();
  inputValue = formEl.elements['search-text'].value.trim();

  if (!inputValue) {
    iziToast.info({
      position: 'topRight',
      message: 'wrong!',
    });
    return;
  }
  page = 1;
  hideLoadMoreBtn();
  showLoader();
  clearGalleryList();
  try {
    const { hits, totalHits } = await getImages(inputValue, page, per_page);

    if (hits.length === 0) {
      iziToast.error({
        position: 'topRight',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    renderGalleryList(hits);
    showLoadMoreBtn();
    checkEndColection(totalHits, page, per_page);
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}

async function onLoadMoreBtnClick(e) {
  page++;
  hideLoadMoreBtn();
  showLoader();
  try {
    const { hits, totalHits } = await getImages(inputValue, page, per_page);
    renderGalleryList(hits);
    showLoadMoreBtn();
    checkEndColection(totalHits, page, per_page);
    const { height } = document
      .querySelector('.gallery-item')
      .getBoundingClientRect();
    window.scrollBy({
      top: height * 2,
      behavior: 'smooth',
    });
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
}
function checkEndColection(totalHits, page, per_page) {
  const totalPage = Math.ceil(totalHits / per_page);

  if (totalPage === page) {
    hideLoadMoreBtn();
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }
}

function showLoader() {
  loaderEl.classList.remove('hidden');
}

function hideLoader() {
  loaderEl.classList.add('hidden');
}

function showLoadMoreBtn() {
  loadMoreBtnEl.classList.remove('hidden');
}

function hideLoadMoreBtn() {
  loadMoreBtnEl.classList.add('hidden');
}
