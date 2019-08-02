<template>
  <div id="app">
    <navbar :location="address" v-on:refresh="getWeatherData" />
  </div>
</template>

<script>
import navbar from './components/Navbar.vue';
import API from './lib/API';

export default {
  name: 'app',
  data: () => ({
    location: {
      lat: '',
      lang: '',
    },
    address: '',
    forecast: null,
  }),
  components: {
    navbar,
  },
  methods: {
    async getWeatherData() {
      await API.getWeather(this.location.lang, this.location.lat)
        .then((res) => {
          this.forecast = res;
          this.saveDataToLocalStorage();
        });
    },
    saveDataToLocalStorage() {
      const location = {
        lat: this.location.lat,
        lang: this.location.lang,
        address: this.address,
      };
      localStorage.setItem('location', JSON.stringify(location));
      localStorage.setItem('forecast', JSON.stringify(this.forecast));
    },
    fetchData(res) {
      // Setting data
      this.location.lat = res.coords.latitude;
      this.location.lang = res.coords.longitude;

      // Checking for location in localStorage
      if (localStorage.getItem('location')) {
        const localLocation = JSON.parse(localStorage.getItem('location'));

        // Checking if new location is same as localLocation or not
        if (
          localLocation.lat === this.location.lat
          && localLocation.lang === this.location.lang
        ) {
          this.address = localLocation.address;
        } else {
          API.getAddress(this.location.lat, this.location.lang)
            .then((response) => { this.address = response.name; });
        }
      } else {
        API.getAddress(this.location.lat, this.location.lang)
          .then((response) => { this.address = response.name; });
      }

      // Checking if forecast exists in localStorage
      if (localStorage.getItem('forecast')) {
        const localForecast = JSON.parse(localStorage.getItem('forecast'));

        // Checking if localForecast's long and lat is same as state
        if (
          localForecast.latitude === this.location.lat
          && localForecast.longitude === this.location.lang
        ) {
          // Setting localForecast to state
          this.forecast = localForecast;
        } else {
          // Fetching data from API
          this.getWeatherData();
        }
      } else {
        // Fetching data from API
        this.getWeatherData();
      }
    },
    setDefaultData() {
      const localLocation = localStorage.getItem('location');
      if (localLocation) {
        const { lat, lang, address } = JSON.parse(localLocation);
        this.location.lat = lat;
        this.location.lang = lang;
        this.address = address;
        if (localStorage.getItem('forecast')) {
          this.forecast = JSON.parse(localStorage.getItem('forecast'));
        }
      } else {
        this.location.lat = '40.730610';
        this.location.lang = '-73.935242';
        this.address = 'New York City, NY';
        this.getWeatherData();
      }
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.fetchData, this.setDefaultData);
    }
  },
  updated() {
    this.saveDataToLocalStorage();
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
