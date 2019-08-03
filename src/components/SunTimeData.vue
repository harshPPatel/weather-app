<template>
  <div class="sun_timings">
    <p class="sunrise">
      <span class="svg_container">
        <!-- Add SVG -->
      </span>
      <strong>Sun Rise </strong> : {{ sunrise }}
    </p>
    <p class="sunset">
      <span class="svg_container">
        <!-- Add SVG -->
      </span>
      <strong>Sun Set </strong> : {{ sunset }}
    </p>
  </div>
</template>

<script>
import { dateConverter } from '../lib/Converter';

export default {
  name: 'SunTimeData',
  props: ['forecast'],
  data: () => ({
    sunrise: '',
    sunset: '',
  }),
  created() {
    this.sunrise = dateConverter(this.forecast.daily.data[0].sunriseTime);
    this.sunset = dateConverter(this.forecast.daily.data[0].sunsetTime);
  },
};
</script>

<style>

</style>
