import Vue from 'vue';

Vue.mixin({
  mounted() {
    const inputs = document.querySelectorAll('input');
    const textareas = document.querySelectorAll('textarea');
    if (inputs.length > 0) {
      for (let i = 0, len = inputs.length; i < len; i++) {
        inputs[i].addEventListener('blur', () => {
          window.scrollTo(0, 0);
        });
      }
    }
    if (textareas.length > 0) {
      for (let i = 0, len = textareas.length; i < len; i++) {
        textareas[i].addEventListener('blur', () => {
          window.scrollTo(0, 0);
        });
      }
    }
  },
});
