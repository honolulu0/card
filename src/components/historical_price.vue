<template>
	<div class="raw">
		<SearchCard>
			<el-row type="flex">
				<el-col :span="6">
					<el-input placeholder="请输入您要搜索的关键字" v-model="search_keys" clearable>
					</el-input>

				</el-col>
				<!-- <el-col :span="5" class="ml30">
					价格区间：
					<el-input :disabled="$user.info.grade < 2" style="width:30%" placeholder="0" v-model="min_price"
						clearable>
					</el-input>
					&nbsp;至&nbsp;
					<el-input :disabled="$user.info.grade < 2" style="width:30%" placeholder="0" v-model="max_price"
						clearable>
					</el-input>
				</el-col> -->
				<el-col :span="8" class="ml30">
					<!-- 				时间区间
				<el-input style="width:35%" placeholder="2022-08-03" v-model="min_date" clearable>
				</el-input>
				----
				<el-input style="width:35%" placeholder="2022-10-03" v-model="max_date" clearable>
				</el-input> -->

					<div class="block">
						<span style="margin-right: 10px;">时间区间：</span>
						<el-date-picker class="w70bfb" :disabled="$user.info.grade < 2" :editable="is_supper"
							v-model="date_value" type="daterange" align="right" unlink-panels range-separator="至"
							start-placeholder="开始日期" @change="change" end-placeholder="结束日期"
							:picker-options="pickerOptions" value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>

				</el-col>
				<el-col :span="2">
					<el-button @click="search" type="primary">查询结果</el-button>
				</el-col>
				<template v-if="item_id > 0">
					<el-col :span="13">
						剩余时间：
						<el-input style="width:117px" placeholder="剩余时间" v-model="set_time" clearable>
						</el-input>
						<span class="mr10">&nbsp;秒</span>

						出价：
						<el-input style="width:85px" placeholder="出价" v-model="set_price" clearable>
						</el-input>

						<el-button class="ml50" @click="add_job" type="primary">添加至任务列表</el-button>
					</el-col>
					<!-- <el-col :span="2"> -->
					<!-- </el-col> -->
				</template>
			</el-row>

			<el-row :gutter="20" style="top: 20px;">
				<el-col :span="17" style="height: 40px;">

					<!-- <el-checkbox-group v-model="sport_category_checkList">
						<el-checkbox style="float: left;" v-for="v, k in sport_category" :label="v" :key="k">{{ k }}
						</el-checkbox>
					</el-checkbox-group> -->
					<checkBtn :datalist="sport_category" @checked="checked"></checkBtn>
				</el-col>
				<!--  -->
			</el-row>
		</SearchCard>




		<el-row style="top: 20px">
			<table-content :tableData="table_data" @changeShow="changeShow" :showChange="false" :opation="false">
				<template slot="showContent">
					<div class="search-container" ref="searchContainer"></div>
					<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
						element-loading-background="rgba(0, 0, 0, 0.8)" ref="table" @sort-change="sort_change"
						:default-expand-all="true" :data="table_data" style="width: 100%" :height="tableHeight"
						header-row-class-name="table-header-style" header-align="center">

						<el-table-column :sortable="'custom'" v-for="t in table_name" :prop="t.pop" :label="t.name"
							:width="t.width">

							<template slot-scope="scope">

								<el-image v-if="t.name == '图片'"
									style="width: 80px; height: 95px;border-radius: 4px;"
									:src="scope.row.TitImg + '?imageView2/2/w/200'"  :z-index="9999"
									:preview-src-list="[scope.row.TitImg]">
								</el-image>

								<template v-else-if="t.name == '卡片名称'">
									<el-link class="f18 w70bfb element fjst" style="line-height: 30px;"
										:underline="false"
										:href="'http://www.cardhobby.com.cn/market/item/' + scope.row.card_id"
										target="_blank">
										{{ scope.row[t.pop] }}
									</el-link>
								</template>

								<template v-else-if="t.name == '当前出价'">
									<p style="text-align: start;margin-top: 0px;margin-bottom: 0px;color: red;"
										v-html="handlePrice(scope.row[t.pop])"></p>
								</template>

								<!-- http://www.cardhobby.com.cn/market/item/14555916 -->
								<template v-else>
									{{ scope.row[t.pop] }}
								</template>
							</template>

						</el-table-column>
					</el-table>


					<el-row class="mt20" type="flex" justify="center">
						<el-pagination background @size-change="current_change" @current-change="current_change"
							:current-page="search_data.page" :page-size="60" layout="total, prev, pager, next, jumper"
							:total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</table-content>


			<!-- <table-content v-else @changeShow="changeShow">
				<template slot="showContent">

					<div class="search-container" ref="searchContainer"></div>
					<CardContent ref="CardContent" :height_="tableHeight" :tableData="table_data" :no_check="false" :key="2">
					</CardContent>

					<el-row class="mt20" type="flex" justify="center">
						<el-pagination background @size-change="current_change" @current-change="current_change"
							:current-page="search_data.page" :page-sizes="[20, 60, 100, 200]" :page-size="100"
							layout="total, sizes, prev, pager, next, jumper" :total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</table-content> -->
		</el-row>

		<!-- <el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination background layout="prev, pager, next" :page-size="60" :total="total_page"
				:current-page="search_data.page" @current-change="current_change">
			</el-pagination>
		</el-row> -->


	</div>
</template>

<script>
	import CardContent from '@/components/cardcontent.vue'
	import TableContent from '@/components/tablecontent.vue'
	import SearchCard from '@/components/searchCrad.vue'
	import checkBtn from '@/components/checkBtn.vue'
	import * as Api from '@/api/index.js'
	import sport_category_ from '@/common/SportCategory.js'
	import {
		getDynamicHeight,
		debounce
	} from "@/common/utils.js";

	export default {
		name: 'HistoryPrice',
		props: {
			item_id: 0,
			title: ""
		},
		components: {
			TableContent,
			SearchCard,
			checkBtn,
			CardContent
		},
		data() {
			return {
				is_supper: true,
				date_value: [],
				pickerOptions: {
					disabledDate: this.disabled_date,
					shortcuts: [{
							text: '最近一个月',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
								picker.$emit('pick', [start, end]);
							}
						}, {
							text: '最近三个月',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
								picker.$emit('pick', [start, end]);
							}
						},
						{
							text: '最近半年',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
								picker.$emit('pick', [start, end]);
							}
						}, {
							text: '最近一年',
							onClick(picker) {
								const end = new Date();
								const start = new Date();
								start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
								picker.$emit('pick', [start, end]);
							}
						},

					]
				},
				//自动竞价
				set_price: 1,
				set_time: 3,
				//加载动画
				loading: false,
				//表格
				tableHeight: 0,
				table_name: [{
					pop: "TitImg",
					name: "图片",
					width: 120
				}, {
					pop: "Title",
					name: "卡片名称",
					width: ''
				}, {
					pop: "LowestPrice",
					name: "当前出价",
					width: 130
				}, {
					pop: "EffectiveDate",
					name: "结束时间",
					width: 240
				}],
				table_data: [],
				//搜索参数
				max_price: 0,
				min_price: 0,
				max_date: '',
				min_date: '',
				sport_category_checkList: [],
				sport_category: sport_category_,
				search_keys: "",
				search_data: {
					title: "",
					sports: "",
					order_by: "",
					filter: "",
					page: 1
				},
				total_page: 0,
				showType: ''

			};
		},
		mounted() {
			// 初始化给table高度赋值
			this.getHeight();
			// 屏幕resize监听方法
			this.screenMonitor();
			this.search_data.order_by = 'order by unix_timestamp(EffectiveDate) desc'
			if (this.item_id > 0) {
				this.get_formart_keys()
			} else {

				this.search_history()
			}

		},
		methods: {
			change(price) {
				console.log(price);
			},
			handlePrice(price) {
				//ps:v-html绑定数据
				//1.分割价钱 => ["12", "00"]
				let splitPrice = String(price).split(".");
				let p_decimal = splitPrice[1] == undefined ? "00" : splitPrice[1]
				//2.重新赋值
				return `<span class="price">¥</span><span class="price"  style="font-size:22px;">${splitPrice[0]}.</span><span class="price">${p_decimal}</span> `;

			},
			disabled_date(time) {
				// console.log(time);
				// 将日期值大于结束日期的禁用
				return !this.is_supper;

			},


			add_job() {
				Api.add_job({
					"itemids": [this.item_id],
					"remaining_time": this.set_time,
					"price": this.set_price
				}).then((res) => {
					console.log(res);

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

				}).catch((err) => {
					this.$message({
						message: "设置失败请确认已经登录",
						type: 'warning'
					});
				})
			},

			get_formart_keys() {

				Api.formart_keys({
					"title": this.title,
					"item_id": this.item_id

				}).then((res) => {
					this.search_keys = res.data.title
					this.sport_category_checkList.push(res.data.sport)
					this.search_history()
				})

			},
			current_change(index) {
				this.handleScrollTop()
				this.search_data.page = index
				this.search_history()
			},
			handleScrollTop() {
				this.$nextTick(() => {
					document.getElementsByClassName("el-table__body-wrapper is-scrolling-none")[0].scrollTop = 0

				});
			},
			search() {
				this.search_data.page = 1
				this.search_history()
			},

			sort_change(column, prop, order) {
				console.log('排序', column.prop, column.order, column.order == null);

				if (column.order == null) {
					this.search_data.order_by = ""
				} else {

					let sort = "desc"
					if (column.order == "ascending") {
						sort = "asc"
					}
					if (column.prop == "LowestPrice") {
						this.search_data.order_by = 'order by  LowestPrice +0 ' + sort
					} else if (column.prop == "EffectiveDate") {
						this.search_data.order_by = 'order by unix_timestamp(EffectiveDate) ' + sort
					} else {
						return
					}
				}



				this.table_data = []
				this.search()
			},

			search_history() {
				this.loading = true
				// console.log(this.sport_category_checkList);
				this.search_data.title = this.search_keys

				this.search_data.sports = this.sport_category_checkList.join(",")

				this.search_data.filter = ""
				if (this.min_price != "" && this.max_price != "") {
					this.search_data.filter = " and LowestPrice > " + this.min_price + " and LowestPrice < " + this
						.max_price
				}


				if (this.date_value.length > 0) {
					this.search_data.filter += " and EffectiveDate > '" + this.date_value[0] +
						"' and EffectiveDate < '" + this
						.date_value[1] + "'"
				}

				// console.log(this.search_data);
				Api.search_history(this.search_data).then((data) => {
					if (data.code == 1) {
						this.table_data = data.data
						this.total_page = data.TotalCount
					}
				}).finally(() => {
					this.loading = false
				})
			},

			screenMonitor() {
				let resize = debounce(() => {
					this.getHeight();
				}, 100);
				// 屏幕resize监听事件：一旦屏幕宽高发生变化，就会执行resize
				window.addEventListener("resize", resize, true);
				// 将屏幕监听事件移除
				// 这步是必须的。离开页面时不移除，再返回，或者进入到别的有相同元素的页面会报错
				// 或者将这里的方法直接写在beforeDestroy函数中也可，不过我感觉这样写更明了些
				this.$once("hook:beforeDestroy", () => {
					window.removeEventListener("resize", resize, true);
				});
			},
			getHeight() {
				// 为什么设置了一个定时器我忘却了。。。。大概因为在获取元素时还没有元素吧哈哈哈哈我真的讲不明白但是得有这个定时器
				setTimeout(() => {
					this.tableHeight = getDynamicHeight(this.$refs.searchContainer).height - 120;
				}, 400);
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex % 2 === 0) {
					return 'success-row';
				}
				return 'warning-row';
			},
			checked(val) {
				this.sport_category_checkList = val;
			},
			changeShow(type) {
				console.log(type);
				this.showType = type;
			},

		}


	}
</script>

//
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
	/deep/.el-table .warning-row {
		background: #f4d59a;
	}

	/deep/.el-table .success-row {
		background: #b2ea94;
	}

	/* 	/deep/.el-picker-panel__body {
		pointer-events: none;
	} */
</style>
