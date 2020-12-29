<template>
  <nav class="tab-bar">
    <div
      v-for="tab in tabList"
      :key="tab.routeName"
      :class="['tab-item', { active: currentTab === tab.routeName }]"
      @click="tabClickHandler(tab)"
    >
      {{ tab.name }}
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabList: [
        {
          name: '首页',
          routeName: 'home',
        },
        {
          name: '消息',
          routeName: 'message',
        },
        {
          name: '通讯录',
          routeName: 'address',
        },
        {
          name: '设置',
          routeName: 'setting',
        },
      ],
      currentTab: 'home',
    };
  },
  watch: {
    $route(to) {
      this.currentTab = to.name;
    },
  },
  created() {
    document.title = this.tabList.find(
      (tab) => tab.routeName === this.currentTab
    ).name;
  },
  methods: {
    tabClickHandler({ routeName, name }) {
      if (this.currentTab !== routeName) {
        document.title = name;
        this.$router.push({ name: routeName });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 101;
  @include heightWithSafeAreaInsetBottom(100px);
  @include fb(space-between, flex-start);

  .tab-item {
    position: relative;
    flex: 1;
    height: 100px;
    background-color: #f7f7f7;
    color: #929292;
    font-size: 22px;
    @include fb(flex-start, center, column);

    &.active {
      color: #007aff;
    }
  }
}
</style>
