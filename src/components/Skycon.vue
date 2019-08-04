<template>
  <canvas :id="id" :width="width" :height="height" :color="color"></canvas>
</template>

<script>
import Skycons from '../lib/skycons';

export default {
  props: {
    // Icon size
    width: {
      type: Number,
      default: 64,
    },
    height: {
      type: Number,
      default: 64,
    },

    // Weather condition
    condition: {
      type: String,
      default: null,
    },

    // Color
    color: {
      type: String,
      default: 'black',
    },
  },
  data: () => ({
    id: `canvas__${Date.now().valueOf()}${Math.floor(10000 * Math.random())}`,
  }),
  mounted() {
    const $skycons = new Skycons(this.id);
    $skycons.set(this.id, Skycons[this.icon]);
  },
  computed: {
    icon: () => {
      if (!this.condition) return 'CLEAR_DAY';
      return this.condition.toUpperCase().replace(/-/g, '_');
    },
  },
};
</script>
