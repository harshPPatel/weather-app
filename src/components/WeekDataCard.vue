<template>
  <p>{{ temp }} DAY : {{ day }}</p>
</template>

<script>
import { tempConverter } from '../lib/Converter';

export default {
  name: 'WeekDataCard',
  props: ['dayData'],
  data: () => ({
    day: '',
    temp: '',
  }),
  created() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date(this.dayData.time * 1000);
    this.day = days[date.getDay()];

    this.temp = tempConverter(this.dayData.temperatureHigh);
  },
};
</script>

<style>

</style>
