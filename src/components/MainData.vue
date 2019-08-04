<template>
  <header>
    <sun-time-data :forecast="forecast" />
    <current-data :forecast="forecast" />
  </header>
</template>

<script>
import SunTimeData from './SunTimeData.vue';
import CurrentData from './CurrentData.vue';

export default {
  name: 'MainData',
  props: ['forecast'],
  data: () => ({}),
  components: {
    SunTimeData,
    CurrentData,
  },
};
</script>

<style lang="scss">
  header {
    height: 40%;
    margin-top: 8%;
  }
</style>
