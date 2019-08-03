<template>
  <div class="main_data">
    <div class="main_info_section">
      <div class="icon">
        <div class="svg_container">
          <!-- Add SVG Here -->
          ICON
        </div>
      </div>
      <div class="temp">
        <h1>{{ temp }}</h1>
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

<style>

</style>
