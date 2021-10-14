// URL-строка HTTP-запроса.

// https://pixabay.com/api/?q=что_искать&page=номер_страницы&key=твой_ключ&image_type=photo&orientation=horizontal&per_page=12
// Pixabay API поддерживает пагинацию, по умолчанию параметр page равен 1. Пусть в
// ответе приходит по 12 объектов, установлено в параметре per_page. Не забудь что
// при поиске по новому ключевому слову, необходимо сбрасывать значение page в 1.

import axios from 'axios';

const MY_KEY = '23141283-b767010b5d5526766e0fab830';

axios.defaults.baseURL = 'https://pixabay.com/api/';

function getImages(query, page) {
  const imageType = "photo";
  const imageOrientation = "horizontal";
  const imagesPerPage = 12;

  return axios.get(
    `?image_type=${imageType}&orientation=${imageOrientation}&q=${query}&page=${page}&per_page=${imagesPerPage}&key=${MY_KEY}`,
  );
}

export const imagesAPI = {
  getImages
}


// function fetchPokemon(name) {
//   return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     return Promise.reject(new Error(`Нет покемона с именем ${name}`));
//   });
// }

// const api = {
//   fetchPokemon,
// };

// export default api;
