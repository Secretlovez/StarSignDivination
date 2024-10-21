import 'animate.css';
import './styles/index.scss';

import * as Vue from 'vue';
import App from './App.vue';
import pinia from './pinia';
import router from './router';
import directives from './directives';
import mitt from './plugins/mitt';
import element from './plugins/element';
import * as api from '@/api';

const app = Vue.createApp(App);
window.$vueApp = app;

app.config.globalProperties.$api = api;

app.config.performance = import.meta.env.DEV;
app.config.warnHandler = function (msg, vm, trace) {
  console.warn('VueWarnHandler: ', msg, vm, trace);
};
app.config.errorHandler = function (err, vm, info) {
  console.error('VueErrorHandler: ', err, vm, info);
};

app.use(pinia).use(router).use(element).use(directives).use(mitt).mount('#app');
