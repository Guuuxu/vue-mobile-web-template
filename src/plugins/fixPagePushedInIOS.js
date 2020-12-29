function fixPagePushed() {
  const u = navigator.userAgent;
  const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  // 如果是IOS设备
  if (isiOS) {
    let flag = false;
    let pageBackNormFunc;
    // 聚焦后，键盘弹起
    document.body.addEventListener('focusin', () => {
      flag = true;
      pageBackNormFunc && clearTimeout(pageBackNormFunc);
    });
    // 失焦后，键盘关闭
    document.body.addEventListener('focusout', () => {
      if (flag) {
        // 页面滚动回原来的位置
        pageBackNormFunc = setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }, 200);
      }
      flag = false;
    });
  }
}

export default {
  install(target) {
    target.prototype.$fixPagePushed = fixPagePushed;
  },
  $instance: fixPagePushed,
};
