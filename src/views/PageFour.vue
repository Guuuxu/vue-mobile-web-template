<template>
  <sub-page title="PageFour" background="#fff">
    <scroll-view>
      <p v-for="n in 100" :key="n">{{ n }}</p>
      <router-link to="/home/pageTwo">page2</router-link>
    </scroll-view>
  </sub-page>
</template>

<script>
export default {
  name: 'home.pageFour',
};
</script>

<style scoped></style>
