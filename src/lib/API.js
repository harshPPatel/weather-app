import API_KEY from '../config/API_KEY';

const PROXY = 'https://cors-anywhere.herokuapp.com/';
const LOCATION_API_URL = `${PROXY}https://darksky.net/rgeo?hires=1`;
const DARK_SKY_API_URL = `${PROXY}https://api.darksky.net/forecast/${API_KEY}`;

const getWeather = (lang, lat) => {
  console.log('API', lang);
  const URL = `${DARK_SKY_API_URL}/${lat},${lang}`;
  return fetch(URL)
    .then(res => res.json());
};

const getAddress = (lat, lang) => {
  const URL = `${LOCATION_API_URL}&lat=${lat}&lon=${lang}`;
  return fetch(URL)
    .then(res => res.json());
};

export default {
  getWeather,
  getAddress,
};
