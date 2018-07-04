<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>编程式的导航</h1>
			<p>js操作路由，如跳转，前进和后退，替换。<br>
				跳转：<span class="strong">router.push()</span><br>
				前进或者后退：<span class="strong">router.go()</span><br>
				替换：<span class="strong">router.replace()</span><br>
			</p>
			<p><button class="btn" v-on:click="push">跳转</button><button  class="btn"  v-on:click="back(-1)">后退</button><button  class="btn"  v-on:click="back(1)">前进</button><button  class="btn"  v-on:click="replace('/router-nav/replace')">替换</button></p>
			<router-view>嵌套路由</router-view>
			<p>HTML模板：</p>
			<pre class="html" name="code">
&lt;button class=&quot;btn&quot; v-on:click=&quot;push&quot;&gt;跳转&lt;/button&gt;
&lt;button  class=&quot;btn&quot;  v-on:click=&quot;back(-1)&quot;&gt;后退&lt;/button&gt;
&lt;button  class=&quot;btn&quot;  v-on:click=&quot;back(1)&quot;&gt;前进&lt;/button&gt;
&lt;button  class=&quot;btn&quot;  v-on:click=&quot;replace(&#x27;/router-nav/replace&#x27;)&quot;&gt;替换&lt;/button&gt;			
</pre>
<p>JS模板：</p>
<pre class="js" name="code">
methods: {
    push: function() {
        this.$router.push({ name: &quot;push&quot;, params: { userId: 123 }, query: { tel: &#x27;0755&#x27; } });
        console.log(this.$router.query)
    },
    back: function(num) {
        this.$router.go(num);
    },
    replace: function(url) {
        this.$router.replace(url);
    }

}
</pre>
<p>路由：</p>
<pre class="js" name="code">
{
    path: &quot;/router-nav&quot;,
    name: &quot;RouterNav&quot;,
    component: RouterNav,
    children: [{
        path: &quot;push/:userId?&quot;,
        name: &quot;push&quot;,
        component: RouterNestedChildPush
    }, {
        path: &quot;replace&quot;,
        name: &quot;replace&quot;,
        component: RouterNestedChildReplace
    }]
}

</pre>
		</div>
		<div class="margin-block">
			<p>URL跳转有路由name，字符串，对象，和传参问题：</p>
			<pre class="js" name="code">
// 字符串 /home
router.push('home')

// 对象 /home
router.push({ path: 'home' })

// 命名的路由 /user/123
router.push({ name: 'user', params: { userId: 123 }})

// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})

// 如果提供path，则params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user

//当提供path时，params对象写进path的值，查询对象使用query
router.push({ path: `/user/${userId}` }) // -> /user/123
			</pre>

		</div>
	</div>
</template>
<script>

	export default{
		name:"RouderNav",
		methods:{
			push:function () {
				this.$router.push({name:"push",params:{userId:123},query:{tel:'0755'}});
				console.log(this.$router.query)
			},
			back:function(num){
				this.$router.go(num);
			},
			replace:function(url){
				this.$router.replace(url);
			}
			
		}
	};
</script>