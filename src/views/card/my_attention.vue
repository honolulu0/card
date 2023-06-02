<template>
	<div class="raw">

		<el-col :span="6">

			<el-card style="margin-right: 20px;border-radius: 20px;">
				<div slot="header" class="flex fjb" style="align-items: center;">

					<el-button class="w100" type="primary" size="small" @click="handleAddFocus">添加关注</el-button>
					<el-button class="w100" @click="del_attention" type="primary" size="small">删除</el-button>
					<!-- <el-button class="w100" :disabled="is_ok" @click="search" type="primary" size="small" icon="el-icon-search">查询结果</el-button> -->
					<!-- <el-button class="w100" :disabled="!ss.length > 0" @click="search" type="primary" size="small"
						icon="el-icon-search">查询结果</el-button> -->

				</div>
				<!-- @check="node_change" -->
				<el-tree :check-on-click-node="true" @check="check_node" @check-change="node_change"
					:data="attention_data_" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current
					:props="defaultProps" :default-checked-keys="attentionChecked">
				</el-tree>
			</el-card>
		</el-col>

		<el-col :span="18">

			<SearchCard :height="'auto'">
				<el-row type="flex" :gutter="20">
					<!-- <el-col :span="9">
						<el-input placeholder="请输入您要搜索的关键字" v-model="search_keys" clearable>
						</el-input>

					</el-col> -->
					<el-col :span="9">
						价格区间：
						<el-input style="width:30%" placeholder="0" v-model="min_price" clearable>
						</el-input>
						&nbsp;至&nbsp;
						<el-input style="width:30%" placeholder="0" v-model="max_price" clearable>
						</el-input>
					</el-col>
					<el-col :span="3">
						<el-checkbox style="top:23%;" v-model="only_today">仅显示当天</el-checkbox>
					</el-col>
					<el-col :span="3">
						<!-- :disabled="is_ok" -->
						<el-button :disabled="!ss.length > 0" @click="search" type="primary">查询结果</el-button>
					</el-col>
					<!-- <el-col :span="2" style="height: 40px;">
						<el-button @click="add_attention" type="success" plain>添加关注</el-button>
					</el-col> -->
<!-- 
					<el-col :span="3">
						<el-button type="primary" :disabled="!multipleSelection.length > 0" @click="open_add_job">批量竞拍
						</el-button>
					</el-col> -->

				</el-row>

				<!-- <el-row :gutter="20" style="top: 20px;">
					<el-col :span="18" style="height: 40px;">

						<el-checkbox-group v-model="sport_category_checkList">
							<el-checkbox style="float: left;" v-for="v, k in sport_category" :label="v" :key="k">{{ k }}
							</el-checkbox>
						</el-checkbox-group>
						<checkBtn :datalist="sport_category" @checked="checked"></checkBtn>

					</el-col>

				</el-row> -->
			</SearchCard>




			<el-row class="mt20">
				<!-- v-if="showType === 'table'" -->
				<table-content :selecteData="multipleSelection" :tableData="table_data_" @changeShow="changeShow"
					@checkAll="checkAll" @handleOpenJob="open_add_job" :showChange="false">
					<template slot="showContent">
						<div class="search-container" ref="searchContainer"></div>
						<el-table ref="table" v-loading="!(count_ === 0 && is_ok === false)" scroll-container
							:element-loading-text="loading_text" element-loading-spinner="el-icon-loading"
							element-loading-background="rgba(0, 0, 0, 0.8)" :default-expand-all="true"
							:data="table_data_" style="width: 100%" :height="tableHeight"
							@selection-change="handleSelectionChange" header-align="center"
							header-row-class-name="table-header-style">

							<el-table-column type="selection" width="55"> </el-table-column>

							<el-table-column type="index" width="70">
							</el-table-column>

							<el-table-column v-for="t in table_name" :prop="t.pop" :label="t.name" :width="t.width">

								<template slot-scope="scope">

									<el-image scroll-container=".el-table__body-wrapper" lazy v-if="t.name == '图片'"
										style="width: 80px; height: 95px;border-radius: 4px;"
										:src="scope.row.TitImg + '?imageView2/2/w/200'"
										:preview-src-list="[scope.row.TitImg]">
									</el-image>

									<template v-else-if="t.name == '卡片名称'">
										<el-link class="f18 w70bfb element fjst" style="line-height: 30px;"
											:underline="false"
											:href="'http://www.cardhobby.com.cn/market/item/' + scope.row.ID"
											target="_blank">
											{{ scope.row[t.pop] }}
										</el-link>
									</template>

									<template v-else-if="t.name == '结束时间'">
										<el-tag class="w100 f16" type="danger">
											{{ scope.row[t.pop] }}
										</el-tag>
									</template>

									<template v-else-if="t.name == '当前出价'">
										<p style="text-align: start;margin-top: 0px;margin-bottom: 0px;color: red;"
											v-html="handlePrice(scope.row[t.pop])"></p>
									</template>


									<template v-else>
										{{ scope.row[t.pop] }}
									</template>
								</template>

							</el-table-column>

							<el-table-column fixed="right" label="操作" width="180" header-align="center">
								<template slot-scope="scope">

									<el-button :disabled="$user.info.grade < 2"
										@click.stop="show_dialog(scope.row.ID, scope.row.Title)" type="text"
										style="font-size: 20px;color: #969ba0;">
										自动查价竞拍
									</el-button>

								</template>
							</el-table-column>
						</el-table>

						<el-row class="mt20" type="flex" justify="center">
							<!-- <span class="demonstration">共筛选出{{ table_data_.length }}条符合条件的数据</span> -->
							<!-- <el-pagination background layout="prev, pager, next" :page-size="60" :total="total_page"
								@current-change="current_change" :current-page="search_data.page">
							</el-pagination> -->

							<el-pagination background @size-change="current_change" @current-change="current_change"
								:current-page="search_data.page"  :page-size="60"
								layout="total, prev, pager, next, jumper" :total="total_page">
							</el-pagination>
						</el-row>

					</template>
				</table-content>
			</el-row>

			<!-- <el-row style="top: 20px;" type="flex" justify="end">
				<span class="demonstration">共筛选出{{ table_data_.length }}条符合条件的数据</span>
				<el-pagination background layout="prev, pager, next" :page-size="60" :total="total_page"
					@current-change="current_change" :current-page="search_data.page">
				</el-pagination>
			</el-row> -->
		</el-col>



		<el-dialog title="自动查价竞拍" :visible.sync="dialogTableVisible" top="calc(100vh - 96vh)" width="90%">
			<HistoryPrice v-if="dialogTableVisible" :item_id="item_id" :title="title"></HistoryPrice>
		</el-dialog>
		<el-dialog title="批量竞拍" :visible.sync="dialogBatchAuctionVisible">
			<AddJob @closed_add_job="closed_add_job" v-if="dialogBatchAuctionVisible" :id_list="id_list"></AddJob>
		</el-dialog>

		<el-dialog width="26%" :visible.sync="focusVisible" :before-close="handleClose" :destroy-on-close="true">
			<p class="mb20">
				<i class="el-icon-caret-right f24 mr5"></i>
				<span class="f24" style="font-weight: 500;color: #333;">批量竞拍</span>
			</p>

			<p>选择分类：</p>
			<!-- <checkBtn class="mt20" style="flex-wrap: wrap;" :datalist="sport_category" @checked="checked"></checkBtn> -->
			<radioBtn class="mt20" style="flex-wrap: wrap;" :datalist="sport_category" @radioed="radioed"></radioBtn>

			<el-row class="mt20" type="flex" justify="center">
				<el-col :span="24" class="flex ali">

					<span style="width: 90px;display: inline-block;text-align: right;">二级标题：</span>
					<el-select class="w70bfb" :disabled="!sport_category_checkList.length" v-model="treeSelect"
						clearable filterable allow-create default-first-option placeholder="请选择二级标题">

						<template slot="prefix">
							<el-tooltip class="item" effect="dark" content="如果当前选择中没有二级标题的话，可以手动输入" placement="top">
								<i class="el-icon-warning-outline cp" style="line-height: 40px"></i>
							</el-tooltip>
						</template>
						<el-option v-for="item in twoOpations" :key="item.Title" :label="item.Title"
							:value="item.Title">
						</el-option>
					</el-select>
				</el-col>
			</el-row>

			<el-row class="mt20" type="flex" justify="center">
				<el-col :span="24" class="flex ali">
					<span style="width: 90px;display: inline-block; text-align: right;">关键词内容：</span>
					<el-input class="w70bfb" placeholder="请输入您要搜索的关键字" v-model="search_keys" clearable>
					</el-input>
				</el-col>
			</el-row>

			<div class="tc mt20">
				<el-button class="mr50" type="primary" @click="add_attention">确认</el-button>
				<el-button type="primary" @click="focusVisible = false">取消</el-button>
			</div>


		</el-dialog>

	</div>
</template>

<script>
	import SearchCard from '@/components/searchCrad.vue'
	import checkBtn from '@/components/checkBtn.vue'
	import radioBtn from '@/components/radioBtn.vue'
	import TableContent from '@/components/tablecontent.vue'

	import * as Api from '../../api/index.js'
	import sport_category_ from '../../common/SportCategory.js'
	import {
		getDynamicHeight,
		debounce
	} from "../../common/utils.js";
	import HistoryPrice from '../../components/historical_price.vue'
	import AddJob from '../../components/add_job.vue'

	// import the component
	import Treeselect from '@riophae/vue-treeselect'
	// import the styles
	import '@riophae/vue-treeselect/dist/vue-treeselect.css'
	export default {
		name: 'my_attention',
		components: {
			HistoryPrice,
			AddJob,
			SearchCard,
			checkBtn,
			TableContent,
			radioBtn,
			Treeselect
		},
		data() {
			return {
				loading_text: '',
				count_: 0,
				is_ok: false,
				//弹窗
				dialogTableVisible: false,
				item_id: 0,
				title: '',
				attention_data_k: [],
				//树形
				attention_data_: [],
				defaultProps: {
					children: 'children',
					label: 'Title',
					isLeaf: (data) => !data.children,
					disabled: (data) => data.disabled,
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
					width: 130
				}, {
					pop: "EffectiveTime",
					name: "结束时间",
					width: 150
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
				today: '',
				timer_: '',
				//批量提交
				dialogBatchAuctionVisible: false,
				multipleSelection: [],
				id_list: [],
				showType: '',
				focusVisible: false,
				ss: [],
				attentionChecked: [],
				cache_selected_data: [], // 缓存选择的树节点
				treeSelect: '',
				attentionData: {},
				twoOpations: []
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
			handlePrice(price) {
				//ps:v-html绑定数据
				//1.分割价钱 => ["12", "00"]
				let splitPrice = String(price).split(".");
				let p_decimal = splitPrice[1] == undefined ? "00" : splitPrice[1]
				//2.重新赋值
				return `<span class="price">¥</span><span class="price"  style="font-size:22px;">${splitPrice[0]}.</span><span class="price">${p_decimal}</span> `;

			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				// console.log(this.multipleSelection);
			},
			open_add_job() {

				this.id_list = this.multipleSelection.map((item) => {
					return item.ID
				})
				this.dialogBatchAuctionVisible = true
			},

			closed_add_job() {
				this.dialogBatchAuctionVisible = false
			},
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

				// this.ss = this.$refs.tree.getCheckedNodes();
			},
			// get_all_attention() {
			// 	Api.all_attention().then((data) => {
			// 		console.log(data);
			// 		const attentionData = {}; // 存储关注数据的对象
			// 		const attentionChecked = []; // 存储选中项的数组

			// 		data.data.forEach((item) => {
			// 			if (item.checked === '1') {
			// 				attentionChecked.push(item.id); // 将选中项的id添加到数组中
			// 			}

			// 			if (!(item.Sports in attentionData)) {
			// 				attentionData[item.Sports] = {
			// 					id: Object.keys(attentionData).length, // 使用已存储数据的数量作为id标识
			// 					Title: item.Sports,
			// 					children: [],
			// 					disabled: true,
			// 				};
			// 			}

			// 			attentionData[item.Sports].children.push(item); // 将数据项添加到对应的children数组中
			// 		});


			// 		this.attention_data_ = Object.values(attentionData); // 将关注数据对象的值转换为数组
			// 		this.attention_data_k = Object.keys(attentionData).map((key) => attentionData[key].id); // 将关注数据对象的键转换为id数组
			// 		console.log(attentionData, this.attention_data_k)
			// 		setTimeout(() => {
			// 			this.setCheckedKeys(attentionChecked); // 延迟设置选中项的状态
			// 		}, 1000);
			// 	});
			// },
			normalizer(node) {
				return {
					id: node.Title,
					label: node.Title,
					children: node.children,
				}
			},
			get_all_attention() {
				Api.all_attention().then((data) => {
					console.log(data);
					const attentionData = {}; // 存储关注数据的对象
					const attentionChecked = []; // 存储选中项的数组

					data.data.forEach((item) => {
						if (item.checked === '1') {
							attentionChecked.push(item.id); // 将选中项的id添加到数组中
						}

						const sports = item.Sports;
						const secondary = item.secondary;

						if (!(sports in attentionData)) {
							attentionData[sports] = {
								// id: Object.keys(attentionData).length, // 使用已存储数据的数量作为id标识
								Title: sports,
								children: [],
								disabled: false,
								checked: item.checked === '1' ? true : false
							};
						}

						const sportsNode = attentionData[sports];
						let secondaryNode = sportsNode.children.find((node) => node.Title === secondary);

						if (!secondaryNode) {
							secondaryNode = {
								Title: secondary,
								children: [],
							};
							sportsNode.children.push(secondaryNode);
						}

						secondaryNode.children.push(item); // 将数据项添加到对应的children数组中
					});

					this.attention_data_ = Object.values(attentionData); // 将关注数据对象的值转换为数组
					console.log(this.attention_data_)
					this.attention_data_k = Object.keys(attentionData).map((key) => attentionData[key].id); // 将关注数据对象的键转换为id数组
					this.attentionChecked = attentionChecked
					this.attentionData = attentionData

					this.$nextTick(() => {
						this.ss = this.getCheckedKeys()
					})
				});
			},


			add_attention() {
				let sport_ = this.sport_category_checkList

				if (sport_.length == 0 || this.search_keys === '' || this.treeSelect == '') {
					this.$message({
						message: '请填写完数据在进行添加',
						type: 'error',
					});
					return;
				}
				if (!this.sport_category_checkList.length > 0) {
					sport_ = [""]
				}
				Api.add_attention({
					title: this.search_keys,
					sport: sport_[0],
					secondary: this.treeSelect
				}).then((data) => {
					this.$message({
						message: '关注添加成功',
						type: 'success'
					});

					this.sport_category_checkList = [];
					this.search_keys = '';
					// console.log(data)
					this.get_all_attention();

					this.handleClose();
				})
			},
			async del_attention() {

				let ss = this.getCheckedKeys()

				console.log(ss, this.attention_data_k)
				ss = ss.filter(i => i !== undefined)

				for (let s of ss) {
					if (s in this.attention_data_k) {
						continue
					}
					await Api.del_attention({
						id: s
					}).then((data) => {
						// console.log(data)

					})
				}
				this.get_all_attention()


			},
			modify_checked(id, s) {
				Api.modify_checked({
					id: id,
					checked: s
				}).then((data) => {
					// console.log(data)
				})
			},
			check_node(data, self) {
				// console.log(data)
				this.ss = this.getCheckedKeys()
			},
			node_change(data, self) {
				// this.ss = this.$refs.tree.getCheckedNodes();
				// console.log(this.ss, data, self, this.$refs.tree.getCheckedKeys());
				// console.log(data,data.id, self);
				// if (self.checkedKeys.indexOf(data.id) > -1) {
				// 	this.modify_checked(data.id, 1)
				// 	return
				// }
				// this.modify_checked(data.id, 0)

				if ('id' in data) {
					if (data.checked === '0') {
						this.modify_checked(data.id, 1)
						data.checked = '1'
					} else {
						this.modify_checked(data.id, 0)
						data.checked = '0'
					}
				}

			},

			current_change(index) {
				this.handleScrollTop()
				this.search_data.page = index
				this.for_search()
			},
			handleScrollTop() {
				this.$nextTick(() => {
					document.getElementsByClassName("el-table__body-wrapper is-scrolling-none")[0].scrollTop = 0

				});
			},
			for_search() {
				this.table_data = []
				this.table_data_ = []
				let ss = this.$refs.tree.getCheckedNodes();
				// this.on_going()
				console.log(ss);
				for (let s of ss) {
					if (s.id ==undefined) {
						continue
					}
					this.count_ += 1
					// console.log(s);
					this.ti = s.Title
					this.sp = s.Sports
					this.card_search()
				}

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


					if (data.code === 1) {
						this.min_price = Number(this.min_price);
						this.max_price = Number(this.max_price);

						const filteredItems = data.data.PagedMarketItemList.filter(item => {
							const withinPriceRange = this.min_price >= this.max_price || (item
								.LowestPrice >= this.min_price && item.LowestPrice <= this.max_price);
							const onlyToday = !this.only_today || item.EffectiveDate.includes(this.today);
							return withinPriceRange && onlyToday;
						});

						this.table_data.push(...filteredItems);

						this.total_page = Math.max(this.total_page, data.data.TotalCount);
					}

					// if (data.code == 1) {
					// 	var s1, s2
					// 	this.min_price = Number(this.min_price)
					// 	this.max_price = Number(this.max_price)
					// 	let aa = data.data.PagedMarketItemList.filter((item) => {
					// 		s1 = !(this.min_price < this.max_price)
					// 		s2 = !this.only_today
					// 		if (this.min_price < this.max_price && this.min_price < item
					// 			.LowestPrice &&
					// 			item.LowestPrice < this
					// 				.max_price) {
					// 			s1 = true
					// 		}

					// 		if (this.only_today && item.EffectiveDate.indexOf(this.today) > -1) {
					// 			s2 = true
					// 		}
					// 		return s1 && s2
					// 	})
					// 	this.table_data.push(...aa)

					// 	if (data.data.TotalCount > this.total_page) {
					// 		this.total_page = data.data.TotalCount
					// 	}
					// }
				}).catch((err) => {
					console.log(err);
				}).finally(() => {
					this.on_going2()
				})

			},
			on_going2() {
				this.count_ = this.count_ - 1
				this.loading_text = `已筛选出${this.table_data.length}条数据，还剩${this.count_}个关注待查询`
				if (this.count_ === 0) {
					console.log(`本次共筛选出${this.table_data.length}条符合条件的数据`);
					this.is_ok = false
					this.table_data_ = this.table_data
				}

			},
			on_going() {
				this.is_ok = true
				if (this.timer_) {
					clearTimeout(this.timer_); // 清除未执行的代码，重置回初始化状态
				}
				this.timer_ = setTimeout(() => {
					this.is_ok = false
					this.table_data_ = this.table_data
				}, 1000)
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
					this.tableHeight = getDynamicHeight(this.$refs.searchContainer).height - 85;
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
			radioed(val) {

				if (val in this.attentionData) {
					this.twoOpations = this.attentionData[val].children;
				} else {
					this.twoOpations = []
				}

				this.sport_category_checkList = [val];
			},
			changeShow(type) {
				console.log(type);
				this.showType = type;
			},
			checkAll(val) {
				if (this.showType === 'table') {
					if (val) {
						this.$refs.table.toggleAllSelection();
					} else {
						this.$refs.table.clearSelection();
					}
				} else {
					if (val) {
						this.$refs.CardContent.toggleAllSelection();
					} else {
						this.$refs.CardContent.clearSelection();
					}
				}
			},
			/* 添加关注 */
			handleAddFocus() {
				this.focusVisible = true;
			},
			handleClose() {
				this.focusVisible = false;
			}


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
