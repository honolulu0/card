<template>
	<div class="raw">
		<SearchCard>
			<el-row type="flex">
				<el-col :span="9" class="mr20">
					<el-input placeholder="请输入您要搜索的关键字" v-model="search_keys" clearable>
					</el-input>
				</el-col>

				<el-col :span="9">
					价格区间：
					<el-popover width="160" trigger="hover" :disabled="!($user.info.grade < 2)">
						<p>此功能仅限VIP使用，请先开通VIP</p>
						<div style="text-align: right; margin: 0">
							<el-button @click="$user.fun" type="danger" size="mini">去开通VIP</el-button>
						</div>

						<el-input slot="reference" class="vip2" :disabled="$user.info.grade < 2" style="width: 35%"
							placeholder="0" v-model.number="min_price" clearable>
						</el-input>
					</el-popover>

					&nbsp;至&nbsp;

					<el-popover width="160" trigger="hover" :disabled="!($user.info.grade < 2)">
						<p>此功能仅限VIP使用，请先开通VIP</p>
						<div style="text-align: right; margin: 0">
							<el-button @click="$user.fun" type="danger" size="mini">去开通VIP</el-button>
						</div>

						<el-input slot="reference" class="vip2" :disabled="$user.info.grade < 2" style="width: 35%"
							placeholder="0" v-model.number="max_price" clearable>
						</el-input>
					</el-popover>
				</el-col>

				<el-col :span="2">
					<el-popover width="160" trigger="hover" :disabled="!($user.info.grade < 2)">
						<p>此功能仅限VIP使用，请先开通VIP</p>
						<div style="text-align: right; margin: 0">
							<el-button type="danger" size="mini" @click="$user.fun">去开通VIP</el-button>
						</div>
						<el-checkbox slot="reference" class="vip2" :disabled="$user.info.grade < 2" style="top: 23%"
							v-model="only_today">仅显示当天
						</el-checkbox>
					</el-popover>
				</el-col>

				<el-button @click="search" icon="el-icon-search" type="primary">查询结果</el-button>
				<el-button type="primary" icon="el-icon-refresh-left" plain @click="card_search">刷新</el-button>
				<!-- <el-col :span="2"> -->
				<!-- <el-tooltip :disabled="multipleSelection.length > 0" class="item" effect="dark" content="请先勾选您要同时竞品的商品"
						placement="top-start">
						<el-button type="primary" :disabled="!multipleSelection.length > 0" @click="open_add_job">批量竞拍
						</el-button>
					</el-tooltip> -->
				<!-- 			<el-popover width="160" trigger="hover" :disabled="multipleSelection.length>0">
					<p>请先勾选您要同时竞品的商品</p>

					<el-button  slot="reference"  type="primary" :disabled="!multipleSelection.length>0" @click="open_add_job">批量竞拍
					</el-button>
				</el-popover> -->
				<!-- </el-col> -->
			</el-row>
			<p style="border-bottom: 1px solid rgba(246, 248, 255, 1);
				box-sizing: border-box;
				width: 90%;
				margin: 0px auto;
				position: absolute;
				bottom: 75px;"></p>
			<el-row :gutter="20" style="top: 20px">
				<el-col :span="24" style="height: 40px">
					<!-- <el-checkbox-group v-model="sport_category_checkList">
						<el-checkbox style="float: left" v-for="(v, k) in sport_category" :label="v" :key="k">{{ k }}
						</el-checkbox>

						<el-checkbox-button style="float: left" v-for="(v, k) in sport_category" :label="v" :key="k">{{ k }}</el-checkbox-button>
					</el-checkbox-group> -->

					<!-- <el-checkbox-button style="float: left" v-for="(v, k) in sport_category" :label="v" :key="k">{{ k }}</el-checkbox-button> -->

					<checkBtn :datalist="sport_category" @checked="checked"></checkBtn>
				</el-col>
			</el-row>
		</SearchCard>

		<el-row class="w" style="top: 20px">
			<table-content v-if="showType === 'table'" :selecteData="multipleSelection" :tableData="table_data"
				@changeShow="changeShow" @checkAll="checkAll" @handleOpenJob="open_add_job">
				<template slot="showContent">
					<div class="search-container" ref="searchContainer"></div>
					<el-table ref="table" scroll-container v-loading="loading" element-loading-text="拼命加载中"
						element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)"
						:default-expand-all="true" :data="table_data" style="width: 100%" :height="tableHeight"
						@selection-change="handleSelectionChange" header-align="center"
						header-row-class-name="table-header-style">


						<el-table-column type="selection" width="55"> </el-table-column>

						<el-table-column v-for="t in table_name" :key="t.name" :prop="t.pop" :label="t.name"
							:width="t.width">
							<template slot-scope="scope">
								<el-image scroll-container=".el-table__body-wrapper" lazy v-if="t.name == '图片'"
									style="width: 80px; height: 95px;border-radius: 4px;"
									:src="scope.row.TitImg + '?imageView2/2/w/200'" :preview-src-list="[scope.row.TitImg]">
								</el-image>

								<template v-else-if="t.name == '卡片名称'">
									<el-link class="f18 w70bfb element fjst" style="line-height: 30px;" :underline="false"
										:href="'http://www.cardhobby.com.cn/market/item/' + scope.row.ID" target="_blank">
										{{ scope.row[t.pop] }}
									</el-link>
								</template>


								<template v-else-if="t.name == '结束时间'">
									<el-tag class="w100 f16" type="danger">
										{{ scope.row[t.pop] }}
									</el-tag>
								</template>

								<template v-else-if="t.name == '当前出价'">
									<p style="text-align: start;margin-top: 0px;margin-bottom: 0px;color: red;" v-html="handlePrice(scope.row[t.pop])"></p>
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
						<el-pagination background @size-change="current_change" @current-change="current_change"
		
							:current-page="search_data.page"  :page-size="60"
							layout="total, prev, pager, next, jumper" :total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</table-content>

			<table-content v-else :selecteData="multipleSelection" :tableData="table_data" @changeShow="changeShow"
				@checkAll="checkAll" @handleOpenJob="open_add_job">
				<template slot="showContent">

					<div class="search-container" ref="searchContainer"></div>
					<CardContent ref="CardContent" :height_="tableHeight" :tableData="table_data" @show_dialog="show_dialog" @checkbox_changes="handleSelectionChange"></CardContent>

					<el-row class="mt20" type="flex" justify="center">
						<el-pagination background @size-change="current_change" @current-change="current_change"
					
							:current-page="search_data.page"  :page-size="60"
							layout="total, prev, pager, next, jumper" :total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</table-content>


		</el-row>

		<!-- <el-row style="top: 20px" type="flex" justify="center"> -->
		<!-- <el-pagination background layout="prev, pager, next" :page-size="60" :total="total_page"
				@current-change="current_change" :current-page="search_data.page">
			</el-pagination> -->
		<!-- </el-row> -->

		<el-dialog  title="自动查价竞拍" :visible.sync="dialogTableVisible" top="calc(100vh - 96vh)" width="90%">
			<HistoryPrice   v-if="dialogTableVisible" :item_id="item_id" :title="title"></HistoryPrice>
		</el-dialog>

		<el-dialog title="批量竞拍" :visible.sync="dialogBatchAuctionVisible">
			<AddJob @closed_add_job="closed_add_job" v-if="dialogBatchAuctionVisible" :id_list="id_list"></AddJob>
		</el-dialog>
	</div>
</template>

<script>
import TableContent from '@/components/tablecontent.vue'
import SearchCard from '@/components/searchCrad.vue'
import checkBtn from '@/components/checkBtn.vue'
import CardContent from '@/components/cardcontent.vue'
import HistoryPrice from "../../components/historical_price.vue";
import * as Api from "../../api/index.js";
import sport_category_ from "../../common/SportCategory.js";
import {
	getDynamicHeight,
	debounce
} from "../../common/utils.js";
import AddJob from "../../components/add_job.vue";
export default {
	name: "on_sale",
	components: {
		HistoryPrice,
		AddJob,
		TableContent,
		SearchCard,
		checkBtn,
		CardContent
	},
	data() {
		return {
			loading: false,
			//弹窗
			dialogTableVisible: false,
			item_id: 0,
			title: "",
			//表格
			tableHeight: 0,
			table_name: [{
				pop: "TitImg",
				name: "图片",
				width: 180,
			},
			{
				pop: "Title",
				name: "卡片名称",
				width: "",
			},
			{
				pop: "LowestPrice",
				name: "当前出价",
				width: 130,
			},
			{
				pop: "EffectiveTime",
				name: "结束时间",
				width: 150,
			},
			],
			table_data: [],
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
				page: 1,
			},
			total_page: 0,
			today: "",
			//批量提交
			dialogBatchAuctionVisible: false,
			multipleSelection: [],
			id_list: [],
			showType: ''
		};
	},

	mounted() {
		// console.log(this.$user);

		// 初始化给table高度赋值
		this.getHeight();
		// 屏幕resize监听方法
		this.screenMonitor();
		this.card_search();
		this.get_today();
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
			if (this.$user.info.grade != 3) {
				this.$alert("此功能仅向钻石用户开放,请先购买钻石VIP!", {
					confirmButtonText: "去开通VIP",
				}).then(() => {
					// location.reload() // 跳转登录页
					this.$user.fun()
				});
				return;
			}

			this.id_list = this.multipleSelection.map((item) => {
				return item.ID;
			});
			this.dialogBatchAuctionVisible = true;
		},

		closed_add_job() {
			this.dialogBatchAuctionVisible = false;
		},

		show_dialog(item_id, title) {
			console.log(item_id, title);
			this.item_id = item_id;
			this.title = title;
			this.dialogTableVisible = true;
		},

		get_today() {
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var day = date.getDate();
			month = month > 9 ? month : "0" + month;
			day = day < 10 ? "0" + day : day;
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
				this.tableHeight = getDynamicHeight(this.$refs.searchContainer).height - 160;
			}, 400);
		},
		tableRowClassName({
			row,
			rowIndex
		}) {
			if (rowIndex % 2 === 0) {
				return "success-row";
			}
			return "warning-row";
		},

		current_change(index) {
			this.handleScrollTop()
			this.search_data.page = index;
			this.card_search();
		},
		handleScrollTop() {
			this.$nextTick(() => {
				document.getElementsByClassName("el-table__body-wrapper is-scrolling-none")[0].scrollTop = 0

			});
		},
		search() {
			this.search_data.page = 1;
			this.card_search();
		},
		card_search() {
			this.loading = true;
			this.search_data.title = this.search_keys;

			this.search_data.sports = this.sport_category_checkList.join(",");

			Api.card_search(this.search_data)
				.then((data) => {
					if (data.code == 1) {
						var s1, s2;
						this.min_price = Number(this.min_price);
						this.max_price = Number(this.max_price);
						this.table_data = data.data.PagedMarketItemList.filter((item) => {
							s1 = !(this.min_price < this.max_price);
							s2 = !this.only_today;
							if (
								this.min_price < this.max_price &&
								this.min_price < item.LowestPrice &&
								item.LowestPrice < this.max_price
							) {
								s1 = true;
							}
							if (
								this.only_today &&
								item.EffectiveDate.indexOf(this.today) > -1
							) {
								s2 = true;
							}

							return s1 && s2;
						});

						this.total_page = data.data.TotalCount;
					}
				})
				.finally(() => {
					this.loading = false;
				});
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
		checked(val) {
			this.sport_category_checkList = val;
		}
	},
};
</script>

//
<!-- Add "scoped" attribute to limit CSS to this component only -->



<style scoped lang="scss">
/deep/.el-table .warning-row {
	background: #f4d59a;
}

/deep/.el-table .success-row {
	background: #b2ea94;
}

/* 	/deep/.vip2 {
		background: #b2ea94;
	} */
</style>
