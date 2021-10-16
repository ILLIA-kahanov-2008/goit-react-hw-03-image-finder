// URL-строка HTTP-запроса.

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
// Pixabay API поддерживает пагинацию, по умолчанию параметр page равен 1. Пусть в
// ответе приходит по 12 объектов, установлено в параметре per_page. Не забудь что
// при поиске по новому ключевому слову, необходимо сбрасывать значение page в 1.

import axios from 'axios';

const MY_KEY = '23141283-b767010b5d5526766e0fab830';

axios.defaults.baseURL = 'https://pixabay.com/api/';

function getImages(query, page) {
  return axios.get(
    `?image_type="photo"&orientation="horizontal"&q=${query}&page=${page}&per_page=12&key=${MY_KEY}`,
  );
}

export const imagesAPI = {
  getImages
}

