<template>
  <div class="modal" v-if="dayData">
    <div class="overlay">
      <div class="content">
        <div class="modal_header">
          <a href="" @click.prevent="$emit('close-modal')">
            <img src="../assets/cross.svg" alt="Close">
          </a>
        </div>
        <div class="body">
          <p class="day">{{ day }}</p>
          <p class="date">( {{ date }} )</p>
          <weather-icon :icon="icon" />
          <p class="summary">{{ dayData.summary }}</p>
          <div class="other_info">
            <p><strong>Min Temp : </strong>{{ info.lowTemp }}&deg; C</p>
            <p><strong>Max Temp : </strong>{{ info.highTemp }}&deg; C</p>
            <p><strong>Humidity : </strong>{{ info.humidity }}%</p>
            <p><strong>Pressure : </strong>{{ info.pressure }} kPa</p>
            <p><strong>Wind Speed : </strong>{{ info.windSpeed }} Km/h</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../lib/Icon';
import WeatherIcon from '../../node_modules/vue-weathericons/WeatherIcons.vue';

export default {
  name: 'modal',
  props: ['day', 'dayData'],
  data: () => ({
    date: '',
    icon: '',
    info: {
      highTemp: '',
      lowTemp: '',
      humidity: '',
      pressure: '',
      windSpeed: '',
    },
  }),
  components: {
    WeatherIcon,
  },
  created() {
    const date = new Date(this.dayData.time * 1000);
    const stringDate = date.toDateString();
    this.date = stringDate.substring(stringDate.indexOf(' '), stringDate.length);
    this.icon = Icon.getIconName(this.dayData.icon);
    const pressure = (this.dayData.pressure / 10);
    const wind = (this.dayData.windSpeed * 3.6);
    const info = {
      highTemp: this.dayData.temperatureHigh,
      lowTemp: this.dayData.temperatureLow,
      humidity: Math.round(this.dayData.humidity * 100),
      pressure: pressure % 1 === 0 ? pressure : pressure.toFixed(1),
      windSpeed: wind % 1 === 0 ? wind : wind.toFixed(1),
    };
    this.info = info;
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
      max-width: 400px;
      width: 95%;
      padding: 12px 16px 32px;
      font-weight: normal;
      * {
        color: #221814!important;
      }
      .day {
        font-weight: bold;
        font-size: 24px;
      }
      .summary,
      .day {
        text-decoration: underline;
      }
      i {
        font-size: 100px;
        margin: 32px 0;
        @media (max-width: 400px) {
          margin: 32px 0 16px;
        }
      }
      .summary {
        margin-bottom: 16px;
      }
      .other_info {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        @media (max-width: 400px) {
          flex-direction: column;
          p {
            width: 100%!important;
          }
        }
        p:not(:last-of-type) {
          width: 50%;
          margin-bottom: 8px;
        }
      }
    }
    .modal_header {
      text-align: right;
    }
  }
</style>
