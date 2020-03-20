import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';

//DlHighlight 源码高亮
import DlHighlight from './assets/hl/hl-all.js';
import './assets/hl/style.css';

//style
import './assets/style.scss';

Vue.directive('highlight', {
  inserted: function() {
    DlHighlight.HELPERS.highlightByName('code', 'pre');
  },
});

Vue.config.productionTip = false;

Vue.component('my-div', { template: '<div>发士大夫撒</div>' });

new Vue({
  router,
  store,
  component: {
    myDiv: 'my-div',
  },
  render: h => h(App),
}).$mount('#app');
