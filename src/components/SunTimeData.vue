<template>
  <div class="sun_timings">
    <p class="sunrise">
      <span class="svg_container">
        <img src="../assets/icons/sunrise.svg" alt="sunrise icon">
      </span>
      <strong>Sun Rise </strong> : {{ sunrise }}
    </p>
    <p class="sunset">
      <span class="svg_container">
        <img src="../assets/icons/sunset.svg" alt="sunset icon">
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
    // Converting time in string format
    this.sunrise = dateConverter(this.forecast.daily.data[0].sunriseTime);
    this.sunset = dateConverter(this.forecast.daily.data[0].sunsetTime);
  },
};
</script>

<style lang="scss" scpoed>
  .sun_timings {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 768px) {
      flex-direction: column;
      .sunrise {
        margin-right: 0!important;
        margin-bottom: 16px;
      }
    }

    .sunrise,
    .sunset {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .sunrise {
      margin-right: 32px;
    }

    .svg_container {
      height: 30px;
      margin-right: 16px;
      img {
        height: 100%;
      }
    }
  }
</style>
