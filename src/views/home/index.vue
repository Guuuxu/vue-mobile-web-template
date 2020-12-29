<template>
  <div class="home-wrapper">
    <router-link to="/">Home</router-link>
    <router-link to="/home/pageOne">page1</router-link>
    <router-link to="/home/pageTwo">page2</router-link>
    <router-link to="/home/pageThree">page3</router-link>
    <router-link to="/home/pageFour">page4</router-link>
    <button @click="uploadHandler">上传</button>
    <p>进度{{ progress }}</p>
    <div class="avatar"></div>
    <div class="avatar1"></div>
    <button @click="opentoast">打开toast</button>
    <button @click="openconfirm">打开confirm</button>
    <button @click="openconfirm2">打开confirm2</button>
    <button @click="openLoading">打开loading</button>
    <!--    <div @click="logOutHandler">退出</div>-->
    <div v-for="(type, index) in types" :key="type">
      <spinner :type="type" :size="index === 3 ? '40px' : ''"></spinner>
    </div>
    <p v-for="n in 10" :key="n">{{ n }}</p>
    <router-link to="/home/pageOne">page1</router-link>
  </div>
</template>

<script>
import saveHomeScrollPosition from '@/mixins/savehomescrollposition';
import { mapActions } from 'vuex';
import Spinner from '@/components/Spinner';

export default {
  name: 'home',
  mixins: [saveHomeScrollPosition],
  components: {
    Spinner,
  },
  data() {
    return {
      carPlate: '',
      types: [
        'android',
        'ios',
        'ios-small',
        'bubbles',
        'circles',
        'crescent',
        'dots',
        'lines',
        'ripple',
        'spiral',
      ],
      progress: 0,
      imgUrl: '',
    };
  },
  activated() {
    // this.init();
  },
  methods: {
    ...mapActions('passport', ['LogOut']),
    async logOutHandler() {
      await this.LogOut();
      this.$router.replace({ name: 'login' });
    },
    openLoading() {
      this.$loading.show('载入中...');
      setTimeout(() => {
        this.$loading.hide();
      }, 3000);
    },
    uploadHandler() {
      const vm = this;
      this.$uploadImage({
        success({ res, targetImg }) {
          vm.imgUrl = targetImg;
          console.log(res);
        },
        fail(err) {
          console.log(err);
        },
        uploadProgress(progress) {
          vm.progress = progress;
        },
      });
    },
    opentoast() {
      this.$toast.bottom('111');
      /* if (typeof api !== "undefined") {
                     api.toast({
                         msg: '网络连接失败,请检查网络后重试网络连接失败,请检查网络后重试网络连接失败,请检查网络后重试',
                         duration: 2000,
                         location: 'bottom'
                     });
                 } else { */
      // this.showToast = true;
      // }
    },
    openconfirm() {
      const _this = this;
      this.$confirm.show({
        content: '确认删除?删除后无法恢复',
        /* show(){
                        _this.$toast.bottom('显示');
                    },
                    hide(){
                        _this.$toast.bottom('隐藏');
                    }, */
        confirm() {
          _this.$toast.bottom('你点击了确定按钮');
        },
        cancel() {
          _this.$toast.bottom('你点击了取消按钮');
        },
      });
      // this.showConfirm=true;
    },
    openconfirm2() {
      const _this = this;
      this.$confirm.show({
        title: '警告',
        content: '确认删除?删除后无法恢复',
        showCancel: false,
        /* show(){
                        _this.$toast.bottom('显示');
                    },
                    hide(){
                        _this.$toast.bottom('隐藏');
                    }, */
        confirm() {
          _this.$toast.bottom('你点击了确定按钮');
        },
        cancel() {
          _this.$toast.bottom('你点击了取消按钮');
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
input {
  border: 1px solid #ddd;
}

.avatar {
  width: 100px;
  height: 100px;
  @include circleOnePx(#333);
}

.avatar1 {
  width: 100px;
  height: 100px;
  @include onePx(#ccc);
}

p {
  height: 200px;

  @include fb(flex-start);
  @include onePx(#ccc, bottom);

  /* &:active {
             background-color: #dcdcdc;
         }*/

  &:last-of-type {
    &::after {
      display: none;
    }
  }
}
</style>
