<template>
	<div v-highlight>
	<div class="margin-block">
		<h1>嵌套路由</h1>
		<p>一个被渲染的组件可以包含自己的嵌套路由&lt;router-view&gt;,有点像iframe</p>
		<p>点击显示嵌套子路由：<router-link to="/router-nested/child">子路由</router-link></p>
		<router-view class="router-view nested"></router-view>
	</div>
	<div class="margin-block">
		<p>vue模板：</p>
		<pre class="html" name="code">
父路由模板：RouterNested.vue
&lt;template&gt;
&lt;router-view&gt;&lt;/router-view&gt;
&lt;/template&gt;

子路由模板：RouterNestedChild:vue
&lt;template&gt;
	&lt;div class=&quot;notes&quot;&gt;我就是子路由&lt;/div&gt;
&lt;/template&gt;
		</pre>
		<p>vue路由：</p>
		<pre class="js" name="code">

{
	path:&quot;/router-nested&quot;,
	component:RouterNested,
	child:[{
		path:&quot;child&quot;,
		component:RouterNestedChild
	}]
}
		</pre>
	</div>
	</div>
</template>

