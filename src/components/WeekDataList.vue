<template>
  <div class="container">
    <ul class="week_data_list">
      <week-data-card
        v-for="day in dailyData"
        :key="day.time"
        :dayData="day" />
    </ul>
  </div>
</template>

<script>
import WeekDataCard from './WeekDataCard.vue';

export default {
  name: 'WeekDataList',
  props: ['dailyData'],
  components: {
    WeekDataCard,
  },
};
</script>

<style lang="scss" scoped>
  .container {
    padding-top: 8%;
  }
</style>
