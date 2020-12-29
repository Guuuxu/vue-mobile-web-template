<template>
  <div
    class="full-screen-loading-wrapper"
    :style="{ zIndex: zIndex }"
    @touchmove.prevent=""
  >
    <spinner class="full-loading-animate" type="android"></spinner>
  </div>
</template>

<script>
import Spinner from '@/components/Spinner';

export default {
  name: 'FullScreenLoading',
  components: {
    Spinner,
  },
  props: {
    zIndex: {
      type: [String, Number],
      default: 1000,
    },
  },
};
</script>

<style scoped lang="scss">
.full-screen-loading-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  background: #ffffff;
  @include fb(center);

  .full-loading-animate {
    width: 64px;
    height: 64px;
  }
}
</style>
