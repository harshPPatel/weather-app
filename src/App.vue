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
        .then((res) => { this.forecast = res; });
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        this.location.lat = res.coords.latitude;
        this.location.lang = res.coords.longitude;
        API.getAddress(this.location.lat, this.location.lang)
          .then((response) => { this.address = response.name; });
        this.getWeatherData();
      }, () => {
        this.location.lat = '40.730610';
        this.location.lang = '-73.935242';
        this.address = 'New York City, NY';
        this.getWeatherData();
        // Save last location to storage and set that here if it exists.
      });
    }
  },
  // updated() {
  //   this.getWeatherData();
  // },
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
