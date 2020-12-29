<template>
  <sub-page title="pageOne">
    <router-link to="/home/pageFour">page4</router-link>
    <p v-for="n in 100" :key="n">{{ n }}</p>
    <router-link to="/home/pageFour">page4</router-link>
  </sub-page>
</template>

<script>
export default {
  name: 'home.pageOne',
};
</script>

<style scoped></style>
