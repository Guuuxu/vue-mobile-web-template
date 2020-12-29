import router from './router';
import storage from './utils/storage';

const whiteList = ['login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (storage.$instance.getItem('passport.fast-sold-solder-token')) {
    if (to.path === '/login') {
      next({ path: '/', replace: true });
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      next();
    } else {
      next({ name: 'login', replace: true });
    }
  }
});
