// Описаний у документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListEl = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery-link', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function clearGalleryList() {
  galleryListEl.innerHTML = '';
}

export function renderGalleryList(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" />
            <div class="info">
              <p><b>Likes:</b> ${likes}</p>
              <p><b>Views:</b> ${views}</p>
              <p><b>Comments:</b> ${comments}</p>
              <p><b>Downloads:</b> ${downloads}</p>
            </div>
          </div>
        </a>
        </li>`
    )
    .join('');
  galleryListEl.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
