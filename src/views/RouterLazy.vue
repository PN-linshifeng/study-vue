<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>路由懒加载</h1>
			<p>按需加载加载，当路由访问时候才能加载。可以利用<span class="strong">&lt;link href=&quot;xxx.js&quot; rel=&quot;prefetch&quot;&gt;</span>浏览器在空闲时间加载。</p>
			<p>当构建项目比较大的时候，可以使用懒加载分割代码块，提供页面首次加载速度</p>
			<p>第一种写法：</p>
			<pre class="js" name="code" type="router">
const Aside=()=&gt;import(/* webpackChunkName: &quot;group-lazy&quot; */&quot;./Aside.vue&quot;); //webpackChunkName是组件按组分块
var routes=[{&quot;path&quot;:&quot;/aside&quot;,component:Aside}] //路由配置跟往常一样
			</pre>
			<p>第二种写法：</p>
			<pre class="js" name="code" type="router">
const Aside = (resolve) =&gt; require([&#x27;./Aside&#x27;], resolve) //这个没有按组分块
var routes=[{&quot;path&quot;:&quot;/aside&quot;,component:Aside}] //路由配置跟往常一样
			</pre>
			<p>红色框就是按组分割出来的模块：</p>
			<p><img src="../assets/router-lazy.png"></p>
		</div>
	</div>
</template>
