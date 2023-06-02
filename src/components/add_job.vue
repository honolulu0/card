<template>
	<div class="raw">
		<el-row :gutter="20" >
			<el-col :span="24">
				剩余时间：
				<el-input style="width:30%" placeholder="剩余时间" v-model="set_time" clearable>
				</el-input>
				&nbsp;出价&nbsp;
				<el-input style="width:30%" placeholder="出价" v-model="set_price" clearable>
				</el-input>

				<el-button class="ml20" @click="add_job" type="primary">添加任务</el-button>
			</el-col>

		</el-row>

	</div>

</template>

<script>
	import * as Api from '@/api/index.js'


	export default {
		name: 'AddJob',
		props: {
			id_list: Array
		},
		data() {
			return {
				set_time: 3,
				set_price: ''
			}
		},
		mounted() {

		},
		methods: {

			add_job() {
				Api.add_job({
					"itemids": this.id_list,
					"remaining_time": this.set_time,
					"price": this.set_price
				}).then((res) => {
				
					if (res.code === 1) {
						this.$message({
							message: "添加成功=》" + res.data.s,
							type: 'success'
						});
					} else {
						this.$message({
							message: "部分失败=》" + res.data.f,
							type: 'warning'
						});
					}

					this.$emit("closed_add_job")
				}).catch((err) => {
					console.log(err);
					this.$message({
						message: "设置失败请确认已经登录",
						type: 'warning'
					});
				})
			},

		}


	}
</script>

//
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

</style>
