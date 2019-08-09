<template>
  <div class="main_data">
    <div class="main_info_section">
      <div class="icon" id="main_icon">
        <div class="svg_container">
          <weather-icon :icon="icon" />
        </div>
      </div>
      <div class="temp">
        <h1>{{ forecast.currently.temperature.toFixed(0) }}<span>&deg;</span> C</h1>
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
import Icon from '../lib/Icon';

export default {
  name: 'MainData',
  props: ['forecast'],
  components: {
    WeatherIcon,
  },
  data: () => ({
    humidity: '',
    pressure: '',
    wind: '',
    icon: '',
  }),
  mounted() {
    this.humidity = Math.round(this.forecast.currently.humidity * 100);
    const pressure = (this.forecast.currently.pressure / 10);
    this.pressure = pressure % 1 === 0 ? pressure : pressure.toFixed(1);
    const wind = (this.forecast.currently.windSpeed * 3.6);
    this.wind = wind % 1 === 0 ? wind : wind.toFixed(1);
    this.icon = Icon.getIconName(this.forecast.currently.icon);
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

    @media (max-width: 468px) {
      margin-bottom: 70px;
    }
    @media (max-width: 375px) {
      margin-bottom: 40px;
      margin-top: 40px;
    }

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

    @media (max-width: 768px) {
      flex-direction: column;
      p:not(:last-of-type) {
        margin-right: 0!important;
        margin-bottom: 16px;
      }
    }

    p:not(:last-of-type) {
      margin-right: 24px;
    }
  }
</style>
