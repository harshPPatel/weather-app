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
          this.setLocalData();
        });
    },
    setLocalData() {
      // Saving location to localStorage
      const location = {
        lat: this.location.lat,
        lang: this.location.lang,
        address: this.address,
      };
      localStorage.setItem('location', JSON.stringify(location));
      localStorage.setItem('forecast', JSON.stringify(this.forecast));
    },
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((res) => {
        this.location.lat = res.coords.latitude;
        this.location.lang = res.coords.longitude;
        if (!localStorage.getItem('location')) {
          API.getAddress(this.location.lat, this.location.lang)
            .then((response) => { this.address = response.name; });
        } else {
          this.address = JSON.parse(localStorage.getItem('location')).address;
        }
        if (!localStorage.getItem('forecast')) {
          this.getWeatherData();
        } else {
          this.forecast = JSON.parse(localStorage.getItem('forecast'));
        }
      }, () => {
        const localLocation = localStorage.getItem('location');
        this.location.lat = localLocation ? JSON.parse(localLocation).lat : '40.730610';
        this.location.lang = localLocation ? JSON.parse(localLocation).lang : '-73.935242';
        this.address = localLocation ? JSON.parse(localLocation).address : 'New York City, NY';
        if (localStorage.getItem('forecast')) {
          this.forecast = JSON.parse(localStorage.getItem('forecast'));
        } else {
          this.getWeatherData();
        }
      });
    }
  },
  updated() {
    this.setLocalData();
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
