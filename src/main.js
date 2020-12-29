import Vue from 'vue';
import App from './App.vue';
import '@/styles/index.scss';
import store from './store/index';
import router from './router/index';
import eventBus from '@/utils/eventBus';
import storage from '@/utils/storage';
import request from '@/utils/request';
import flash from '@/utils/flash';
import '@/icons';
import '@/directives';
import '@/mixins';
// import './permission'
import scrollView from '@/plugins/scrollview';
import toast from '@/plugins/toast';
import confirm from '@/plugins/confirm';
import loading from '@/plugins/loading';
import uploadImage from '@/plugins/uploadimage';
import transforDom from '@/directives/transfer-dom';
import VueLazyload from 'vue-lazyload';
import subPage from '@/plugins/sub-page';
import fixPagePushedInIOS from './plugins/fixPagePushedInIOS';
Vue.directive('transfer-dom', transforDom);
Vue.use(scrollView);
Vue.use(subPage);
Vue.use(storage);
Vue.use(request);
Vue.use(eventBus);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading:
    'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  attempt: 1,
  observer: true,
});
Vue.use(flash);
Vue.use(toast);
Vue.use(confirm);
Vue.use(loading);
Vue.use(uploadImage);
Vue.use(fixPagePushedInIOS);
// 防止键盘遮挡页面
window.addEventListener('resize', function () {
  if (
    document.activeElement.tagName.toUpperCase() === 'INPUT' ||
    document.activeElement.tagName.toUpperCase() === 'TEXTAREA'
  ) {
    window.setTimeout(function () {
      document.activeElement.scrollIntoViewIfNeeded();
    }, 50);
  }
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
