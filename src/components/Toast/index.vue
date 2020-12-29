<template>
  <div class="toast-wrapper">
    <transition :name="currentTransition">
      <p
        :class="['toast-content', position, { 'no-text': type !== 'text' }]"
        v-show="visible"
      >
        <svg-icon
          icon-class="check"
          v-show="type === 'success'"
          class-name="success-check"
        ></svg-icon>
        <svg-icon
          icon-class="cancel"
          v-show="type === 'cancel'"
          class-name="cancel"
        ></svg-icon>
        <span class="content-text" v-show="!!text">{{ text }}</span>
      </p>
    </transition>
    <masker z-index="5000" opacity="0" :show="visible && showMasker" />
  </div>
</template>

<script>
import Masker from '../Masker';

export default {
  name: 'Toast',
  components: {
    Masker,
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
    duration: {
      type: [Number, String],
      default: 2000,
    },
    text: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      default: 'middle',
    },
    type: {
      // text success cancel
      type: String,
      default: 'text',
    },
    showMasker: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$watch(
      'show',
      (newVal, oldVal) => {
        if (newVal) {
          this.showToast();
        } else if (oldVal) {
          this.hideToast();
        }
      },
      {
        immediate: true,
      }
    );
  },
  methods: {
    showToast() {
      this.$emit('on-show');
      this.visible = true;
      this.clearTimer();
      this.$nextTick(() => {
        if (this.duration > 0) {
          this.timer = setTimeout(() => {
            this.hideToast();
            this.$emit('on-hide');
          }, this.duration);
        }
      });
    },
    hideToast() {
      this.visible = false;
      this.clearTimer();
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
  },
  computed: {
    currentTransition() {
      if (this.type === 'text') {
        if (this.position === 'top') {
          return 'slide-from-top';
        }
        if (this.position === 'bottom') {
          return 'slide-from-bottom';
        }
        return 'fade';
      } else {
        return 'fade';
      }
    },
  },
};
</script>

<style scoped lang="scss">
.toast-wrapper {
  .toast-content {
    .success-check,
    .cancel {
      color: #333;
      font-size: 50px;
    }

    max-width: 680px;
    display: table;
    word-break: break-all;
    background-color: hsla(0, 0%, 7%, 0.7);
    margin: 0;
    padding: 20px 24px;

    &.no-text {
      padding: 24px 28px;
      font-size: 28px;
      @include fb(flex-start);

      .content-text {
        margin-left: 10px;
      }
    }

    border-radius: 15px;
    position: fixed;
    z-index: 5001;
    left: 50%;
    text-align: left;
    vertical-align: middle;
    font-size: 24px;
    line-height: 38px;
    color: #fff;
    transform: translateX(-50%);

    &.bottom {
      bottom: 156px;
    }

    &.middle {
      top: 50%;
      transform: translate(-50%, -50%);
    }

    &.top {
      top: 156px;
    }
  }
}

.slide-from-top-enter,
.slide-from-top-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-100%) !important;
}

.slide-from-bottom-enter,
.slide-from-bottom-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(100%) !important;
}

.slide-from-top-enter-active,
.slide-from-top-leave-active,
.slide-from-bottom-enter-active,
.slide-from-bottom-leave-active {
  transition: all 0.3s cubic-bezier(0.36, 0.66, 0.04, 1);
}
</style>
