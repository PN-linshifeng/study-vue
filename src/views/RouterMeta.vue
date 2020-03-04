<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>路由元信息</h1>
			<p>
				给路由配置meta字段，相当给路由贴标签：

			</p>
			<pre class="js" name="code" type="router">
var Vue from 'vue';
var Router from 'vue-router';
Vue.use(Router);
var router = new Router({
	routes: [{
		path: "/router-meta",
		name: "RouterMeta",
		component: RouterMeta,
		meta: {
			isLogin: false
		},
		children: [{
			path: 'my-info',
			name: 'MyInfo',
			meta: {
				isLogin: true
			},
			component: MyInfo
		}]
	}]
})
				</pre>
				<p>访问meta元信息，匹配到的URL会将其meta和其父路由记录到<strong class="strong">$route</strong>对象的<strong class="strong">$route.matched</strong>数组，上面<strong class="strong">/router-meta/my-info</strong>匹配到meta为:<strong  class="strong">[{isLogin: false},{isLogin: true}]</strong></p>
				<p>利用全局前置守卫deforeEach 检查元字段</p>
				<pre class="js" name="code" type="router">
router.beforeEach((to, from, next) =&gt; {
	if (to.matched.some((item) =&gt; (item.meta.isLogin))) {
		if (!localStorage.getItem(&quot;isLogin&quot;)) {
			next({
				path: &quot;/router-meta/login&quot;,
				query: {
					from: to.path
				}
			})
		}
	}
	next()
})
				</pre>
				
		</div>
		<div class="margin-block">
			<p><router-link to="/router-meta/my-info" class="btn">我的信息</router-link> <SignOut /></p>
				<router-view class="notes router-view"></router-view>
		</div>
	</div>
</template>
<script>
	import SignOut from "../components/SignOut.vue";
	export default{
		name:"RouterMeta",
		components:{
			SignOut
		}
	}
</script>