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
    padding-top: 10%;
    .week_data_list {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (max-width: 1366px) {
        width: 100%;
        overflow-x: auto;
      }
    }
  }
</style>
