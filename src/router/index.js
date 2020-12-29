import Vue from 'vue';
import Router from 'vue-router';
import Flash from '@/plugins/flash';
import Layout from '@/views/layout/LayOut';
// demo模块
import demo from './modules/demo';

Router.prototype.old_push = Router.prototype.push;
Router.prototype.old_replace = Router.prototype.replace;
Router.prototype.push = function (datas) {
  if (typeof datas !== 'string') {
    datas.query || (datas.query = {});
    datas.query.hashId ||
      Object.assign(datas.query, { hashId: new Date().getTime() });
    this.old_push(datas);
  } else {
    this.old_push(datas);
  }
};

Router.prototype.replace = function (datas) {
  // 调用replace的时候清除当前页面缓存
  const store = this.app?.$store;
  const cachedViews = store?.state?.cacheView?.cachedViews;
  if (cachedViews && cachedViews.length > 0) {
    store.dispatch('cacheView/DelCachedView', {
      name: cachedViews[cachedViews.length - 1],
    });
  }
  if (typeof datas !== 'string') {
    datas.query || (datas.query = {});
    datas.query.hashId ||
      Object.assign(datas.query, { hashId: new Date().getTime(), replace: 1 });
    this.old_replace(datas);
  } else {
    this.old_replace(datas);
  }
};

Vue.use(Router);
const router = new Router({
  routes: [
    {
      path: '',
      component: () => import('@/views/index'),
      redirect: '/layout',
      children: [
        {
          path: '/layout',
          component: Layout,
          name: 'Layout',
          redirect: '/home',
          children: [
            {
              path: '/home',
              name: 'home',
              component: () => import('@/views/home/index'),
            },
            {
              path: '/setting',
              name: 'setting',
              component: () => import('@/views/setting/index'),
            },
            {
              path: '/message',
              name: 'message',
              component: () => import('@/views/message/index'),
            },
            {
              path: '/address',
              name: 'address',
              component: () => import('@/views/address/index'),
            },
          ],
        },
        // 页面
        ...demo,
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: false,
      },
      component: () => import('@/views/login/EmptyRedirect'),
    },
    {
      path: '/loginReal',
      name: 'loginReal',
      meta: {
        keepAlive: false,
      },
      component: () => import('@/views/login/index'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/register/index'),
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
router.beforeEach(function (to, from, next) {
  const hashType =
    typeof from.query.hashId === 'undefined'
      ? 'forward'
      : to.query.hashId > from.query.hashId
      ? 'forward'
      : 'back';
  let do_next = true;
  const _stack = Flash.$instance.getItem('fake-back');
  if (typeof api === 'undefined') {
    if (hashType === 'back') {
      if (_stack) {
        const cb = _stack[_stack.length - 1];
        if (cb) {
          do_next = false;
          history.pushState(null, null, '#' + from.fullPath);
          cb();
        }
      }
    }
  }
  do_next &&
    Object.assign(to.meta, {
      hashId: Number(to.query.hashId),
      hashType,
      replace: to.query.replace,
    }) &&
    next();
});
export default router;
