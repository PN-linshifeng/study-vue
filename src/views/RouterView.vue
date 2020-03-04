<template>
	<div>
		<div class="margin-block">
			<h1>命名视图</h1>
			<p>一个界面可以拥有多个<span class="strong">router-view</span>视图，如果<span class="strong">router-view</span>没有设置名字<span class="strong">name</span>属性，那么默认为<span class="strong">default</span>。</p>
			<p><router-link to="/router-view/open-router-view" class="btn">打开嵌套命名视图</router-link></p>
			<router-view class="router-view default"></router-view>
			<router-view class="router-view set-name" name="viewUpFile"></router-view>
			<p>HTML模板设置视图:</p>
			<pre class="js" name="code">
&lt;router-view class=&quot;router-view&quot;&gt;&lt;/router-view&gt;//默认
&lt;router-view class=&quot;router-view&quot; name=&quot;viewUpFile&quot;&gt;&lt;/router-view&gt;
			</pre>
			<p>路由设置:</p>
			<pre class="js" name="code">
{
  path: &quot;/router-view&quot;,
  name: &quot;RouterView&quot;,
  component: RouterViews,
  children: [{
    path: &quot;open-router-view&quot;,
    components: {
      default: RouterNestedChild, //默认命名
      viewUpFile: RouterNestedChildPush //设置命名
    }
  }]
}
			</pre>

		</div>
	</div>
</template>
<script>
	export default{
		name:"RouterViews",
		mounted:()=>{
			DlHighlight.HELPERS.highlightByName("code", "pre");
		}
	}
</script>
<style lang="scss">
	.router-view{
		margin-bottom:20px;
		&:before{
			margin-bottom:10px;
			display:block;
			color:#999;
		}
		&.default:before{
			content: "默认router-view视图";
		}
		&.set-name:before{
			content: "命名router-view视图";
		}
	}
</style>