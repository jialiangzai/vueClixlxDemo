import Vue from 'vue';
import MetaInfo from 'vue-meta-info';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(MetaInfo);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
