import axios from 'axios';

const API_KEY = '49287567-80da5b96f25a95ab41aa198b2';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImages(searchQuery, page, per_page = 15) {
  const params = {
    page,
    per_page,
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };
  const { data } = await axios(`${BASE_URL}`, { params });

  return data;
}
