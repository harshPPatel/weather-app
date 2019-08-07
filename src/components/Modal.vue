<template>
  <div class="modal">
    <div class="overlay">
      <div class="content">
        <div class="modal_header">
          <a href="" @click.prevent="$emit('close-modal')">
            <img src="../assets/cross.svg" alt="Close">
          </a>
        </div>
        <div class="body">
          <p class="day">{{ day }}</p>
          <p class="date">{{ date }}</p>
          <weather-icon :icon="icon" />
          <p class="summary">{{ dayData.summary }}</p>
          <div class="other_info">
            <p><strong>Min Temp : </strong>{{ dayData.temperatureMin }}&deg; C</p>
            <p><strong>Max Temp : </strong>{{ dayData.temperatureMax }}&deg; C</p>
            <p><strong>Humidity : </strong>{{ dayData.humidity }}Format Value</p>
            <p><strong>Pressure : </strong>{{ dayData.pressure }}Format Value</p>
            <p><strong>Wind Speed : </strong>{{ dayData.windSpeed }}Format Value</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { tempConverter } from '../lib/Converter';
import WeatherIcon from '../../node_modules/vue-weathericons/WeatherIcons.vue';

export default {
  name: 'modal',
  props: ['day', 'dayData'],
  data: () => ({
    date: '',
    icon: '',
  }),
  components: {
    WeatherIcon,
  },
};
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(black, 0.75);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .content {
      background-color: #fff;
      * {
        color: #221814!important;
      }
    }
  }
</style>
