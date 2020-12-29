import FastClick from './fastclick';

export default {
  install() {
    FastClick.prototype.focus = function (targetElement) {
      targetElement.focus();
    };
    document.addEventListener(
      'DOMContentLoaded',
      () => {
        FastClick.attach(document.body);
      },
      false
    );
  },
};
