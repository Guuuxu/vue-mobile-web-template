import Toast from '@/components/Toast';
import merge from '@/utils/merge';

let instance;
let watcher;
const defaults = {
  text: '',
  position: 'middle',
  duration: 2000,
  type: 'text',
  showMasker: false,
};
const toast = {
  install(vue, pluginOptions = {}) {
    const ToastConstructor = vue.extend(Toast);
    if (!instance) {
      instance = new ToastConstructor();
      document.body.appendChild(instance.$mount().$el);
    }
    vue.prototype.$toast = {
      show(options = {}) {
        watcher && watcher();

        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, { text: options });
        } else if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options);
        }
        if ((typeof options === 'object' && options.show) || options.hide) {
          watcher = instance.$watch('visible', (val) => {
            val && options.show && options.show(instance);
            val === false && options.hide && options.hide(instance);
          });
        }
        if (instance.text) {
          instance.showToast();
        }
      },
      success(options = {}) {
        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, {
            position: 'middle',
            type: 'success',
            text: options,
          });
        } else if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options, {
            position: 'middle',
            type: 'success',
          });
        }
        if (instance.text) {
          instance.showToast();
        }
      },
      cancel(options = {}) {
        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, {
            text: options,
            position: 'middle',
            type: 'cancel',
          });
        } else if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options, {
            position: 'middle',
            type: 'cancel',
          });
        }
        if (instance.text) {
          instance.showToast();
        }
      },
      top(options = {}) {
        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, {
            text: options,
            position: 'top',
          });
        } else if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options, {
            position: 'top',
          });
        }
        if (instance.text) {
          instance.showToast();
        }
      },
      bottom(options = {}) {
        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, {
            text: options,
            position: 'bottom',
          });
        } else if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options, {
            position: 'bottom',
          });
        }
        if (instance.text) {
          instance.showToast();
        }
      },
      hide() {
        instance.hideToast();
      },
      isVisible() {
        return instance.visible;
      },
    };
  },
};
export default toast;
