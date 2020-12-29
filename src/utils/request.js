import axios from 'axios';
import storage from '@/utils/storage';
// import store from '@/store'
// import router from '@/router'

let $vm = null;

axios.defaults.baseURL = process.env.VUE_APP_BASE_API;
axios.defaults.timeout = 20000;
/* axios.defaults.retry = 4;
axios.defaults.retryDelay = 1000; */
axios.interceptors.request.use(
  (config) => {
    config.headers['X-FASTSOLD-SOLDER-TOKEN'] =
      storage.$instance.getItem('passport.fast-sold-solder-token') || '';
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    const res = response.data;
    /**
     * code为非200是抛错
     */
    if (res.code && res.code !== 200) {
      if ($vm.$loading && $vm.$loading.isVisible()) $vm.$loading.hide();
      if (res.code === 6000) {
        $vm.$toast.bottom('登录失效');
        /* store.dispatch('passport/LogOut').then(() => {
        router.replace({ name: 'login' })
      }) */
      } else if (res.code === 404) {
        if ($vm !== null) {
          $vm.$toast.bottom(res.msg || '请求失败');
        }
      } else {
        if (process.env.NODE_ENV === 'production') {
          $vm.$toast.bottom('系统开小差了');
        } else {
          $vm.$toast.bottom(res.msg || '请求失败');
        }
      }
      return Promise.reject(res);
    } else {
      return res;
    }
  },
  (err) => {
    // 网络错误时提示
    if (!err.response) {
      if ($vm.$loading && $vm.$loading.isVisible()) $vm.$loading.hide();
      $vm.$toast.bottom('网络连接失败,请检查网络后重试');
      return Promise.reject('网络连接失败,请检查网络后重试');
    }
    /* //超时处理
    const config = err.config;
    if (!config || !config.retry) return Promise.reject(err);
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= config.retry) {
        alert('连接超时,请重试');
        return Promise.reject("连接超时,请重试");
    }
    config.__retryCount += 1;
    const backOff = new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, config.retryDelay || 1);
    });
    return backOff.then(function () {
        return axios(config);
    }); */
  }
);

export default {
  install(vue) {
    vue.prototype.$request = axios;
    vue.mixin({
      created: function () {
        $vm = this;
      },
    });
  },
  $instance: axios,
};
