import { Notify } from 'notiflix';
import SlimSelect from 'slim-select';

import 'slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = new SlimSelect({
  events: {
    afterChange: newVal =>
      !newVal[0].placeholder && updateCatInfo(newVal[0].value),
  },
  select: '.breed-select',
  settings: {
    placeholderText: 'Select breed',
  },
});
const select = document.querySelector('.ss-main');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const showLoader = show => {
  loader.style.display = show ? 'block' : 'none';
};

const showSelect = show => {
  select.style.display = show ? 'flex' : 'none';
};

const initializeBreeds = async () => {
  try {
    showSelect(false);
    showLoader(true);

    const breeds = await fetchBreeds();

    breedSelect.setData([
      { placeholder: true, text: 'Select breed' },
      ...breeds.map(breed => ({ text: breed.name, value: breed.id })),
    ]);
    showSelect(true);
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    showLoader(false);
  }
};

const updateCatInfo = async breedId => {
  try {
    showLoader(true);
    catInfo.innerHTML = '';

    const catData = await fetchCatByBreed(breedId);
    catInfo.innerHTML = `
      <img src="${catData.url}" alt="Breed image" width="600">
      <h2>${catData.breeds[0].name}</h2>
      <p>${catData.breeds[0].description}</p>
      <p><b>Temperament:</b> ${catData.breeds[0].temperament}</p>
    `;
  } catch (error) {
    Notify.failure('Oops! Something went wrong! Try reloading the page!');
  } finally {
    showLoader(false);
  }
};

initializeBreeds();
