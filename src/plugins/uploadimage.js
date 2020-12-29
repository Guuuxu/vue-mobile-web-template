import merge from '../utils/merge';
import UploadImage from '@/components/UploadImage';

const defaults = {
  options: null,
};
let instance;
const uploadImage = {
  install(vue, pluginsOptions = {}) {
    const UploadImageConstructor = vue.extend(UploadImage);
    if (!instance) {
      instance = new UploadImageConstructor();
      document.body.appendChild(instance.$mount().$el);
    }
    vue.prototype.$uploadImage = function (options = {}) {
      if (typeof options !== 'object') {
        return;
      }
      merge(instance, defaults, pluginsOptions, options);
      instance.$off('success');
      instance.$off('fail');
      instance.$off('upload-progress');
      instance.$on('success', (res) => {
        options && options.success && options.success(res);
      });
      instance.$on('fail', (err) => {
        options && options.fail && options.fail(err);
      });
      instance.$on('upload-progress', (progress) => {
        options && options.uploadProgress && options.uploadProgress(progress);
      });
      instance.upload();
    };
  },
};
export default uploadImage;
