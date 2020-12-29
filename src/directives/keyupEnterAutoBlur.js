import Vue from 'vue';

Vue.directive('KeyupEnterAutoBlur', {
  inserted(el) {
    el.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        el.blur();
      }
    });
  },
});
