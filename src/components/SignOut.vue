<template>
	<div class="sign-out">
		<span class="btn" v-on:click="signOut">退出登录</span>
	</div>
</template>
<style lang="scss">
	.sign-out{
		display: inline-block;
		span{
			cursor: pointer;
		}
	}
</style>
<script>
	export default{
		methods:{
			signOut(){
				localStorage.removeItem("isLogin");
				this.$router.replace({name:"Login"})
			}
		}
	}
</script>