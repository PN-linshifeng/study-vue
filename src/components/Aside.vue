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
					</ul>
				</div>
			</li>
			
		</ul>
	</div>
</template>	
<style lang="scss">
	.aside{
		ul{
			padding:0px;
			padding-left: 10px;
			line-height: 25px;
			.child{
				margin-left: -10px;
				padding-left:10px;
				background:#fff;
			}
			ul{
				font-size: 13px;
			}
			li{
				list-style: none;
			}

		}

	}
</style>