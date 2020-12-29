<template>
  <div
    class="mescroll fix-safari-overflow-scrolling"
    :style="[overflowStyle]"
    ref="mescroll"
  >
    <div class="mescroll-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import MeScroll from 'mescroll.js';
import 'mescroll.js/mescroll.min.css';
import merge from '@/utils/merge';

export default {
  name: 'Scroll',
  data() {
    return {
      mescroll: null,
      scrollTop: 0,
    };
  },
  props: {
    down: {
      type: Object,
      default: () => {
        return {};
      },
    },
    up: {
      type: Object,
      default: () => {
        return {};
      },
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
    // 是否阻止滚动
    ifForbidScroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    overflowStyle() {
      return { 'overflow-y': this.ifForbidScroll ? 'hidden' : 'auto' };
    },
  },
  mounted() {
    // 下拉布局内容
    const pullDownHtmlContent = `<div class="pull-down-unload-wrapper">
            <svg class="refresh-arrow-top" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <path d="M537.6 230.4L704 390.4c12.8 12.8 12.8 32 0 44.8s-32 12.8-44.8 0L544 326.4v448c0 19.2-12.8 32-32 32s-32-12.8-32-32v-448L364.8 441.6c-12.8 6.4-32 6.4-44.8-6.4-12.8-12.8-12.8-32 0-44.8l160-160c6.4-6.4 32-32 57.6 0z"
                      fill="#a5a5a5">
                </path>
            </svg>
            <span class="pull-down-loading-tip">下拉刷新</span>
        </div>
        <div class="pull-down-onload-wrapper">
            <span class="loading"></span>
            <span class="pull-down-loading-tip tip-loading">刷新中</span>
        </div>
        <div class="refresh-success-wrapper">
               <svg class="refresh-success-icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M511.974401 0c-282.75527 0-511.974401 229.219131-511.974401 511.974401 0 282.757318 229.219131 511.974401 511.974401 511.974401 282.757318 0 511.974401-229.217083 511.974401-511.974401C1023.948803 229.219131 794.729672 0 511.974401 0zM805.63063 379.174385 474.510162 710.296901c0 0-0.004096 0.004096-0.010239 0.010239-15.265029 15.269125-38.541433 17.652877-56.31104 7.157402-3.290971-1.945503-6.393536-4.333351-9.219635-7.157402-0.002048-0.004096-0.006144-0.006144-0.006144-0.006144l-190.642884-190.642884c-18.095223-18.095223-18.095223-47.4375 0-65.536819 18.095223-18.095223 47.4375-18.095223 65.532723 0l157.884714 157.884714 298.362298-298.362298c18.097271-18.095223 47.439548-18.095223 65.534771 0C823.725854 331.738933 823.725854 361.079162 805.63063 379.174385z" fill="#a5a5a5"></path></svg>
                <span class="refresh-success-tip">刷新成功</span>
            </div>`;
    // 上拉布局内容
    const pullUpHtmlContent = `<div class="pull-up-wrapper">
            <span class="loading"></span>
            <span class="pull-up-loading-tip">加载中...</span>
        </div>`;
    const vm = this;
    // 上拉和下拉默认配置
    this.downDefault = {
      use: true,
      offset: 60, // 触发刷新的距离
      auto: false, // 是否在初始化完毕之后自动执行一次下拉刷新的回调 callback
      autoShowLoading: false, // 如果在初始化完毕之后自动执行下拉回调,是否显示下拉刷新进度; 默认false
      isLock: false, // 是否锁定下拉,默认false;
      htmlContent: pullDownHtmlContent, // 下拉布局内容
      inited(mescroll, downwarp) {
        mescroll.downOnLoadDom = downwarp.getElementsByClassName(
          'pull-down-onload-wrapper'
        )[0];
        mescroll.downUnloadDom = downwarp.getElementsByClassName(
          'pull-down-unload-wrapper'
        )[0];
        mescroll.downSuccessDom = downwarp.getElementsByClassName(
          'refresh-success-wrapper'
        )[0];
        mescroll.downTipDom = downwarp.getElementsByClassName(
          'pull-down-loading-tip'
        )[0];
        mescroll.downArrowDom = downwarp.getElementsByClassName(
          'refresh-arrow-top'
        )[0];
      },
      inOffset(mescroll) {
        // 进入指定距离范围内那一刻的回调
        mescroll.downOnLoadDom.style.display = 'none';
        mescroll.downSuccessDom.style.display = 'none';
        mescroll.downUnloadDom.style.display = 'flex';
        mescroll.downTipDom.innerText = '下拉刷新';
        mescroll.downArrowDom.classList.remove('up');
      },
      outOffset(mescroll) {
        // 下拉超过指定距离那一刻的回调
        mescroll.downTipDom.innerText = '释放更新';
        mescroll.downArrowDom.classList.add('up');
        mescroll.downSuccessDom.style.display = 'none';
      },
      /* 下拉过程中的回调,滑动过程一直在执行; rate下拉区域当前高度与指定距离的比值(inOffset: rate<1; outOffset: rate>=1); downHight当前下拉区域的高度 */
      /* onMoving (mescroll, rate, downHight) {
      }, */
      showLoading(mescroll) {
        // 触发下拉刷新的回调
        mescroll.downOnLoadDom.style.display = 'flex';
        mescroll.downUnloadDom.style.display = 'none';
        mescroll.downSuccessDom.style.display = 'none';
        mescroll.downTipDom.innerText = '下拉刷新';
        mescroll.downArrowDom.classList.remove('up');
      },
      afterLoading(mescroll) {
        mescroll.downOnLoadDom.style.display = 'none';
        mescroll.downSuccessDom.style.display = 'flex';
        return 300;
      },
      callback(mescroll) {
        mescroll.resetUpScroll();
      },
    };
    this.upDefault = {
      use: true,
      auto: true, // 初始化完毕,是否自动触发上拉加载的回调
      isBoth: false, // 上拉加载时,如果滑动到列表顶部是否可以同时触发下拉刷新;默认false,两者不可同时触发;
      isBounce: true, // 此处禁止ios回弹
      noMoreSize: 5, // 如果列表已无数据,可设置列表总数大于5才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
      page: {
        num: 0, // 当前页 默认0,回调之前会加1; 即callback(page)会从1开始
        size: 10, // 每页数据条数,默认10
      },
      loadFull: {
        // use : 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或无数据; 默认false,因为可调大page.size使数据满屏.delay : 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
        use: false,
        delay: 500,
      },
      lazyLoad: {
        use: false, // 是否开启懒加载,默认false
        attr: 'img-url', // html标签中,存放网络图片地址的属性名: <img src='占位图' imgurl='网络图'/>
        showClass: 'mescroll-lazy-in', // 显示样式,参见mescroll.css
        delay: 500, // 列表滚动的过程中每500ms检查一次图片是否在可视区域,如果在可视区域则加载图片
        offset: 200, // 超出可视区域200px的图片仍可触发懒加载,目的是提前加载部分图片
      },
      scrollbar: {
        use: false,
        barClass: 'mescroll-bar',
      },
      empty: {
        // 列表第一页无任何数据时,显示的空提示布局; 需配置warpId才生效;
        warpId: vm.customEmpty ? null : vm.$refs.mescroll, // 父布局的id; 如果此项有值,将不使用clearEmptyId的值;
        icon: require('@assets/empty/mescroll/mescroll-empty.png'), // 图标,默认null
        tip: vm.tipText || '空空如也', // 提示
        /* btntext: '去逛逛 >', // 按钮,默认""
           btnClick: function () { // 点击按钮的回调,默认null
               alert('点击了按钮,具体逻辑自行实现')
           },
           supportTap: false // 默认点击事件用onclick,会有300ms的延时;如果您的运行环境支持tap,则可配置true; */
      },
      htmlLoading: pullUpHtmlContent,
      htmlNodata: '<p class="global-nodata">亲,没有更多数据了~</p>',
      showLoading(mescroll, upwarp) {
        // 上拉加载中...
        upwarp.innerHTML = mescroll.optUp.htmlLoading;
      },
      showNoMore(mescroll, upwarp) {
        // 无更多数据
        upwarp.innerHTML = mescroll.optUp.htmlNodata;
      },
      callback(page, mescroll) {
        vm.$emit('pull-up', { page, scroll: mescroll });
      },
      onScroll(mescroll, y, isUp) {
        // 列表滑动监听,默认onScroll: null;
        // y为列表当前滚动条的位置
        vm.scrollTop = y;
        vm.$emit('scroll', y, isUp);
      },
    };
    this.initScroll();
  },
  watch: {
    tipText() {
      this.initScroll();
    },
  },
  activated() {
    if (this.mescroll) {
      // 恢复到之前设置的isBounce状态
      if (this.mescroll.lastBounce != null)
        this.mescroll.setBounce(this.mescroll.lastBounce);
      // 滚动到之前列表的位置 (注意:路由使用keep-alive才生效)
      if (this.mescroll.lastScrollTop) {
        this.mescroll.setScrollTop(this.mescroll.lastScrollTop);
        setTimeout(() => {
          // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
          this.mescroll.setTopBtnFadeDuration(0); // 设置回到顶部按钮显示时无渐显动画
        }, 16);
      }
    }
  },
  deactivated() {
    if (this.mescroll) {
      this.mescroll.lastBounce = this.mescroll.optUp.isBounce; // 记录当前是否禁止ios回弹
      this.mescroll.setBounce(true); // 允许bounce
      this.mescroll.lastScrollTop = this.scrollTop; // 记录当前滚动条的位置
      this.mescroll.hideTopBtn(0); // 隐藏回到顶部按钮,无渐隐动画
    }
  },
  methods: {
    initScroll() {
      this.mescroll = new MeScroll(this.$refs.mescroll, {
        down: merge(this.downDefault, this.down),
        up: merge(this.upDefault, this.up),
      });
      this.$emit('init', this.mescroll);
    },
    async reset() {
      this.mescroll.scrollTo(0, 0);
      setTimeout(() => {
        this.mescroll.resetUpScroll();
      }, 100);
    },
    resetUpScroll() {
      this.mescroll.resetUpScroll();
    },
    scrollTo(y, t) {
      this.mescroll.scrollTo(y, t);
    },
    triggerDownScroll() {
      this.mescroll.scrollTo(0, 0);
      setTimeout(() => {
        this.mescroll.triggerDownScroll();
      }, 100);
    },
  },
};
</script>
