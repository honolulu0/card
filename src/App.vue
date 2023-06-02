<template>
	<div id="app">
		<router-view />
		<div style="position:fixed;text-align:center;bottom:3%;margin:0 auto;width:100%;color: #ffffff">
			<a target="_blank" style="color: #ffffff" href="https://beian.miit.gov.cn/">鄂公网安备 42010302002496号</a>
			&nbsp; @2022-2023
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		methods: {
			//  @click="handleMouseDown($event)" 
			// handleMouseDown(e) {
			// 	// e.stopPropagation()
			// 	// e.preventDefault
			// 	// console.log("组件点击了",this.$user.info.grade)

			// 	console.log(e.target.className)
			// 	console.log(e.target.parentElement.className)

			// 	if (this.$user.info.grade!==3) {
			// 	if (this.$user.info.grade==2) {


			// 	}
			// 	if (this.$user.info.grade==1) {


			// 	}



			// 	} 
			// }
		}


	}
</script>

<style>
 @import './assets/scss//base.scss';

	html,
	body {
		height: 100%;
		margin: 0;
		padding: 0;
	}

	#app {
		/* font-family: 'Avenir', Helvetica, Arial, sans-serif; */
		font-family: 'Source Han Sans', Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		/* text-align: center; */
		color: #2c3e50;
		height: 100%;
	}
</style>
