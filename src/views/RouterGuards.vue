<template>
	<div  v-highlight>
		<div class="margin-block">
			<h1>导航守卫</h1>
			<p>“导航”表示路由正在发生改变。主要通过用来跳转或取消的方式守卫导航.</p>
			<p>通常用来判断是否登录，如果没有登录就跳转到登录页。</p>
			<p>导航守卫有三类：全局守卫、路由守卫、组件级守卫</p>
		</div>
		<div class="margin-block">
			<h2>全局守卫</h2>
			<p><strong>全局前置守卫：beforeEach<br></strong>
				在所有组件内守卫和异步路由组件被解析之前，全局前置守卫就被调用。例如使用在需要登录后才能进入的页面。
			</p>
			<p><strong>全局解析守卫：beforeResolve<br></strong>
				在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用
			</p>
			<p><strong>全局后置钩子：afterEach<br></strong>
				在导航被确认之后，全局后置就被调用；afterEach不会接受 next 函数也不会改变导航本身
			</p>
<pre class="js" name="code" type="router">
import Router from &quot;vue-router&quot;;
Vue.use(Router);
var rouer=new Router({...})

//全局前置守卫
rouer.beforeEach((to,from,next)=&gt;{
	//一些操作
})

//全局解析守卫
rouer.beforeEach((to,from,next)=&gt;{
	//一些操作
})

//后置解析  只有后置解析没有next函数  其他都有
router.afterEach((to,from)=&gt;{
	//一些操作
})
</pre>
		<p>
			<strong>守卫方法接收三个参数：<br></strong>

to: Route: 即将要进入的目标 路由对象<br>

from: Route: 当前导航正要离开的路由<br>

next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
</p>
<blockquote>
next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。<br>

next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。<br>

next('/') 或者 next({ path: '/' }): <br>跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。<br>

next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。<br>
</blockquote>
确保要调用 next 方法，否则钩子就不会被 resolved。
			<p><strong>测试全局前置守卫：登录功能</strong></p>
			<p><router-link to="/router-guards/my-info" class="btn">我的信息</router-link></p>
			<router-view  class="notes router-view"></router-view>
		</div>
		<div class="margin-block">
			<h2>路由独享的守卫</h2>
			<p>你可以在路由配置上直接定义 beforeEnter 守卫，用法和全局前置守卫一样：</p>
<pre class="js" name="code" type="router">
new Router({
	routes:[{
		path:"/router-guards",
		beforeEnter:(to,from,next)=>{
			// ...
		}
	}]
})
</pre>
		</div>
		<div class="margin-bloc">
			<h2>组件级守卫</h2>
			<p>最后，你可以在路由组件内直接定义以下路由导航守卫：</p>
			<ul>
				<li>beforeRouteEnter：组件或者异步组件之后调用，不能使用实例this，因为组件还没有创建</li>
				<li>beforeRouteUpdate：在当前路由改变组件被复用时调用</li>
				<li>beforeRouteLeave：离开组件时调用。常用用在未保存修改前突然离开</li>
			</ul>
			<pre class="js" name="code" type="view">
export default {
	beforeRouteEnter(to, from, next) {
		// 在渲染该组件的对应路由被 confirm 前调用
		// 不！能！获取组件实例 &#x60;this&#x60;
		// 因为当守卫执行前，组件实例还没被创建
		/**如果要访问组件实例，传一个回调给next**/
		next(vm =&gt; {
			// 通过 &#x60;vm&#x60; 访问组件实例
		})
	},
	beforeRouteUpdate(to, from, next) {
		// 在当前路由改变，但是该组件被复用时调用
		// 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
		// 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
		// 可以访问组件实例 &#x60;this&#x60;
	},
	beforeRouteLeave(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 &amp;#x60;this&amp;#x60;
		const answer = window.confirm(&#x27;Do you really want to leave? you have unsaved changes!&#x27;)
		if (answer) {
			next()
		} else {
			next(false)
		}
	}
}
			</pre>
		</div>
		<div class="margin-block">
			<h2>完整的导航解析流程</h2>
			<ol><li>导航被触发。</li><li>在失活的组件里调用离开守卫。</li><li>调用全局的 <code>beforeEach</code> 守卫。</li><li>在重用的组件里调用 <code>beforeRouteUpdate</code> 守卫 (2.2+)。</li><li>在路由配置里调用 <code>beforeEnter</code>。</li><li>解析异步路由组件。</li><li>在被激活的组件里调用 <code>beforeRouteEnter</code>。</li><li>调用全局的 <code>beforeResolve</code> 守卫 (2.5+)。</li><li>导航被确认。</li><li>调用全局的 <code>afterEach</code> 钩子。</li><li>触发 DOM 更新。</li><li>用创建好的实例调用 <code>beforeRouteEnter</code> 守卫中传给 <code>next</code> 的回调函数。</li></ol>
			<p>
				<img src="../assets/router-life.png" alt="">
			</p>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		beforeRouteUpdate(to,from,next){
			console.log("beforeRouteUpdate")
			next()
		},
		beforeRouteEnter(to,from,next){
			console.log('beforeEnter')
			next()
		}
	}
</script>