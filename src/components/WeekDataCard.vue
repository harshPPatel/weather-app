<template>
  <li>
    <p class="day">{{ day }}</p>
    <weather-icon :icon="icon" />
    <p class="temp">{{ temp }}<span>&deg;</span> C</p>
  </li>
</template>

<script>
import { tempConverter } from '../lib/Converter';
import WeatherIcon from '../../node_modules/vue-weathericons/WeatherIcons.vue';

export default {
  name: 'WeekDataCard',
  props: ['dayData'],
  data: () => ({
    day: '',
    temp: '',
    icon: '',
  }),
  components: {
    WeatherIcon,
  },
  created() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date(this.dayData.time * 1000);
    this.day = days[date.getDay()];
    this.temp = tempConverter(this.dayData.temperatureHigh);
  },
  mounted() {
    const { icon } = this.dayData;
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
  li {
    height: 150px;
    width: 130px;
    min-width: 130px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    background-color: #fff;
    box-shadow: 0 6px 24px rgba(black, 0.3);
    cursor: pointer;

    @media (max-width: 1366px) {
      margin-right: 12px;
    }

    * {
      color: #0A0A0A!important;
      font-weight: bold;
    }
    i {
      font-size: 40px;
      font-weight: normal!important;
    }
  }
</style>
