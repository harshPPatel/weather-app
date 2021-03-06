import API_KEY from '../config/API_KEY';

const PROXY = 'https://cors-anywhere.herokuapp.com/';
const LOCATION_API_URL = `${PROXY}https://darksky.net/rgeo?hires=1`;
const DARK_SKY_API_URL = `${PROXY}https://api.darksky.net/forecast/${API_KEY}`;

// Fetches weather from API
const getWeather = (lang, lat) => {
  const URL = `${DARK_SKY_API_URL}/${lat},${lang}?units=si`;
  return fetch(URL)
    .then(res => res.json());
};

// Fetches Address from API
const getAddress = (lat, lang) => {
  const URL = `${LOCATION_API_URL}&lat=${lat}&lon=${lang}`;
  return fetch(URL)
    .then(res => res.json());
};

// Exporting object with methods
export default {
  getWeather,
  getAddress,
};
