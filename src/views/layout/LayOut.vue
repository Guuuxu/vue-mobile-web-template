<template>
  <div class="app-main">
    <keep-alive>
      <router-view class="layer-router-view" />
    </keep-alive>
    <tab-bar />
  </div>
</template>

<script>
import TabBar from './components/TabBar';

export default {
  name: 'LayOut',
  components: { TabBar },
};
</script>

<style scoped lang="scss">
.app-main {
  height: 100%;
  position: relative;
}

.layer-router-view {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  @include bottomWithSafeAreaInsetBottom(100px);
  overflow-y: auto;
  background-color: #fff;
}
</style>
