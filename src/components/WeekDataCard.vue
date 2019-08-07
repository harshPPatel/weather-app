<template>
  <li @click="toggleModal">
    <p class="day">{{ day }}</p>
    <weather-icon :icon="icon" />
    <p class="temp">{{ temp }}<span>&deg;</span> C</p>
    <modal
      v-if="isModalOpen"
      :day="day"
      :dayData="dayData" />
  </li>
</template>

<script>
import { tempConverter } from '../lib/Converter';
import Icon from '../lib/Icon';
import WeatherIcon from '../../node_modules/vue-weathericons/WeatherIcons.vue';
import Modal from './Modal.vue';

export default {
  name: 'WeekDataCard',
  props: ['dayData'],
  data: () => ({
    day: '',
    temp: '',
    icon: '',
    isModalOpen: false,
  }),
  components: {
    WeatherIcon,
    Modal,
  },
  created() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date(this.dayData.time * 1000);
    this.day = days[date.getDay()];
    this.temp = tempConverter(this.dayData.temperatureHigh);
  },
  methods: {
    toggleModal() {
      this.isModalOpen = !this.isModalOpen;
    },
  },
  mounted() {
    this.icon = Icon.getIconName(this.dayData.icon);
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
