<template>
  <div></div>
</template>

<script>
export default {
  name: 'EmptyRedirect',
  created() {
    this.$router.push({ name: 'loginReal' });
  },
};
</script>

<style scoped></style>
