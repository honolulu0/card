<template>
	<div class="raw">

		<el-row type="flex">
			<el-col :span="6">
				<el-input placeholder="请输入内容" v-model="search_keys" clearable>
				</el-input>

			</el-col>
			<el-col :span="6">
				价格区间
				<el-input style="width:30%" placeholder="0" v-model="min_price" clearable>
				</el-input>
				----
				<el-input style="width:30%" placeholder="0" v-model="max_price" clearable>
				</el-input>
			</el-col>
			<el-col :span="10">
				时间区间
				<el-input style="width:35%" placeholder="2022-08-03" v-model="min_date" clearable>
				</el-input>
				----
				<el-input style="width:35%" placeholder="2022-10-03" v-model="max_date" clearable>
				</el-input>
			</el-col>
			<el-col :span="2">
				<el-button @click="search" type="primary">查询结果</el-button>
			</el-col>
		</el-row>

		<el-row :gutter="20" style="top: 20px;">
			<el-col :span="24" style="height: 40px;">

				<el-checkbox-group v-model="sport_category_checkList">
					<el-checkbox style="float: left;" v-for="s in sport_category_keys" :label="s">
					</el-checkbox>
				</el-checkbox-group>
			</el-col>
		</el-row>

		<el-row style="top: 20px">
			<div class="search-container" ref="searchContainer"></div>
			<el-table ref="table" @sort-change="sort_change" 
				:default-expand-all="true" :data="table_data" border style="width: 100%" :height="tableHeight">

				<el-table-column :sortable="'custom'" v-for="t in table_name" :prop="t.pop" :label="t.name"
					:width="t.width" sortable>

					<template slot-scope="scope">

						<el-image v-if="t.name == '图片'" style="width: 100px; height: 133px"
							:src="scope.row.TitImg+'?imageView2/2/w/200'" :preview-src-list="[scope.row.TitImg]">
						</el-image>

						<a v-else-if="t.name == '卡片名称'" target="_blank"
							:href="'http://www.cardhobby.com.cn/market/item/'+scope.row.ID">{{scope.row[t.pop]}}</a>

						<template v-else>
							{{scope.row[t.pop]}}
						</template>
					</template>

				</el-table-column>

				<!-- 				<el-table-column fixed="right" label="操作" width="180">
					<template slot-scope="scope">
						<el-button @click="update_leader(scope.row)" type="text" size="small">自动查价竞拍</el-button>
						<el-button type="text" @click="search_history" size="small">刷新</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</el-row>

		<el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination background layout="prev, pager, next" :total="total_page" :current-page="search_data.page"
				@current-change="current_change">
			</el-pagination>
		</el-row>


	</div>

</template>

<script>
	import * as Api from '../../api/index.js'
	import sport_category from '../../common/SportCategory.js'
	import {
		getDynamicHeight,
		debounce
	} from "../../common/utils.js";

	export default {
		name: 'historical_price',
		data() {
			return {
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
					width: 120
				}, {
					pop: "EffectiveDate",
					name: "结束时间",
					width: 180
				}],
				table_data: [],
				//搜索参数
				max_price: 0,
				min_price: 0,
				max_date: '2022-12-03',
				min_date: '2022-09-03',
				sport_category_keys: [],
				sport_category_checkList: [],
				search_keys: "",
				search_data: {
					title: "",
					sports: "",
					order_by: "",
					filter: "",
					page: 1
				},
				total_page: 0,

			};
		},
		mounted() {
			// 初始化给table高度赋值
			this.getHeight();
			// 屏幕resize监听方法
			this.screenMonitor();
			this.sport_category_keys = Object.keys(sport_category)
			this.search_history()

		},
		methods: {


			current_change(index) {
				this.search_data.page = index
				this.search_history()
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
				var sport_ = []
				this.search_data.title = this.search_keys

				if (this.sport_category_checkList.length > 0) {
					sport_ = this.sport_category_checkList.map((item) => {
						return sport_category[item]

					})
					this.search_data.sports = sport_.join(",")
				} else {
					this.search_data.sports = ""
				}



				this.search_data.filter = ""
				if (this.min_price != "" && this.max_price != "") {
					this.search_data.filter = " and LowestPrice > " + this.min_price + " and LowestPrice < " + this
						.max_price
				}


				if (this.min_date != "" && this.max_date != "") {
					this.search_data.filter += " and EffectiveDate > '" + this.min_date + "' and EffectiveDate < '" + this
						.max_date + "'"
				}



				Api.search_history(this.search_data).then((data) => {
					if (data.code == 1) {
						this.table_data = data.data
						this.total_page = Math.ceil(Number(data.TotalCount) / 60)
					}
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
					this.tableHeight = getDynamicHeight(this.$refs.searchContainer).height;
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
</style>
