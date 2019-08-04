import Vue from 'vue';
import VueSkycons from 'vue-skycons';
import App from './App.vue';
import './registerServiceWorker';

Vue.config.productionTip = false;

Vue.use(VueSkycons, { color: 'white' });

new Vue({
  render: h => h(App),
}).$mount('#app');
