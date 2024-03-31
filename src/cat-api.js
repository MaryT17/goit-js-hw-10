import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_L5YDB13XZQjoJSOxOMhEDoa0TchxN7Dg7JcTpA0RllGwJCjGq6vNrHk5ZfP6lRwx';

const fetchBreeds = () =>
  axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });

const fetchCatByBreed = breedId =>
  axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });

export { fetchBreeds, fetchCatByBreed };
