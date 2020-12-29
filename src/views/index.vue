<template>
  <div class="page-index">
    <keep-alive :include="cachedViews">
      <router-view :key="key"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      layoutRoutePaths: ['/home', '/setting', '/message', '/address'],
    };
  },
  watch: {
    $route() {
      this.addCacheView();
    },
  },
  computed: {
    cachedViews() {
      return ['LayOut', ...this.$store.state.cacheView.cachedViews];
    },
    key() {
      if (this.layoutRoutePaths.includes(this.$route.path)) return 'layout';
      return this.$route.path;
    },
  },
  created() {
    this.addCacheView();
  },
  methods: {
    addCacheView() {
      const { name } = this.$route;
      if (name) {
        this.$store.dispatch('cacheView/AddCachedView', this.$route);
      }
      return false;
    },
  },
  beforeRouteUpdate(to, from, next) {
    if (this.$toast && this.$toast.isVisible()) {
      this.$toast.hide();
    }
    if (this.$loading && this.$loading.isVisible()) {
      this.$loading.hide();
    }
    next();
  },
};
</script>

<style scoped lang="scss">
.page-index {
  height: 100%;
}
</style>
