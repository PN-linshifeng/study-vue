<template>
	<div  v-highlight>
		<div class="margin-block">
			<h1>HTML5 History 模式</h1>
			<p>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</p>
			<p>如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。</p>
			<pre class="js" name="code" type="router">
const router = new VueRouter({
  mode: 'history',	//设置mode为history时，后端配置要重写URL为/index.html
  routes: [...]
})
			</pre>
			<p>当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id，也好看！</p><p>

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。
</p><p>
所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。</p>
		</div>
	</div>
</template>