// 使用该混入必须有 ref="pageContent" 作为记住位置的容器
import { throttle } from '@/utils';

export default {
  data() {
    return {
      pageContentOffset: 0,
    };
  },
  activated() {
    this.$refs?.pageContent.addEventListener(
      'scroll',
      throttle(this.handleScroll, 150),
      { passive: true }
    );
    if (this.pageContentOffset > 0) {
      this.$refs?.pageContent.scrollTo(0, this.pageContentOffset);
    }
  },
  deactivated() {
    this.$refs?.pageContent.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.pageContentOffset = this.$refs?.pageContent.scrollTop || 0;
    },
  },
};
