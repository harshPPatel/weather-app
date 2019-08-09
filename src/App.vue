<template>
  <div id="app">
    <div class="main_overlay" id="color_target">
      <div class="container">
        <Navbar :location="address" v-on:refresh="getWeatherData" />
        <main-data :forecast="forecast" v-if="forecast" />
        <week-data-list v-if="forecast" :dailyData="forecast.daily.data" />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import MainData from './components/MainData.vue';
import WeekDataList from './components/WeekDataList.vue';
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
    Navbar,
    MainData,
    WeekDataList,
  },
  methods: {
    // Fetches weather data and sets to state/data
    async getWeatherData() {
      await API.getWeather(this.location.lang, this.location.lat)
        .then((res) => {
          this.forecast = res;
          this.saveDataToLocalStorage();
        });
    },
    // Saves data to localStorage
    saveDataToLocalStorage() {
      const location = {
        lat: this.location.lat,
        lang: this.location.lang,
        address: this.address,
      };
      localStorage.setItem('location', JSON.stringify(location));
      localStorage.setItem('forecast', JSON.stringify(this.forecast));
      localStorage.setItem('timestamp', new Date());
    },
    // Fetching data from localStorage or from API
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
      if (localStorage.getItem('timestamp') && localStorage.getItem('forecast')) {
        const localForecast = JSON.parse(localStorage.getItem('forecast'));

        // Checking localStorage's timestamp validity
        const dataTimestamp = new Date(localStorage.getItem('timestamp'));
        const currentDate = new Date();

        // Checking if localForecast's long and lat is same as state
        if (
          dataTimestamp.getDate() === currentDate.getDate()
          && localForecast.latitude === this.location.lat
          && localForecast.longitude === this.location.lang
        ) {
          // Setting localForecast to state
          this.forecast = localForecast;
        } else {
          // Fetching data from API
          this.getWeatherData();
        }
      }
      // Fetching data from API
      this.getWeatherData();
    },
    // Setting default data
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
    const date = new Date();
    const el = document.getElementById('color_target');

    // Adding dark class in night time
    if (date.getHours() >= 20 || date.getHours() <= 6) {
      el.classList.add('dark');
    } else {
      el.classList.remove('dark');
    }
  },
  updated() {
    // Saving data to localStorage whenever data is changed
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
  min-height: 800px;
  height: 100vh;
  min-width: 100vw;
  width: 100vw;
  overflow: auto;
  position: relative;
  @media (max-width: 375px) {
    min-height: 725px;
  }
  #app {
    height: 100%;
    width: 100%;
    background: url('./assets/bg.jpg') center center no-repeat;
    background-size: cover;
    .main_overlay {
      height: 100%;
      width: 100%;
      background: #4776E6;
      background: -webkit-linear-gradient(to left, #8E54E9, #4776E6);
      background: linear-gradient(to left, #8E54E9, #4776E6);
      opacity: 0.95;

      &.dark {
        background: #141414;
        background: -webkit-linear-gradient(to right, #000000, #141414);
        background: linear-gradient(to right, #000000, #141414);
      }

      * {
        color: #fff;
      }
      .container {
        width: 95%;
        max-width: 1250px;
        margin: 0 auto;
      }
    }
  }
  footer {
    position: absolute;
    bottom: 10px;
    right: 16px;
    color: #fff;
    a {
      color: #fff;
      transition: all 0.2s ease;
      &:hover {
        opacity: 0.7;
      }
    }
  }
}
</style>
