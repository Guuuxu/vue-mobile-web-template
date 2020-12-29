export default {
  methods: {
    fixSafariOverflowScrolling(type) {
      this.$overflowScrollingList = document.querySelectorAll(
        '.fix-safari-overflow-scrolling'
      );
      if (!this.$overflowScrollingList.length) return;
      for (let i = 0; i < this.$overflowScrollingList.length; i++) {
        this.$overflowScrollingList[i].style.webkitOverflowScrolling = type;
        this.$overflowScrollingList[i].style.overflowY =
          type === 'touch' ? 'auto' : 'hidden';
      }
    },
  },
};
