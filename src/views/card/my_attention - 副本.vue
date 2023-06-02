<template>
	<div class="raw">





<el-col :span="4">
		</el-col>
<el-col :span="20">
		<el-row type="flex">
			<el-col :span="9">
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
			<el-col :span="2">
				<el-checkbox style="top:23%;" v-model="only_today">仅显示当天</el-checkbox>
			</el-col>
			<el-col :span="3">
				<el-button @click="search" type="primary">查询结果</el-button>
			</el-col>
			<el-col :span="2" style="height: 40px;">
				<el-button @click="add_attention" type="success" plain>添加关注</el-button>
				<!-- <el-button type="danger" plain>删除关注</el-button> -->


			</el-col>
			<el-col :span="2" style="height: 40px;">
				<el-popover ref="empPopover" placement="top-start" width="200" trigger="hover">
					<div>

						<el-tree :check-on-click-node="true" @check="node_change" :data="attention_data_" show-checkbox
							default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
						</el-tree>
						<el-button @click="del_attention" type="danger" plain>删除关注</el-button>
					</div>

					<el-button slot="reference">所有关注</el-button>
				</el-popover>

			</el-col>
		</el-row>

		<el-row :gutter="20" style="top: 20px;">
			<el-col :span="18" style="height: 40px;">

				<el-checkbox-group v-model="sport_category_checkList">
					<el-checkbox style="float: left;" v-for="v,k in sport_category" :label="v" :key="k">{{k}}
					</el-checkbox>
				</el-checkbox-group>
			</el-col>

		</el-row>

		<el-row style="top: 20px">
			<div class="search-container" ref="searchContainer"></div>
			<el-table  :default-expand-all="true" :data="table_data_" border
				style="width: 100%" :height="tableHeight">

				<el-table-column v-for="t in table_name" :prop="t.pop" :label="t.name" :width="t.width">

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

				<el-table-column fixed="right" label="操作" width="180">
					<template slot-scope="scope">
						<el-button @click="show_dialog(scope.row.ID,scope.row.Title)" type="text" size="small">自动查价竞拍
						</el-button>
						<el-button type="text" @click="for_search" size="small">刷新</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>

		<el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination background layout="prev, pager, next" :total="total_page" @current-change="current_change"
				:current-page="search_data.page">
			</el-pagination>
		</el-row>
	</el-col>



		<el-dialog title="自动查价竞拍" :visible.sync="dialogTableVisible"  width="90%">
			<HistoryPrice v-if="dialogTableVisible" :item_id="item_id" :title="title"></HistoryPrice>
		</el-dialog>


	</div>

</template>

<script>
	import * as Api from '../../api/index.js'
	import sport_category_ from '../../common/SportCategory.js'
	import {
		getDynamicHeight,
		debounce
	} from "../../common/utils.js";
	import HistoryPrice from '../../components/historical_price.vue'
	export default {
		name: 'my_attention',
		components: {
			HistoryPrice
		},
		data() {
			return {
				//弹窗
				dialogTableVisible: false,
				item_id: 0,
				title: '',
				
				//树形
				attention_data_: [],
				defaultProps: {
					children: 'children',
					label: 'Title'
				},

				ti: '',
				sp: '',


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
					width: 100
				}, {
					pop: "EffectiveTime",
					name: "结束时间",
					width: 100
				}],
				table_data: [],
				table_data_: [],
				//搜索参数
				max_price: 0,
				min_price: 0,
				only_today: false,
				sport_category_checkList: [],
				sport_category: sport_category_,
				search_keys: "",
				search_data: {
					title: "",
					sports: "",
					page: 1
				},
				total_page: 0,
				today: ''

			};
		},
		mounted() {
			// 初始化给table高度赋值
			this.getHeight();
			// 屏幕resize监听方法
			this.screenMonitor();
			this.get_all_attention()
			// this.for_search()
			this.get_today()

		},
		methods: {
			
			show_dialog(item_id, title) {
				// console.log(item_id, title);
				this.item_id = item_id
				this.title = title
				this.dialogTableVisible = true
			},
			getCheckedKeys() {
				return this.$refs.tree.getCheckedKeys()
			},
			setCheckedKeys(list) {
				this.$refs.tree.setCheckedKeys(list);
			},
			get_all_attention() {
				this.attention_data_ = []
				Api.all_attention().then((data) => {
					var i = 0
					var attention_data = {}

					var attention_checked = []
					data.data.forEach((item) => {
						let data_list = []

						if (item.checked == '1') {
							attention_checked.push(item.id)
						}

						if (!(item.Sports in attention_data)) {
							attention_data[item.Sports] = i
							this.attention_data_.push({
								id: i,
								Title: item.Sports,
								children: [],
								disabled: true
							})
							i += 1
						}
						// console.log(item.Sports, attention_data, attention_data[item.Sports]);
						data_list = this.attention_data_[attention_data[item.Sports]].children
						data_list.push(item)
					})
					// console.log(this.attention_data_);
					// console.log(attention_checked);
					setTimeout(() => {
						this.$refs.empPopover.doShow()
						this.setCheckedKeys(attention_checked)
					}, 1000)

				})
			},
			add_attention() {
				let sport_ = this.sport_category_checkList
				if (!this.sport_category_checkList.length > 0) {
					sport_ = [""]
				}

				Api.add_attention({
					title: this.search_keys,
					sport: sport_[0]
				}).then((data) => {
					// console.log(data)
					this.get_all_attention()
				})
			},
			del_attention() {

				let ss = this.getCheckedKeys()
				for (let s of ss) {
					Api.del_attention({
						id: s
					}).then((data) => {
						// console.log(data)
						this.get_all_attention()
					})
				}


			},
			modify_checked(id, s) {
				Api.modify_checked({
					id: id,
					checked: s
				}).then((data) => {
					// console.log(data)
				})
			},
			node_change(data, self) {
				// console.log(data,data.id, self);
				if (self.checkedKeys.indexOf(data.id) > -1) {
					this.modify_checked(data.id, 1)
					return
				}
				this.modify_checked(data.id, 0)
			},

			current_change(index) {
				this.search_data.page = index
				this.for_search()
			},
			for_search() {
				this.table_data = []
				let ss = this.$refs.tree.getCheckedNodes()
				for (let s of ss) {
					this.ti = s.Title
					this.sp = s.Sports
					this.card_search()
				}
				this.table_data_ = this.table_data

			},
			search() {
				this.search_data.page = 1
				this.for_search()
			},
			card_search() {
				var sport_ = []
				this.search_data.title = this.ti
				this.search_data.sports = this.sp
				Api.card_search(this.search_data).then((data) => {
					if (data.code == 1) {
						var s1, s2
						this.min_price = Number(this.min_price)
						this.max_price = Number(this.max_price)
						let aa = data.data.PagedMarketItemList.filter((item) => {
							s1 = !(this.min_price < this.max_price)
							s2 = !this.only_today
							if (this.min_price < this.max_price && this.min_price < item
								.LowestPrice &&
								item.LowestPrice < this
								.max_price) {
								s1 = true
							}

							if (this.only_today && item.EffectiveDate.indexOf(this.today)>-1) {
								s2 = true
							}
							return s1 && s2
						})
						this.table_data.push(...aa)

						if (data.data.Total > this.total_page) {
							this.total_page = data.data.Total
						}
					}
				})
			},
			get_today() {
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				month = (month > 9) ? month : ("0" + month);
				day = (day < 10) ? ("0" + day) : day;
				this.today = year + "-" + month + "-" + day;

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
