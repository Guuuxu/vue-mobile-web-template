<template>
  <div class="confirm-wrapper" v-fake-back="{ model: visible, cb: hide }">
    <masker :show="visible" z-index="4999"></masker>
    <transition name="alert-in">
      <div class="confirm-container" @touchmove.prevent="" v-show="visible">
        <h2>{{ title }}</h2>
        <p class="content">{{ content }}</p>
        <div class="foot">
          <span class="btn-ft" v-show="showCancel" @click="cancelHandler">{{
            cancelText
          }}</span>
          <span class="btn-ft" @click="confirmHandler">{{ confirmText }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Masker from '../Masker';

export default {
  name: 'Confirm',
  components: {
    Masker,
  },
  data() {
    return {
      visible: false,
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.$emit('show');
      } else {
        this.$emit('hide');
      }
    },
    show(val) {
      this.visible = val;
    },
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '提示',
    },
    content: {
      type: String,
      default: '确定此操作吗?',
    },
    confirmText: {
      type: String,
      default: '确定',
    },
    showCancel: {
      type: Boolean,
      default: true,
    },
    cancelText: {
      type: String,
      default: '取消',
    },
  },
  methods: {
    confirmHandler() {
      this.$emit('confirm');
      this.hide();
    },
    cancelHandler() {
      this.$emit('cancel');
      this.hide();
    },
    hide() {
      this.visible = false;
      this.$emit('update:show', false);
    },
  },
};
</script>

<style scoped lang="scss">
.confirm-container {
  width: 652px;
  background-color: #fff;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 5000;
  border-radius: 6px;
  display: table;
  padding: 58px 38px 27px 50px;

  h2 {
    font-size: 34px;
    color: #333;
    font-weight: normal;
  }

  .content {
    font-size: 30px;
    color: #626262;
    margin: 30px 0;
    line-height: 38px;
    word-break: break-all;
  }

  .foot {
    font-size: 28px;
    color: #0e8bff;
    @include fb(flex-end);

    .btn-ft {
      width: 130px;
      height: 70px;
      @include fb(center);
      border-radius: 6px;

      &:active {
        background-color: #dcdcdc;
      }

      &:last-child {
        margin-left: 7px;
      }
    }
  }
}
</style>
