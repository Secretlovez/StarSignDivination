import mitt from 'mitt';

export const emitter = mitt();

export default {
  install: (app) => {
    app.config.globalProperties.$bus = emitter;
  },
};
