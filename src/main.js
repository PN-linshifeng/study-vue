import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//style
import "./assets/style.scss";
//hi
import DlHighlight from "./assets/hl/hl-all.js";
import "./assets/hl/style.css";


Vue.config.productionTip = false

new Vue({
	router,
	store,
	mounted: function() {
		DlHighlight.HELPERS.highlightByName("code", "pre")
	},
	render: h => h(App)
}).$mount('#app')