<template>
  <div class="main_data">
    <div class="main_info_section">
      <div class="icon">
        <div class="svg_container">
          <skycon :condition="forecast.currently.icon" height=115 width=115 />
        </div>
      </div>
      <div class="temp">
        <h1>{{ temp }}&deg; C</h1>
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
import { tempConverter } from '../lib/Converter';

export default {
  name: 'MainData',
  props: ['forecast'],
  data: () => ({
    temp: '',
    humidity: '',
    pressure: '',
    wind: '',
  }),
  mounted() {
    this.temp = tempConverter(this.forecast.currently.temperature);
    this.humidity = Math.round(this.forecast.currently.humidity * 100);
    const pressure = (this.forecast.currently.pressure / 10);
    this.pressure = pressure % 1 === 0 ? pressure : pressure.toFixed(1);
    const wind = (this.forecast.currently.windSpeed * 3.6);
    this.wind = wind % 1 === 0 ? wind : wind.toFixed(1);
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
    }

    .temp {
      text-align: left;
      h1 {
        font-size: 64px;
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
