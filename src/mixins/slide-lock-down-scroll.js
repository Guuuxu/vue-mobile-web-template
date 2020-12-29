// 左右滑动时禁止下拉刷新 需要自定义lockDownScroll方法并且swiper的options名称必须为swiperOption
import { debounce } from '@/utils';

export default {
  data() {
    return {
      swiperOption: {
        on: {
          sliderMove: debounce(
            () => {
              this.lockDownScroll &&
                this.lockDownScroll(this.swiper.activeIndex, true);
            },
            300,
            true
          ),
          touchEnd: () => {
            this.lockDownScroll &&
              this.lockDownScroll(this.swiper.activeIndex, false);
          },
        },
      },
    };
  },
};
