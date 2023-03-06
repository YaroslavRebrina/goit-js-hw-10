import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('#search-box');
const listRef = document.querySelector('.country-list');
const infoRef = document.querySelector('.country-info');

const onInput = e => {
  const value = e.target.value.trim();

  if (value === '') {
    onClearInput;
    return;
  }

  fetchCountries(value)
    .then(response => {
      if (response.length >= 2 && response.length <= 10) {
        listMurkupCreation(response);
      } else if (response.length === 1) {
        infoMurkupCreation(response);
      } else {
        hasTooMuchCountriesFound();
      }
    })
    .catch(error => {
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
};

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function infoMurkupCreation(response) {
  listRef.innerHTML = '';

  const infoMurkup = response
    .map(({ flags, name, capital, languages, population }) => {
      return `<div class="wrapper"><img class="img" src="${flags.svg}" alt="f${
        flags.alt
      }">

            <p>${name.official}</p>
            </div>
            <div>
            <p>Capital: ${capital}</p>
            <p>Population: ${population}</p>
            <p>Languages: ${Object.values(languages)[0]}</p>
            </div>`;
    })
    .join('');
  infoRef.innerHTML = infoMurkup;
}

function listMurkupCreation(response) {
  infoRef.innerHTML = '';

  const listMurkup = response
    .map(({ flags, name }) => {
      return `<li class="wrapper"><img class="img" src="${flags.svg}" alt="f${flags.alt}">

            <p>${name.official}</p></li>`;
    })
    .join('');
  listRef.innerHTML = listMurkup;
}

function hasTooMuchCountriesFound() {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function onClearInput() {
  listRef.innerHTML = '';
  infoRef.innerHTML = '';
}
