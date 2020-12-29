import Vue from 'vue';
import Flash from '@/plugins/flash';
let _stack = Flash.$instance.getItem('fake-back');
Vue.directive('FakeBack', {
  componentUpdated(el, binding) {
    if (!_stack) {
      _stack = [];
      Flash.$instance.setItem('fake-back', _stack);
    }
    if (binding.oldValue.model === binding.value.model) {
      return;
    }

    if (binding.value.model) {
      _stack.push(function () {
        binding.value.cb();
      });
    } else {
      _stack.pop();
    }
  },
  unbind() {
    if (_stack) {
      const cb = _stack[_stack.length - 1];
      if (cb) {
        _stack.pop();
      }
    }
  },
});
