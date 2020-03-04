<template>
	<div class="">
		<h1>登录</h1>
		<form  v-on:submit.prevent="submit">
		<div class="control"><input type="text" class="input" v-model="userName" placeholder="用户名"></div>
		<div class="control"><input type="password" class="input" v-model="password" placeholder="密码"></div>
		<div>
			<button class="btn">登录</button>
		</div>
		</form>
	</div>
</template>
<script>
	export default{
		name:"Login",
		data:function(){
			return{
				userName:"",
				password:""
			}
		},
		methods:{
			submit:function(){
				console.log(this)
				if(!(this.userName||this.password)){
					alert('请输入用户名和密码');
					return;
				}
				localStorage.setItem("isLogin",true);
				localStorage.setItem('userName',this.userName);
				if(this.$route.query.from){
					this.$router.replace(this.$route.query.from);
				}else{
					this.$router.push("/");
				}
				
			}
		}
	}
</script>