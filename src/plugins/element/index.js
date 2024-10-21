import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';

import MxIcon from '@/components/Icon';

export default {
  install: (app) => {
    app.use(ElementPlus);

    app.component('MxIcon', MxIcon);

    Object.keys(ElementPlusIconsVue).forEach((key) => {
      app.component(key, ElementPlusIconsVue[key]);
    });
  },
};
