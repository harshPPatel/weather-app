<template>
  <nav>
    <div class="logo">
      <a href="#" @click.prevent="$emit('refresh')">
        <img src="./../assets/logo.png" alt="Weather App Logo">
      </a>
    </div>
    <p class="location">{{ location }}</p>
    <a href="#" @click.prevent="$emit('refresh')">REFRESH</a>
  </nav>
</template>

<script>
export default {
  props: ['location'],
};
</script>

<style scoped>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>
