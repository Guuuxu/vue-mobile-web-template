import Vue from 'vue';
const eventBus = new Vue();
export default {
  install(target) {
    target.prototype.$eventBus = eventBus;
  },
  $instance: eventBus,
};
