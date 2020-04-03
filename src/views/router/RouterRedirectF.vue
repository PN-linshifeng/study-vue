<template>
	<div class="">
		<p>query：{{JSON.stringify($route.query)}}</p>
		<p>params:{{JSON.stringify($route.params)}}</p>
		<p>hash:{{$route.hash}}</p>
	</div>
</template>