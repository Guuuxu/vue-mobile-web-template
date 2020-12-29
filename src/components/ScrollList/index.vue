<template>
  <div class="scroll-list-wrap" ref="scrollListWrap">
    <scroll-view
      ref="scroll"
      :up="upOption"
      :down="downOption"
      :tip-text="tipText"
      :custom-empty="customEmpty"
      @pull-up="pullUpHandler"
      @init="scrollInit"
    >
      <ul class="scroll-list">
        <li class="scroll-list-item" v-for="(row, index) in list" :key="row.id">
          <slot :item="row" :index="index"></slot>
        </li>
      </ul>
    </scroll-view>
  </div>
</template>

<script>
export default {
  name: 'ScrollList',
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    upOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    downOption: {
      type: Object,
      default: () => {
        return {};
      },
    },
    //用tab切换时,tab的index。
    index: {
      type: Number,
      default: 0,
    },
    // 定义空内容
    customEmpty: {
      type: Boolean,
      default: false,
    },
    tipText: {
      type: String,
      default: '',
    },
  },
  computed: {
    scrollDom() {
      return this.$refs?.scroll;
    },
  },
  watch: {
    list(val) {
      const htmlNodataDom = this.$refs?.scrollListWrap?.querySelector(
        '.global-nodata'
      );
      if (!htmlNodataDom) return;
      //list为空时不显示上拉没有更多数据
      if (!val.length) {
        htmlNodataDom.style.display = 'none';
      } else {
        if (htmlNodataDom.style.display === 'none') {
          htmlNodataDom.style.display = 'block';
        }
      }
    },
  },
  methods: {
    scrollInit(scroll) {
      this.scroll = scroll;
    },
    pullUpHandler(params) {
      this.$emit('pull-up', { ...params, index: this.index });
    },
    refresh() {
      this.scrollDom?.reset();
    },
  },
};
</script>

<style scoped>
.scroll-list-wrap {
  height: 100%;
}
</style>
