import Vue from 'vue';

Vue.directive('FakeFocusAble', {
  inserted: function (el) {
    el.addEventListener('click', () => el.focus());
  },
});
