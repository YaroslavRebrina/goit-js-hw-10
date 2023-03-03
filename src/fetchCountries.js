export function fetchCountries(name) {
  const urlSearchParams = new URLSearchParams({
    fields: 'name,capital,population,flags,languages',
  });

  const URL = `https://restcountries.com/v3.1/name/${name}?${urlSearchParams.toString()}`;

  return fetch(URL);
}
