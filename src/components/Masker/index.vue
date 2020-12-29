<template>
  <transition :name="isTransition ? 'fade' : ''">
    <div
      class="mask"
      :style="{ background: `rgba(0,0,0,${opacity})`, zIndex: zIndex }"
      @touchmove.prevent="$emit('click')"
      @click="$emit('click')"
      v-show="show"
    ></div>
  </transition>
</template>

<script>
export default {
  name: 'Masker',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    opacity: {
      default: 0.5,
    },
    zIndex: {
      default: 998,
    },
    isTransition: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped lang="scss">
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
