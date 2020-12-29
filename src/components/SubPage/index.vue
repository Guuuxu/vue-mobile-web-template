<template>
  <div
    class="sub-page-wrapper fix-safari-overflow-scrolling"
    ref="pageContent"
    :style="{ background }"
  >
    <slot></slot>
    <full-screen-loading v-if="loading"></full-screen-loading>
  </div>
</template>

<script>
import savePosition from '@/mixins/save-positition';
import FullScreenLoading from '@/components/FullScreenLoading/index';

export default {
  name: 'SubPage',
  mixins: [savePosition],
  components: { FullScreenLoading },
  props: {
    //标题
    title: {
      type: String,
      default: '',
    },
    //页面背景
    background: {
      type: String,
      default: '#f7f7f7',
    },
    //一直缓存当前页面
    alwaysCache: {
      type: Boolean,
      default: false,
    },
    //页面加载动画
    loading: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$eventBus.$on('fake-back-executed', () => {
      //防止按安卓虚拟返回键时标题改变
      document.title = '';
      this.setDocumentTitle();
    });
    this.$once('hook:beforeDestroy', () => {
      this.$eventBus.$off('fake-back-executed');
    });
  },
  activated() {
    this.setDocumentTitle();
    this.currentRouteInfo = this.$route;
  },
  deactivated() {
    // 返回上一级清除缓存
    setTimeout(async () => {
      if (this.$route.meta.hashType === 'back' && !this.alwaysCache) {
        await this.$store.dispatch(
          'cacheView/DelCachedView',
          this.currentRouteInfo
        );
      }
    }, 250);
  },
  methods: {
    setDocumentTitle() {
      if (this.title) {
        //设置标题
        document.title = this.title;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.sub-page-wrapper {
  @include allcover;
  overflow-y: auto;
}
</style>
