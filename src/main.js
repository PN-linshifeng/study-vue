import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//DlHighlight
import DlHighlight from "./assets/hl/hl-all.js";
import "./assets/hl/style.css";

//style
import "./assets/style.scss";


Vue.directive('highlight', {
	inserted: function(el) {
		DlHighlight.HELPERS.highlightByName("code", "pre");
	}
})


Vue.config.productionTip = false

new Vue({
	router,
	store,
	mounted: function() {
		// DlHighlight.HELPERS.highlightByName("code", "pre");
	},
	render: h => h(App)
}).$mount('#app')