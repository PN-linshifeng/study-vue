<template>
	<div v-highlight>
		<div class="margin-block">
			<h1>重定向和别名</h1>
			<h2>重定向</h2>
			<p>重定向也是通过 <span class="strong">routes</span>配置来完成，例如从 /a 重定向到 /b：</p>
			<p><router-link to="/router-redirect/a" class="btn">string: A > B</router-link><router-link to="/router-redirect/b" class="btn">B</router-link>
				<router-link to="/router-redirect/c" class="btn">object: C > D</router-link>
				<router-link to="/router-redirect/d" class="btn">D</router-link>
				<router-link to="/router-redirect/e?to=f&name=pn" class="btn">fun: E?query > F</router-link>
				<router-link to="/router-redirect/e/lisa" class="btn">fun: E/params > F</router-link>
				<router-link to="/router-redirect/e#lili" class="btn">fun: E#hash > F</router-link>
				<router-link to="/router-redirect/f" class="btn">F</router-link>
			</p>
			<router-view class="router-view notes"></router-view>
			<p>重定向router redirect 属性有3个方法，string，object对象，function函数，其中函数接受目标路由 作为参数</p>
<pre class="js" name="code">
{
    path: &quot;/router-redirect/:id?&quot;,
    name: &quot;RouterRedirect&quot;,
    component: RouterRedirect,
    children: [{
      path: &quot;a&quot;,
      redirect: &quot;b&quot; //string a链接重定向到b链接 
    }, {
      path: &quot;c&quot;,
      redirect: {
        name: &quot;redirectObject&quot;, //object c链接重定向到命名为redirectObject的路由
      }
    }, {
      path: &quot;d&quot;,
      name: &quot;redirectObject&quot;
    }, {
      path: &quot;e/:name?&quot;,
      redirect: (to) =&gt; { //function e链接设置重定向
        var {
          hash,
          query,
          params
        } = to;

        if (query.to) {
          return {
            path: query.to,
            query: {
              name: query.name
            }
          }
        }
        if (params.name) {
          return {
            path: &#x60;f/${params.name}&#x60;
          }
        }
        if (hash) {
          return {
            path: &#x60;f&#x60;,
            hash: hash
          }
        }
      }
    }, {
      path: &quot;f/:name?&quot;,
      component: RouterRedirectF
    }]
  }
</pre>
		</div>
		<div class="margin-block">
			<h2>别名</h2>
			<p>跟服务器URL重写相似，浏览器url不变，网页内容变。/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样</p>
			<p>别名可设置到/根路由、子路由、数组路由</p>
			<p>
				<router-link class="btn" to="/a-a">根路由 (/a-a > /router-redirect/alias)</router-link>
				<router-link class="btn" to="/router-redirect/a-b">子路由 (/router-redirect/a-b > /router-redirect/alias)</router-link>
				<router-link class="btn" to="/router-redirect/a-c">数组路由 (/router-redirect/a-c > /router-redirect/alias)</router-link>
			</p>
			<router-view class="notes router-view" name="alias"></router-view>

			<p>HTML</p>
<pre class="html" name="code">
&lt;router-link class=&quot;btn&quot; to=&quot;/a-a&quot;&gt;根路由 (/a-a &gt; /router-redirect/alias)&lt;/router-link&gt;
&lt;router-link class=&quot;btn&quot; to=&quot;/router-redirect/a-b&quot;&gt;子路由 (/router-redirect/a-b &gt; /router-redirect/alias)&lt;/router-link&gt;
&lt;router-link class=&quot;btn&quot; to=&quot;/router-redirect/a-c&quot;&gt;数组路由 (/router-redirect/a-c &gt; /router-redirect/alias)&lt;/router-link&gt;
</pre>
			<p>路由设置：</p>
<pre class="js" name="code">
 {
   path: &quot;/router-redirect/:id?&quot;,
   name: &quot;RouterRedirect&quot;,
   component: RouterRedirect,
   children: [{
     path: &#x27;alias&#x27;,
     alias: &quot;/a-a&quot;, //别名 可设置根路由
     components: {
       alias: RouterRedirectAlias
     }
   }, {
     path: &#x27;alias2&#x27;,
     alias: &quot;a-b&quot;, //别名 可设置子路由
     components: {
       alias: RouterRedirectAlias
     }
   }, {
     path: &#x27;alias3&#x27;,
     alias: [&#x27;a-c&#x27;], //别名 可设置数组路由
     components: {
       alias: RouterRedirectAlias
     }
   }]
 }
</pre>
		</div>
	</div>
</template>
<script>
	export default{
		name:"RouterRedirect"
	}
</script>