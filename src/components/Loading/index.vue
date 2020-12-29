<template>
  <div class="loading-wrapper">
    <transition name="fade">
      <p class="loading-content" v-show="visible">
        <!--<span class="loading large"></span>-->
        <spinner type="ios-small" custom-class="content-loading"></spinner>
        <span class="content-text" v-show="!!text">{{ text }}</span>
      </p>
    </transition>
    <masker z-index="5000" opacity=".3" :show="visible" />
  </div>
</template>

<script>
import Masker from '../Masker';
import Spinner from '@/components/Spinner';

export default {
  name: 'Loading',
  components: {
    Masker,
    Spinner,
  },
  data() {
    return {
      visible: false,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: '',
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.$emit('on-show');
      } else {
        this.$emit('on-hide');
      }
    },
    show(val) {
      this.visible = val;
    },
  },
};
</script>

<style scoped lang="scss">
.content-loading {
  stroke: #fff;

  svg {
    width: 66px;
    height: 66px;
  }

  width: 66px;
  height: 66px;
}

.loading-wrapper {
  .loading-content {
    max-width: 680px;
    display: table;
    word-break: break-all;
    background-color: hsla(0, 0%, 7%, 0.7);
    margin: 0;
    padding: 20px 26px;
    font-size: 28px;
    @include fb(flex-start);

    .content-text {
      margin-left: 10px;
    }

    border-radius: 15px;
    position: fixed;
    z-index: 5001;
    left: 50%;
    top: 50%;
    color: #fff;
    transform: translate(-50%, -50%);
  }
}
</style>
