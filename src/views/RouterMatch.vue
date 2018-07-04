<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>动态路由匹配</h1>
			<keep-alive ><div style=" height:100px; overflow:auto"><div style=" height:500px;"></div></div></keep-alive>
			<div class="match">
				<p>
					点击链接查看参数：
					<router-link to="/router-match/lisa">lisa</router-link>
					<router-link to="/router-match/xiaoming" exact>xiaoming</router-link>
					<router-link to="/router-match/lili/top">lili&top</router-link>
				</p>
				<p class="notes">参数id：{{ $route.params.id }}<br>
					参数sort：{{$route.params.sort||"没有此参数"}}
				</p>
				<p>HTML代码</p>
				<p >
<pre name="code" class="html">
&lt;router-link to=&quot;/router-match/lisa&quot;&gt;lisa&lt;/router-link&gt;
&lt;router-link to=&quot;/router-match/xiaoming&quot; exact&gt;xiaoming&lt;/router-link&gt;
&lt;router-link to=&quot;/router-match/lili/top&quot;&gt;lili&amp;top&lt;/router-link&gt;
</pre>
				</p>
				<p>路由代码：</p>
				<p>
				<pre class="js" name="code">
{
	path: &#x27;/router-match/:id?/:sort?&#x27;,
	name: &#x27;routerMatch&#x27;,
	component: RouterMatch
}
				</pre>
				</p>
			</div>
		</div>
		<div class="margin-block">
			<h2>响应路由参数的变化</h2>
			<p>提醒一下，当使用路由参数时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会再被调用。</p>
			<p>
				获取用户名的性别：
				<router-link to="/router-match/lisa">lisa</router-link>
				<router-link to="/router-match/xiaoming" exact>xiaoming</router-link>
				<router-link to="/router-match/xiaoming?ss=545" exact>xiaoming</router-link>
				<router-link to="/router-match/xiaoming?ss=fasdfaf" exact>xiaoming</router-link>
			</p>
			<p class="notes">
				{{$route.params.id?$route.params.id+"的性别是："+sex:"点击链接"}}
			</p>
			<p>复用组件时，生命周期钩子不会再被调用,想对路由参数的变化作出响应的话，你可以简单地 <span class="strong">watch (监测变化) $route</span> 对象或者使用<span class="strong">beforeRouteUpdate</span></p>
			<p>HTML代码：</p>
			<p >
<pre name="code" class="html">
&lt;router-link to=&quot;/router-match/lisa&quot;&gt;lisa&lt;/router-link&gt;
&lt;router-link to=&quot;/router-match/xiaoming&quot; exact&gt;xiaoming&lt;/router-link&gt;
</pre>
			</p>
			<p>JS代码：</p>
			<p>
<pre  name="code" class="js">
{
	template:&#x27;RouterMatch&#x27;,
	data: function(){
		return {
			sex:&#x27;男&#x27;
		}
	},
	watch:{
		&#x27;$route&#x27;(to,from){
			this.sex=this.sex==&quot;男&quot;?&quot;女&quot;:&quot;男&quot;;
		}
	}
}
</pre>


			</p>
		</div>
		<div class="margin-block">
			<h2>高级匹配模式</h2>
			<p>vue-router 使用 <a href="https://github.com/pillarjs/path-to-regexp" target="—blank">path-to-regexp</a> 作为路径匹配引擎，所以支持很多高级的匹配模式，例如：可选的动态路径参数、匹配零个或多个、一个或多个，甚至是自定义正则匹配。查看它的 文档 学习高阶的路径匹配，还有<a href="https://github.com/vuejs/vue-router/blob/next/examples/route-matching/app.js" target="—blank">这个例子 展示 vue-router</a> 怎么使用这类匹配。</p>
		</div>
		<div class="margin-block">
			<h2>匹配优先级</h2>
			<p>有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。</p>
		</div>
	</div>
</template>
<script>
	export default{
		template:'RouterMatch',
		data: function(){
			return {
				sex:'男'
			}
		},
		beforeRouteUpdate:function(to, from, next){
			this.sex=this.sex=="男"?"女":"男";
			next()
		}
		// watch:{
		// 	'$route'(){
		// 		this.sex=this.sex=="男"?"女":"男";
		// 	}
		// }
	}
</script>
