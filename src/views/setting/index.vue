<template>
  <div>
    setting
    <p v-for="n in 100" :key="n">{{ n }}</p>
    <router-link to="/home/pageOne">page1</router-link>
  </div>
</template>

<script>
import saveHomeScrollPosition from '@/mixins/savehomescrollposition';

export default {
  name: 'setting',
  mixins: [saveHomeScrollPosition],
};
</script>

<style scoped></style>
