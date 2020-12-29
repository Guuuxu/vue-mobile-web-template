export default {
  data() {
    return {
      swiperOption: {
        on: {
          transitionEnd: () => {
            this.swiper && this.$emit('input', this.swiper.activeIndex);
          },
        },
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs?.swiper?.$swiper;
    },
  },
  methods: {
    upOptionHandler(tabIndex) {
      const isAuto = tabIndex === 0;
      return {
        auto: isAuto,
      };
    },
  },
};
