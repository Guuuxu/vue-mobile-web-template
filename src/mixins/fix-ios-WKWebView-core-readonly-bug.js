export default {
  mounted() {
    /* 修复ios WKWebView内核input readonly设置依然弹起软键盘 */
    const readonlyInputs = document.querySelectorAll('input[readonly]');
    readonlyInputs.forEach((input) => {
      input.addEventListener('focus', function () {
        this.blur();
      });
    });
  },
};
