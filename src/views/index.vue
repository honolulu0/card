---------------Login.vue----------------
<template>
	<div class="login-wrap">
		<!-- <el-form class="login-container">
			<h1 class="title">用户登录：</h1>
			<el-form-item>
				<el-input type="text" placeholder="手机号" v-model="phone" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-input type="password" placeholder="用户密码" v-model="password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="doLogin" style="width: 100%;">登录</el-button>
			</el-form-item>
			<el-row  style="text-align: center;margin-top: -10px;">
				 <el-col :span="12">
				<el-link type="primary" @click="toRegister">用户注册</el-link>
				</el-col>
				 <el-col :span="12">
				<el-link type="primary" @click="toRetrieve">忘记密码</el-link>
				</el-col>
			</el-row>
		</el-form> -->
		<el-card class="login-container">
			<el-row class="login-content" type="flex">
				<el-col :span="12">
					<div class="login-left" style="padding-top: 86px;">
						<p class="login-title tc">
							<img src="../assets/image/login/title.png" alt="">
						</p>

						<div class="login-left-bg">
							<img src="../assets/image/login/Group 3027.png" alt="">
							<img src="../assets/image/login/4.png.png" alt="">
							<img src="../assets/image/login/8.png.png" alt="">
						</div>

					</div>
				</el-col>
				<el-col :span="12">
					<el-form class="login-form">
						<h1 class="title">
							<span>欢迎登录</span> <br />
							<span>球星卡查询</span>
						</h1>
						<el-form-item>
							<el-input class="not-el-input" type="text" placeholder="请输入手机号" v-model="phone"
								autocomplete="off"></el-input>
						</el-form-item>

						<el-form-item>
							<el-input class="not-el-input" type="password" placeholder="请输入密码" v-model="password"
								autocomplete="off"></el-input>
						</el-form-item>

						<el-form-item style="margin-top: 56px;">
							<el-button class="button-color f20" type="primary" @click="doLogin" style="width: 100%;"
								round>登录</el-button>
						</el-form-item>

						<el-row style="margin-top: -10px;">
							<el-col :span="12" class="tl pl30">
								<el-link :underline="false" type="primary" @click="toRegister">用户注册</el-link>
							</el-col>
							<el-col :span="12" class="tr pr30">
								<el-link :underline="false" type="primary" @click="toRetrieve">忘记密码?</el-link>
							</el-col>
						</el-row>
					</el-form>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
import * as Api from '../api/index.js'
export default {
	name: 'Login',
	data: function () {
		return {
			phone: '',
			password: ''
		}
	},
	methods: {
		doLogin: function () {

			Api.login({
				phone: this.phone,
				password: this.password
			}).then((res) => {
				if (res.code == 1) {
					localStorage.setItem('user', JSON.stringify(res.data))
					this.$router.push({
						name: 'OnSale'
					});
				} else {
					this.$message({
						message: res.message,
						type: 'warning'
					});
				}

			})
		},
		toRegister: function () {
			this.$router.push('/register');
		},
		toRetrieve: function () {
			this.$router.push('/retrieve');
		}
	}
}
</script>

<style lang="scss" scoped>
$-default-color: rgba(47, 76, 221, 1);

.login-wrap {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	margin: auto 0;
	background-image: url('../assets/image/login/login-bg.png');
	/* background-color: #112346; */
	background-repeat: no-repeat;
	background-position: center right;
	background-size: 100%;
	display: flex;
	align-items: center;
	/* 在交叉轴上垂直居中对齐 */
	position: relative;
}

.login-container {
	border-radius: 24px;
	margin: auto auto;
	width: 1436px;
	height: 848px;
	padding: 30px 35px 15px 35px;
	// background: #fff;
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(29, 40, 94, 0.2) 100%), rgba(255, 255, 255, 1);
	border: 1px solid #eaeaea;
	text-align: left;
	box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.login-left {
	box-sizing: border-box;
}

.login-left-bg {
	position: relative;
	margin-top: 31px;

	>img:nth-of-type(1) {
		position: absolute;
		z-index: 0;
	}

	>img:nth-of-type(3) {
		position: absolute;
		z-index: 1;
		left: 65px;
	}

	>img:nth-of-type(2) {
		position: absolute;
		z-index: 2;
		left: 25%;
		top: 55px;
	}
}

.login-form {
	width: 400px;
	padding: 0px 4px;
	padding-top: 174px;
	box-sizing: border-box;
	margin: 0 auto;
}

.title {
	font-size: 36px;
	font-weight: 400;
	line-height: 54px;
	margin-bottom: 50px;

	>span:nth-of-type(2) {
		color: $-default-color;
		font-family: emoji;
		font-weight: bold;
	}
}

/deep/ .button-color {
	background-color: linear-gradient(135deg, rgba(47, 76, 221, 1) 0%, rgba(47, 76, 221, 0.8) 100%) !important;
}

.not-el-input {
	>input {
		background: none;
		color: $-default-color;
		border: none;
		/* 去除所有边框 */
		border-bottom: 1px solid rgba($color: $-default-color, $alpha: .5);
		/* 保留下边框线 */
		outline: none;
		/* 去除 outline */
		box-shadow: none;
		/* 去除阴影效果 */
		border-radius: 0;

		&::placeholder {
			color: rgba($color: $-default-color, $alpha: .5);
			font-size: 16px;
		}
	}
}

// .footer {
// 	font-size: 18px;
// 	font-weight: 400;
// 	letter-spacing: 0px;
// 	line-height: 26.06px;
// 	text-align: center;
// 	vertical-align: top;
// 	color: #ffffff;
// 	text-align: center;
// 	position: absolute;
// 	bottom: 30px;
// }
</style>
