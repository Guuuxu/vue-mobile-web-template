<template>
  <div>
    address
    <p v-for="n in 100" :key="n">{{ n }}</p>
    <router-link to="/home/pageOne">page1</router-link>
  </div>
</template>

<script>
import saveHomeScrollPosition from '@/mixins/savehomescrollposition';

export default {
  name: 'address1',
  mixins: [saveHomeScrollPosition],
};
</script>

<style scoped></style>
