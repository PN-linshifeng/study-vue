<template>
	<div v-highlight>

		<div class="margin-block">
			<h1>路由过渡动态</h1>
			<p>利用<strong class="strong">transition</strong>设置路由切换动态效果.</p>
		</div>
		<div class="margin-block">
			<h2>基于路由的动态过渡</h2>
			<p>右进右出路由视图</p>
			<p><router-link class="btn" to="/router-transition/page-3">第三页</router-link><router-link class="btn" to="/router-transition/page-4">第四页</router-link></p>
			
			<div class="page">	
				<transition :name="view"><router-view class="notes router-view" name="view"></router-view></transition>
			</div>

			<pre class="js" name="code" type="view">
&lt;div class=&quot;page&quot;&gt;	
     &lt;transition :name=&quot;view&quot;&gt;&lt;router-view class=&quot;notes router-view&quot; name=&quot;view&quot;&gt;&lt;/router-view&gt;&lt;/transition&gt;
&lt;/div&gt;
&lt;script&gt;
	export default{
		data:function(){
			return{
				view:localStorage.getItem(&quot;routerTransiton&quot;)
			}
		},
		beforeRouteUpdate(to,from,next){//在当前视图写路由前置守卫
			this.view=localStorage.getItem(&quot;routerTransiton&quot;);
			next()
		}
	}
&lt;/script&gt;
&lt;style lang=&quot;scss&quot;&gt;
.page{
	position: relative;
	height: 100px;
	margin-bottom:30px;
	overflow: hidden;
	.notes{
		overflow:auto;

	}
}
.view-left-enter,.view-right-leave-to{;
  transform:translate(100%);
}
.view-left-leave-to,.view-right-enter{
  transform:translate(-100%);
}
.view-left-enter-active,.view-left-leave-active,.view-right-enter-active,.view-right-leave-active{
  transition: all 1s;
  position: absolute;
  width: 100%;
  top: 0;
}
&lt;/style&gt;
			</pre>
			<p>路由设置：</p>
			<pre class="js" name="code" type="router">
var router=new Router({
	scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }

})
//路由器过渡 使用localStorage记录状态  也可以用状态管理
let historyRouter = (function() {
  let state = {
    event: &#x27;enter&#x27;, //记录enter或者leave。默认进入
    style: {
      enter: &#x27;view-left&#x27;, //进入的样式
      leave: &#x27;view-right&#x27; //退出的样式
    },
    history: [] //history url 集合
  };
  //设置localStorage
  localStorage.setItem(&quot;routerTransiton&quot;, state.style[state.event]);
  return {
    state,
    pushPath(path) { //前进添加新的url
      state.history.push(path);
      state.event = &quot;enter&quot;;
      localStorage.setItem(&quot;routerTransiton&quot;, state.style[state.event]);
    },
    popPath() { //后退删除url
      state.history.pop();
      state.event = &quot;leave&quot;;
      localStorage.setItem(&quot;routerTransiton&quot;, state.style[state.event]);
    }
  }
})()

//全局前置守卫 
router.beforeEach((to, from, next) =&gt; {
  var len = historyRouter.state.history.length; //获取history 的长度
  if (historyRouter.state.history[len - 2] &amp;&amp; historyRouter.state.history[len - 2] === to.path) {
    //to.path 是否存在history倒数第二个，如果存在就是后退。
    historyRouter.popPath(); //后退
  } else {
    historyRouter.pushPath(to.path); //前进
  }
  next()
})
			</pre>
		</div>
		<div class="margin-block">
			<h2>单个路由过渡</h2>
			<p>给每个路由配置不一样的过渡效果，在视图组件内使用<strong class="strong">transition</strong>，并设置不同的name属性：</p>
			<pre class="js" name="code" type="view">
&lt;template&gt;
	&lt;transition name=&quot;slide&quot;&gt;
      &lt;div class=&quot;foo&quot;&gt;&lt;/div&gt;
    &lt;/transition&gt;
&lt;/template&gt;				
			</pre>

		</div>

	</div>
</template>
<script>
	export default{
		data:function(){
			return{
				view:localStorage.getItem("routerTransiton")
			}
		},
		beforeRouteUpdate(to,from,next){//在当前视图写路由前置守卫
			this.view=localStorage.getItem("routerTransiton");
			next()
		}
	}
</script>
<style lang="scss">
.page{
	position: relative;
	height: 100px;
	margin-bottom:30px;
	overflow: hidden;
	.notes{
		overflow:auto;

	}
}
.view-left-enter,.view-right-leave-to{;
  transform:translate(100%);
}
.view-left-leave-to,.view-right-enter{
  transform:translate(-100%);
}
.view-left-enter-active,.view-left-leave-active,.view-right-enter-active,.view-right-leave-active{
  transition: all 0.5s;
  position: absolute;
  width: 100%;
  top: 0;
}

</style>