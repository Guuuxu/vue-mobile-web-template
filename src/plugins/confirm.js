import merge from '../utils/merge';
import Confirm from '../components/Confirm';
// 默认值
const defaults = {
  title: '提示',
  content: '确定此操作吗?',
  confirmText: '确定',
  showCancel: true,
  cancelText: '取消',
};
let instance;
const confirm = {
  install(vue, pluginOptions = {}) {
    const ConfirmConstructor = vue.extend(Confirm);
    if (!instance) {
      instance = new ConfirmConstructor();
      document.body.appendChild(instance.$mount().$el);
    }
    vue.prototype.$confirm = {
      show(options = {}) {
        if (typeof options === 'object') {
          merge(instance, defaults, pluginOptions, options);
        }
        if (typeof options === 'object' && (options.show || options.hide)) {
          options.show && options.show();
        }
        this.$watcher && this.$watcher();
        this.$watcher = instance.$watch('visible', (val) => {
          if (!val && options && options.hide) {
            options.hide();
          }
        });
        instance.$off('confirm');
        instance.$off('cancel');
        instance.$on('confirm', () => {
          options && options.confirm && options.confirm();
        });
        instance.$on('cancel', () => {
          options && options.cancel && options.cancel();
        });

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
export default confirm;
