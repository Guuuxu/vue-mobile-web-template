import Loading from '@/components/Loading';
import merge from '../utils/merge';

let instance;
let watcher;
const defaults = {
  text: '请等待...',
};
const loading = {
  install(vue, pluginOptions = {}) {
    const LoadingConstructor = vue.extend(Loading);
    if (!instance) {
      instance = new LoadingConstructor();
      document.body.appendChild(instance.$mount().$el);
    }
    vue.prototype.$loading = {
      show(options = {}) {
        watcher && watcher();
        if (typeof options === 'string') {
          merge(instance, defaults, pluginOptions, { text: options });
        } else if (typeof options === 'object') {
          if (!options.text) options.text = '';
          merge(instance, defaults, pluginOptions, options);
        }
        if ((typeof options === 'object' && options.show) || options.hide) {
          watcher = instance.$watch('visible', (val) => {
            val && options.show && options.show(instance);
            val === false && options.hide && options.hide(instance);
          });
        }
        instance.visible = true;
      },
      hide() {
        instance.visible = false;
      },
      isVisible() {
        return instance.visible;
      },
    };
  },
};
export default loading;
