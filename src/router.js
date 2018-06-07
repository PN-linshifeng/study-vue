import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import RouterMatch from "./views/RouterMatch.vue";
import RouterNested from "./views/RouterNested.vue"
import RouterNestedChild from "./views/RouterNestedChild.vue";
// import RouterNestedChildGo from "./views/RouterNestedChildGo.vue";
import RouterNestedChildPush from "./views/RouterNestedChildPush.vue";
import RouterNestedChildReplace from "./views/RouterNestedChildReplace.vue";
import RouterNav from "./views/RouterNav.vue";

Vue.use(Router)


export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  }, {
    path: '/about',
    name: 'about',
    component: About
  }, {
    path: '/router-match/:id?/:sort?',
    name: 'routerMatch',
    component: RouterMatch
  }, {
    path: '/router-nested',
    name: 'routerNested',
    component: RouterNested,
    children: [{
      path: 'child',
      component: RouterNestedChild
    }]
  }, {
    path: "/router-nav",
    name: "RouterNav",
    component: RouterNav,
    children: [{
      path: "push/:userId?",
      name: "push",
      component: RouterNestedChildPush
    }, {
      path: "replace",
      component: RouterNestedChildReplace
    }]
  }]
})