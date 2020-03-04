import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";

//DlHighlight 源码高亮
import DlHighlight from "./assets/hl/hl-all.js";
import "./assets/hl/style.css";

//style
import "./assets/style.scss";

Vue.directive("highlight", {
	inserted: function() {
		DlHighlight.HELPERS.highlightByName("code", "pre");
	}
});

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
