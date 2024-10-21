const getViewportSize = () => {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
};

export default {
  install: (app) => {
    // v-wheel指令横向滚动
    app.directive('wheel', {
      beforeMount: (el, binding) => {
        const node = binding.value ? el.querySelector(binding.value) : el;
        el.onWheel = (e) => {
          if (node) {
            node.scrollLeft += e.deltaY;
          }
        };
      },
      mounted: (el) => {
        el.addEventListener('wheel', el.onWheel, { capture: false, passive: true });
      },
      unMounted: (el) => {
        el.removeEventListener('wheel', el.onWheel, false);
      },
    });
    app.directive('draggable', {
      beforeMount: (el, binding) => {
        // 约束在浏览器窗口内拖拽
        const { value } = binding;

        const dialog = el.getElementsByClassName('el-dialog')[0];
        const title = el.getElementsByClassName('el-dialog__title')[0];
        const header = el.getElementsByClassName('el-dialog__header')[0];
        header.style.cursor = 'move';

        title.style.cursor = 'default';
        title.style.userSelect = 'none';
        title.style['-ms-user-select'] = 'none';
        title.style['-moz-user-select'] = 'none';

        dialog.offsetX = 0;
        dialog.offsetY = 0;

        const move = function (e) {
          let left = e.pageX - dialog.offsetX;
          let top = e.pageY - dialog.offsetY;

          if (value) {
            // Constrains left & top
            left = Math.max(left, 0);
            top = Math.max(top, 0);
            // Constrains right & bottom
            const viewport = getViewportSize();
            left = Math.min(left, viewport.width - dialog.offsetWidth);
            top = Math.min(top, viewport.height - dialog.offsetHeight);
          }
          dialog.style.margin = '0px';
          dialog.style.left = left + 'px';
          dialog.style.top = top + 'px';
        };

        const up = function () {
          removeEventListener('mousemove', move);
          removeEventListener('mouseup', up);
        };

        const down = function (e) {
          dialog.offsetX = e.pageX - dialog.offsetLeft;
          dialog.offsetY = e.pageY - dialog.offsetTop;

          addEventListener('mousemove', move);
          addEventListener('mouseup', up);
        };

        header.addEventListener('mousedown', down);
      },
    });
  },
};
