<template>
  <div class="main_data">
    <div class="main_info_section">
      <div class="icon" id="main_icon">
        <div class="svg_container">
          <weather-icon :icon="icon" />
        </div>
      </div>
      <div class="temp">
        <h1>{{ temp }}<span>&deg;</span> C</h1>
        <p>{{ forecast.currently.summary }}</p>
      </div>
    </div>
    <div class="secondary_info_section">
      <p><strong>Humidity : </strong> {{ humidity }}% </p>
      <p><strong>Pressure : </strong> {{ pressure }} kPa </p>
      <p><strong>Wind : </strong> {{ wind }} Km/h </p>
    </div>
  </div>
</template>

<script>
import WeatherIcon from '../../node_modules/vue-weathericons/WeatherIcons.vue';
import { tempConverter } from '../lib/Converter';

export default {
  name: 'MainData',
  props: ['forecast'],
  components: {
    WeatherIcon,
  },
  data: () => ({
    temp: '',
    humidity: '',
    pressure: '',
    wind: '',
    icon: '',
  }),
  mounted() {
    this.temp = tempConverter(this.forecast.currently.temperature);
    this.humidity = Math.round(this.forecast.currently.humidity * 100);
    const pressure = (this.forecast.currently.pressure / 10);
    this.pressure = pressure % 1 === 0 ? pressure : pressure.toFixed(1);
    const wind = (this.forecast.currently.windSpeed * 3.6);
    this.wind = wind % 1 === 0 ? wind : wind.toFixed(1);
    const { icon } = this.forecast.currently;
    this.icon = icon;
    switch (icon) {
      case 'rain':
        this.icon = 'raindrop';
        break;
      case 'clear-day':
        this.icon = 'day-sunny';
        break;
      case 'clear-night':
        this.icon = 'night-clear';
        break;
      case 'wind':
        this.icon = 'windy';
        break;
      case 'partly-cloudy-day':
        this.icon = 'day-cloudy';
        break;
      case 'partly-cloudy-night':
        this.icon = 'night-alt-cloudy';
        break;
      case 'thunderstorm':
        this.icon = 'lightning';
        break;
      default:
        this.icon = icon;
        break;
    }
  },
};
</script>

<style lang="scss" scoped>
  .main_info_section {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    margin-top: 70px;
    margin-bottom: 40px;

    .icon {
      margin-right: 32px;
      i {
        margin-top: 0.75rem;
        font-size: 100px;
      }
    }

    .temp {
      text-align: left;
      h1 {
        font-size: 64px;
        span {
          color: #F8B62D!important;
        }
      }
      p {
        font-weight: bold;
      }
    }
  }

  .secondary_info_section {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    p:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
