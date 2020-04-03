<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>路由组件传参</h1>
			<p>在组件中使用 <span class="strong">$route</span> 使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。</p>

			<h2><strong>常用方法：</strong><span class="strong">$route</span></h2>
			<router-link class="btn" to="/router-props/wangxiaoming">获取参数</router-link>
			<p>{{$route.params.id?'【id='+$route.params.id+'】':''}}</p>
			<p>HTML模板：</p>
<pre class="html" name="code">
&lt;router-link class=&quot;btn&quot; to=&quot;router-props/wangxiaoming&quot;&gt;获取参数&lt;/router-link&gt;
{$route.params.id?&#x27;【id=&#x27;+$route.params.id+&#x27;】&#x27;:&#x27;&#x27;}
</pre>
<p>路由设置：</p>
<pre class="js" name="code">
{
    path: &quot;/router-props/:id?&quot;,
    name: &quot;RouterProps&quot;,
    component: RouterProps
}
</pre>
			<h2>通过 props 解耦方法</h2>
			<p>这样你便可以在任何地方使用该组件，使得该组件更易于重用和测试。</p>
			<p>嵌套子路由不能设置props解耦，它只能继承顶级父路由</p>
			<p>
				<router-link class="btn" to="/router-props/yanglili/58">获取参数</router-link>
			</p>
			<myProps :age="age" class="notes components" v-if="age"></myProps>
			<p>视图组件模板：</p>
			<pre class="html" name="code"  type="view">
				&lt;template&gt;
				&lt;router-link class=&quot;btn&quot; to=&quot;/router-props/yanglili/58&quot;&gt;获取参数&lt;/router-link&gt;
				&lt;myProps :age=&quot;age&quot; class=&quot;notes components&quot; v-if=&quot;age&quot;&gt;&lt;/myProps&gt;
				&lt;/script&gt;

				&lt;script&gt;
					import myProps from &quot;@/components/RouterProps.vue&quot;;
					export default{
						name:&quot;RouterProps&quot;,
						props:[&#x27;age&#x27;,&#x27;id&#x27;],
						components:{
							myProps
						}
					}
				&lt;/script&gt;
			</pre>

			<p>普通组件模板：myProps</p>
			<pre class="html" name="code"  type="component">

			&lt;template&gt;
				&lt;div&gt;
					组件传参：age={{aa}}
				&lt;/div&gt;
			&lt;/template&gt;

			&lt;script&gt;
				export default{
					name:&quot;myProps&quot;,
					props:[&#x27;age&#x27;]
				}
			&lt;/script&gt;
			</pre>
			<p>路由设置：</p>
			<pre class="js" name="code"  type="router">
			{
				path: &quot;/router-props/:id?&quot;,
				name: &quot;RouterProps&quot;,
				component: RouterProps,
				props: true,
				/*如果是多视图*/
				/*components:{default:centent,aside:Aside},*/
				/*props:{default:true,aside:false},*/
				children: [{
					path: &#x27;yanglili/:age?&#x27;
				}]
			}
			</pre>

		</div>
		<div class="margin-block">
			<h2>解耦：布尔模式</h2>
			<p>如果 props 被设置为 true，route.params 将会被设置为组件属性。route.query不会解耦成为组件属性。</p>
			<p>
				<pre class="js" name="code" type="router">
				{
				path:"/router-props",
				props:true
				}
				</pre>
			</p>
		</div>
		<div class="margin-block">
			<h2>解耦：对象模式</h2>
			<p>如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。</p>
<p>
<pre class="js" name="code" type="router">
{
 path:"/router-props",
 props:{content:false}
}
</pre>
</p>
		</div>
				<div class="margin-block">
			<h2>解耦：函数模式</h2>
			<p>你可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。</p>
		<p>
			<pre class="js" name="code" type="router">
			{
			path:"/router-props",
			props:(route)=>({name:route.query.name}),
			component:RouterProps
			}
			</pre>
		</p>
		<p>
			URL /router-props?name=abc 会将 {name: 'abc'} 作为属性传递给 RouterProps 组件。
		</p>
		<p>请尽可能保持 props 函数为无状态的，因为它只会在路由发生变化时起作用。如果你需要状态来定义 props，请使用包装组件，这样 Vue 才可以对状态变化做出反应。</p>
		</div>
	</div>
</template>
<script>
	import myProps from "@/components/RouterProps";

	export default{
		name:"RouterProps",
		data(){
			return{
				aa:"{{age}}"
			}
		},
		props:['age','id'],
		components:{
			myProps
		}
	}
</script>