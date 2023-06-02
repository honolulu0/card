<template>
	<div style="height: 100%;">
		<el-row>
			<el-col :span="2">
				<img style="height: 75%;margin-top: 7%;" src='../assets/basketball.png'>

				</img>
			</el-col>
			<el-col :span="4" style="text-align: start;">

				<span class="title">
					球星卡查询网
					<span class="version">1.0</span>
				</span>

			</el-col>
			<el-col :span="14">
				<div class="header-content"></div>
			</el-col>
			<el-col :span="4">
				<span style="color: aliceblue;font-size: small;">
					{{grade[user.grade-1]}}
				</span>
				<span v-if="user.grade!==1" style="color: aliceblue;margin-right: 30px;font-size: small;">
					：{{user.expiration}}
				</span>
				<el-dropdown @command="handleCommand">
					<span class="el-dropdown-link" style="color: aliceblue">
						{{user.nickname}}
					</span>

					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="out" @click="endOut">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>

			</el-col>
		</el-row>


	</div>
</template>

<script>
	import * as Api from '@/api/index.js'
	export default {
		name: 'Header',
		props: {
			msg: String
		},
		data() {
			return {
				grade: ["普通会员", "黄金会员", "钻石会员"],
				user: {}
			}
		},
		created() {

			Api.user_info().then((data) => {
				if (data.code == 1) {
					this.user = data.data
					this.$user.info = data.data
					localStorage.setItem('user', JSON.stringify(data.data))
				} else {
					this.$message({
						message: data.message,
						type: 'warning'
					});
				}

			})
		},
		methods: {
			handleCommand(command) {

				if (command == "out") {
					this.endOut()
				}
			},
			endOut() {
				// localStorage.clear()清除上次登录用户名密码，若此时在地址栏输入项目网址相关页面，仍可以进入项目页面中，故加了下一行
				localStorage.clear()
				//加入该行后会清除缓存，当点击退出按钮后，会清除登录信息缓存
				this.$router.push('/login')
			}


		},

	}
</script>

<style scoped>
	.el-row {
		height: 100%;

		background: #002140;
	}

	.el-col {
		height: 100%;
	}

	.title {
		color: inherit;
		font-size: 20px;
		position: relative;
		box-sizing: border-box;
		line-height: 1.4;
		color: #fff;
		cursor: pointer;
	}

	.version {
		color: inherit;
		position: absolute;
		right: -25px;
		font-size: 14px;
		top: -10px;
	}
</style>
