<template>
	<div class="header">
		<div class="logo"><img src="../assets/logo.png"></div>
		<div class="right">
			
		</div>
	</div>
</template>

<style lang="scss">
	.header{
		position: fixed;
		width:100%;
		left:0px;
		top:0px;
		height: 80px;
		background: #f9f9f9;
		border-bottom: 1px solid #e2e2e2;
		box-sizing:border-box;
		.logo{
			position: absolute;
			width: 200px;
			height:100%;
			text-align:center;
			img{
				position: absolute;
    			margin: auto;
    			top: 0; 
    			left: 0; 
    			bottom: 0; 
    			right: 0;
				max-width:60px;
			}
		}
	}
</style>