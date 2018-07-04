<template>
	<div class="header">
		<div class="logo"><img src="../assets/logo.png"></div>
		<div class="right">
			<ul>
				<li><router-link to="/router">路由</router-link></li>
			</ul>
		</div>
	</div>
</template>

<style lang="scss">
	.header{
		position: fixed;
		width:100%;
		left:0px;
		top:0px;
		z-index: 2;
		height: 80px;
		line-height:80px;
		background: #f9f9f9;
		border-bottom: 1px solid #e2e2e2;
		box-sizing:border-box;
		.logo{
			position: relative;
			width: 200px;
			height:100%;
			text-align:center;
			float:left;
			img{
				position: absolute;
				margin: auto;
				top: 0px;
				left: 0px;
				bottom: 0px;
				right: 0px;
				max-width:60px;
			}
		}
		.right{
			overflow:hidden;
			text-align:right;
			padding-right: 20px;
			ul{
				li{
					list-style-type: none;
				}
			}
		}
	}
</style>