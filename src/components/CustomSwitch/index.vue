<template>
  <div class="switch-wrap">
    <input
      type="checkbox"
      class="input-switch"
      :disabled="disabled"
      v-model="currentValue"
    />
    <div v-if="preventDefault" class="switch-overly" @click="onClick"></div>
  </div>
</template>

<script>
export default {
  name: 'CustomSwitch',
  data() {
    return {
      currentValue: this.toBoolean(this.value),
    };
  },
  props: {
    disabled: Boolean,
    value: {
      type: [Boolean, String, Number],
      default: false,
    },
    preventDefault: Boolean,
    valueMap: {
      type: Array,
      default: () => [false, true],
    },
  },
  watch: {
    currentValue(val) {
      const rawValue = this.toRaw(val);
      this.$emit('input', rawValue);
      this.$emit('change', rawValue);
    },
    value(val) {
      this.currentValue = this.toBoolean(val);
    },
  },
  methods: {
    onClick() {
      this.$emit('click', !this.currentValue, this.currentValue);
    },
    toBoolean(val) {
      if (!this.valueMap) {
        return val;
      } else {
        const index = this.valueMap.indexOf(val);
        return index === 1;
      }
    },
    toRaw(val) {
      if (!this.valueMap) {
        return val;
      } else {
        return this.valueMap[val ? 1 : 0];
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import '~@styles/switch/variables';

.switch-wrap {
  position: relative;
  display: inline-block;
  font-size: 0;

  .input-switch {
    position: relative;
    width: $switch-width;
    height: $switch-height;
    border-radius: $switch-border-radius;
    background: $switch-default-bg-color;
    transition: background-color 0.1s;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: $switch-border-radius;
      background: $switch-default-bg-color;
      /*transition: transform .35s cubic-bezier(0.45, 1, 0.4, 1);*/
    }

    &:after {
      content: '';
      position: absolute;
      top: 3px;
      left: 4px;
      border-radius: 50%;
      width: $switch-inner-block-w-h;
      height: $switch-inner-block-w-h;
      background: #ffffff;
      transition: transform 0.35s;
    }

    &:checked {
      background: $switch-checked-bg-color;

      &:before {
        transform: scale(0);
      }

      &:after {
        transform: translateX($switch-width - 8px - $switch-inner-block-w-h);
      }
    }
  }

  input.input-switch[disabled] {
    opacity: $switch-disabled-opacity;
  }

  .switch-overly {
    width: $switch-width;
    height: $switch-height;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
  }
}
</style>
