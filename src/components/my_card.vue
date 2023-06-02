<template>
	<div class="raw">
		<el-card style="width: 220px;height: 350px;" :body-style="{ padding: '0px' }">
			<div class="ribbon-wrapper" :data-ribbon-text="end_time">
				<el-checkbox v-if="no_check" class="check_box" v-model="checked"
					@change="checkbox_change($event, data, index)"></el-checkbox>
				<el-image class="image" style="width: 220px; height: 260px" :src="images_url+'?imageView2/2/w/200'" :preview-src-list="[images_url]"
					fit="'cover'"></el-image>
					
					
			</div>
			<div class="pl10 pr10">
				<!-- <p class="title">{{ title }}</p> -->
				<el-link class="f18 w70bfb element fjst" style="line-height: 30px;" :underline="false"
					:href="'http://www.cardhobby.com.cn/market/item/' + id" target="_blank">
					<p class="title">{{ title }}</p>
				</el-link>
				<p style="text-align: start;margin-top: 0px;margin-bottom: 0px;color: red;" v-html="handlePrice(price)">
				</p>
				<el-button v-if="no_bidding" type="text" class="button" @click="show_dialog(id, title)">自动查价竞拍
				</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: 'my_card',
		components: {},
		props: {
			id: {
				type: Number,
				default: 0
			},
			checked: {
				type: Boolean,
				default: false
			},
			images_url: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: ''
			},
			price: {
				type: [Number, String],
				default: 0.00
			},
			end_time: {
				type: String,
				default: ''
			},
			data: {
				type: Object,
				default: () => {
					return {}
				}
			},
			datas: {
				type: Array,
				default: () => {
					return []
				}
			},
			index: {
				type: Number
			},
			no_check: {
				type: Boolean,
				default: true
			},
			no_bidding: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				dialogTableVisible: false,
				item_id_: '',
				title_: ''
			};

		},
		created() {},
		mounted() {},
		methods: {
			checkbox_change(event, item, index) {
				this.$emit('checkbox_change', event, item, index)
			},

			handlePrice(price) {
				//ps:v-html绑定数据
				//1.分割价钱 => ["12", "00"]
				let splitPrice = String(price).split(".");
				let p_decimal = splitPrice[1] == undefined ? "00" : splitPrice[1]
				//2.重新赋值
				return `<span class="price">¥</span><span class="price"  style="font-size:22px;">${splitPrice[0]}.</span><span class="price">${p_decimal}</span> `;

			},
			show_dialog(item_id, title) {
				// console.log(item_id, title);
				this.$emit('show_dialog', item_id, title)
			},
		}
	}
</script>
<style lang="scss" scoped>
	// .raw+.raw {
	// 	margin-left: 20px;
	// 	margin-bottom: 30px;
	// }

	.check_box {
		position: absolute;
		top: 10px;
		right: 10px;
		z-index: 99;
	}

	.ribbon-wrapper {
		position: relative;
		display: inline-block;
	}

	.ribbon-wrapper::after {
		content: attr(data-ribbon-text);
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 30px;
		background: linear-gradient(90deg, rgba(230, 57, 18, 0.8) 0%, rgba(242, 106, 75, 0.8) 100%);
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color: rgba(233, 230, 230, 80%);
		font-size: 12px;
		font-weight: 400;
		letter-spacing: 0.56px;
	}

	.ribbon-wrapper img {
		display: block;
		max-width: 100%;
	}





	.price_ {
		font-size: 10px;
		font-weight: 400;
		letter-spacing: 0.56px;
		line-height: 14px;
		color: rgba(230, 57, 18, 1);
		text-align: left;
	}

	.price {
		left: 345.15px;
		top: 707px;
		width: 44.62px;
		height: 14px;
		opacity: 1;
		font-size: 14px;
		font-weight: 700;
		letter-spacing: 0.56px;
		line-height: NaNpx;
		color: rgba(230, 57, 18, 1);
		text-align: left;
	}

	.title {
		font-family: "思源黑体", "Microsoft YaHei";
		/*设置p元素最大2行，父元素需填写宽度才明显*/
		text-overflow: ellipsis;
		overflow: hidden;
		/* autoprefixer: off */
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-moz-box-orient: vertical;
		/* autoprefixer: on */

		/*因为代码环境的关系-webkit-box-orient被过滤掉了 autoprefixer 这个关键字可以免除被过滤的动作*/
		width: 200px;
		color: rgba(0, 0, 0, 1);
		font-size: 12px;
		font-weight: 500;
		letter-spacing: 0.56px;
		line-height: 18px;
		text-align: left;
		height: 39px;
	}



	.button {
		color: rgba(150, 155, 160, 1);
		float: right;
		padding-top: 0px;
		padding-bottom: 0px;
	}

	.image {
		border-radius: 3%;
		width: 100%;
		display: block;
	}
</style>
