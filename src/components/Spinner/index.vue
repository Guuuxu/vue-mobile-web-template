<template>
  <span
    class="vux-spinner"
    :class="[className, customClass]"
    :style="styles"
  ></span>
</template>

<script>
import Spinner from './spinner';

const types = [
  'android',
  'ios',
  'ios-small',
  'bubbles',
  'circles',
  'crescent',
  'dots',
  'lines',
  'ripple',
  'spiral',
];
export default {
  name: 'spinner',
  mounted() {
    this.$nextTick(() => {
      Spinner(this.$el, this.type, this.size);
    });
  },
  props: {
    type: {
      type: String,
      default: 'ios',
    },
    size: String,
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    styles() {
      if (typeof this.size !== 'undefined' && this.size !== '28px') {
        return {
          width: this.size,
          height: this.size,
        };
      } else {
        return {};
      }
    },
    className() {
      const rs = {};
      for (let i = 0; i < types.length; i++) {
        rs[`vux-spinner-${types[i]}`] = this.type === types[i];
      }
      return rs;
    },
  },
};
</script>

<style scoped>
.vux-spinner {
  stroke: #444;
  fill: #444;
  vertical-align: middle;
  display: inline-block;
  width: 56px;
  height: 56px;
}

.vux-spinner svg {
  width: 56px;
  height: 56px;
}

.vux-spinner.vux-spinner-inverse {
  stroke: #fff;
  fill: #fff;
}

.vux-spinner-android {
  stroke: #4b8bf4;
}

.vux-spinner-ios,
.vux-spinner-ios-small {
  stroke: #69717d;
}
</style>
