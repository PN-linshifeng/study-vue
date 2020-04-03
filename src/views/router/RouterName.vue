<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>路由命名</h1>
			<p>有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。</p>
			<p>路由设置：</p>
			<pre class="js" name="code">
export default new Router({
  routes: [{
    path: &quot;/router-name&quot;,
    name: &quot;RouterName&quot;, //命名路由
    component: RouterName
  }]
})
			</pre>
			<p>HTML模板使用：</p>
			<pre class="html" name="code">
&lt;router-link :to=&quot;{name:&quot;RouterName&quot;,params:{userID=&quot;abc&quot;}}&quot;&gt;&lt;/router-link&gt;
			</pre>
			<p>JS使用：</p>
			<pre class="js" name="code">
router.push({name:&quot;RouterName&quot;,params:{userID:&quot;abc&quot;}})
			</pre>
		</div>
	</div>
</template>
<script>
	export default{
		name:"RouterName"
	}
</script>