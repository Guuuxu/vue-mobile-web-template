export default {
  data() {
    return {
      homePageOffsetTop: 0,
      homePageLayer: null,
    };
  },
  mounted() {
    this.homePageLayer = this.$el;
  },
  activated() {
    this.homePageLayer.scrollTop = this.homePageOffsetTop;
  },
  beforeRouteLeave(to, from, next) {
    this.homePageOffsetTop = this.homePageLayer.scrollTop;
    next();
  },
};
