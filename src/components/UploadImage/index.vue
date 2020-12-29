<template>
  <div class="upload-image-wrapper">
    <form enctype="multipart/form-data" class="uploadForm">
      <input
        type="file"
        id="imageUpload"
        ref="uploadTarget"
        accept="image/*"
        @change="uploadHandler($event)"
      />
    </form>
  </div>
</template>

<script>
import { imageUpload } from '@/utils';

export default {
  name: 'UploadImage',
  data() {
    return {
      options: null, // {width,height,quality}可以只写宽度，会等比例缩放 quality:图片质量 图片小于于5m,图片质量默认为0.7，大于5m,图片质量为0.3
    };
  },
  methods: {
    uploadHandler(e) {
      this.$loading.show('上传中...');
      imageUpload(
        e.target.files[0],
        (res, targetImg) => {
          this.$emit('success', { res, targetImg });
          this.$toast.bottom('上传成功');
          this.$loading.hide();
          e.target.value = '';
        },
        (err) => {
          this.$emit('fail', err);
          this.$toast.bottom(err);
          this.$loading.hide();
          e.target.value = '';
        },
        (progress) => {
          this.$emit('upload-progress', progress);
        },
        this.options
      );
    },
    upload() {
      this.$refs.uploadTarget.click();
    },
  },
};
</script>

<style scoped lang="scss">
.uploadForm {
  display: none;
}
</style>
