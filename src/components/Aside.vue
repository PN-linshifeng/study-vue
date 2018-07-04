<template>
	<div class="aside">
		<ul>
			<li>
				<router-link to="/" exact >路由</router-link>
				<div class="child">
					<ul>
						<li>
							<router-link to="/router-match">动态路由匹配</router-link>
						</li>
						<li>
							<router-link to="/router-nested">嵌套路由</router-link>
						</li>
						<li>
							<router-link to="/router-nav">编程式的导航</router-link>
						</li>
						<li>
							<router-link to="/router-name">命名路由</router-link>
						</li>

						<li>
							<router-link to="/router-view">命名视图</router-link>
						</li>
						<li>
							<router-link to="/router-redirect">重定向和别名</router-link>
						</li>
						<li>
							<router-link to="/router-props">路由组件传参</router-link>
						</li>
						<li>
							<router-link to="/router-history">HTML5 History 模式</router-link>
						</li>
						<li>
							<router-link to="/router-guards">导航守卫</router-link>
						</li>
						<li>
							<router-link to="/router-meta">路由元信息</router-link>
						</li>
						<li>
							<router-link to="/router-transition">过渡动态</router-link>
						</li>
						<li>
							<router-link to="/router-lazy">路由懒加载</router-link>
						</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>
</template>	
<script>
	export default{
		beforeRouteEnter :function(){
			console.log('beforeEnter')
		},
		beforeRouteUpdate:function(){
			console.log('beforeRouteUpdate')
		}
	}
</script>
<style lang="scss">
	.aside{
		ul{
			padding:0px;
			padding-left: 10px;
			line-height: 40px;
			font-size:16px;
			.child{
				margin-left: -10px;
				padding-left:10px;
				background:#fff;
			}
			ul{
				font-size: 14px;
				line-height:30px;
			}
			li{
				list-style: none;
			}
		}
	}
</style>