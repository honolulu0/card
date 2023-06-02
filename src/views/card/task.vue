<template>
	<div class="raw">
		<SearchCard :height="'auto'">
			<el-row type="flex" align="middle">

				<el-col :span="9">
					卡淘账号：
					<el-input style="width:80%" placeholder="卡淘账号" v-model="user" clearable>
					</el-input>
				</el-col>
				<el-col :span="8">
					密码：
					<el-input style="width:80%" placeholder="密码" v-model="password" show-password clearable>
					</el-input>
				</el-col>
				<el-col :span="2">
					{{ islogin }}
				</el-col>
				<!-- <el-col :span="3"> -->
					<el-button :disabled="islogin == '登录成功'" @click="job_login" type="primary">登录</el-button>
					<el-button @click="job_login_out" type="warning">退出</el-button>
				<!-- </el-col> -->
				<!-- <el-col :span="3"> -->
					<el-button @click="get_jobs" type="primary">刷新</el-button>
				<!-- </el-col> -->

			</el-row>

		</SearchCard>





		<el-row style="top: 20px">

			<TableContent :tableData="table_data" @changeShow="changeShow" @handleOpenJob="open_add_job"
				:showChange="false" :opation="false">
				<template slot="showContent">
					<div class="search-container" ref="searchContainer"></div>
					<el-table ref="table" :default-expand-all="true" :data="table_data" style="width: 100%"
						:height="tableHeight" header-align="center" header-row-class-name="table-header-style">

						<el-table-column sortable v-for="t in table_name" :prop="t.pop" :label="t.name" :width="t.width">

							<template slot-scope="scope">


								<el-image scroll-container=".el-table__body-wrapper" lazy v-if="t.name == '图片'"
									style="width: 100px; height: 133px" :src="scope.row.img_url"
									:preview-src-list="[scope.row.img_url.split('?')[0]]">
								</el-image>

								<a v-else-if="t.name == '卡片名称'" target="_blank"
									:href="'http://www.cardhobby.com.cn/market/item/' + scope.row.itemid">{{
										scope.row[t.pop] }}</a>


								<template v-else-if="t.name == '价格'">
									<p style="text-align: start;margin-top: 0px;margin-bottom: 0px;color: red;"
										v-html="handlePrice(scope.row[t.pop])"></p>
								</template>

								<template v-else>
									{{ scope.row[t.pop] }}
								</template>
							</template>

						</el-table-column>

						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">
								<el-button @click="del_job(scope.row.itemid)" type="text"
									style="font-size: 20px">删除</el-button>
								<el-button @click="open_add_job(scope.row.itemid)" type="text" style="font-size: 20px">修改
								</el-button>
								<!-- <el-button type="text" @click="get_jobs" size="small">刷新</el-button> -->
							</template>
						</el-table-column>
					</el-table>


					<el-row class="mt20" type="flex" justify="center">
						<!-- <el-pagination background layout="prev, pager, next" :total="total_page"
							@current-change="current_change">
						</el-pagination> -->

						<el-pagination background @size-change="current_change" @current-change="current_change"
							:current-page="search_data.page" :page-sizes="[20, 60, 100, 200]" :page-size="100"
							layout="total, sizes, prev, pager, next, jumper" :total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</TableContent>

		</el-row>

		<!-- <el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination background layout="prev, pager, next" :total="total_page" @current-change="current_change">
			</el-pagination>
		</el-row> -->

		<el-dialog title="修改竞拍" :visible.sync="dialogTableVisible">
			<AddJob @closed_add_job="closed_add_job" v-if="dialogTableVisible" :id_list="[item_id]"></AddJob>
		</el-dialog>

	</div>
</template>

<script>
import TableContent from '@/components/tablecontent.vue'
import SearchCard from '@/components/searchCrad.vue'
import * as Api from '../../api/index.js'
import sport_category from '../../common/SportCategory.js'
import {
	getDynamicHeight,
	debounce
} from "../../common/utils.js";
import AddJob from '../../components/add_job.vue'
export default {
	name: 'task',
	components: {
		AddJob,
		TableContent,
		SearchCard
	},
	data() {
		return {
			search_data: {
				page: 0
			},
			dialogTableVisible: false,
			tableHeight: 0,
			table_name: [{
				pop: "img_url",
				name: "图片",
				width: 120
			}, {
				pop: "item_name",
				name: "卡片名称",
				width: ''
			}, {
				pop: "price",
				name: "价格",
				width: 130
			}, {
				pop: "run_date",
				name: "出价时间",
				width: 240
			}],
			table_data: [],
			//搜索参数
			password: '',
			user: '',
			total_page: 0,
			islogin: '',
			showType: '',
		};
	},
	mounted() {
		// 初始化给table高度赋值
		this.getHeight();
		// 屏幕resize监听方法
		this.screenMonitor();
		this.get_jobs()
	},
	activated() {
		this.$nextTick(() => { //在数据加载完，重新渲染表格
			this.$refs['table'].doLayout();
		})
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
		open_add_job(item_id) {
			this.item_id = item_id
			this.dialogTableVisible = true

		},
		closed_add_job() {
			this.dialogTableVisible = false
			this.get_jobs()
		},


		job_login_out() {
			Api.job_login_out().then((data) => {
				if (data.code == 1) {
					this.get_jobs()
				} else {
					this.$message({
						message: data.message,
						type: 'warning'
					});
				}

			})
		},

		job_login() {
			Api.job_login({
				p: this.password,
				u: this.user
			}).then((data) => {
				if (data.data.code == 20001) {
					this.$message({
						message: "登录成功",
						type: 'success'
					});
					this.get_jobs()
				} else {
					this.$message({
						message: data.data.message,
						type: 'warning'
					});
				}

			})
		},
		del_job(itemid) {
			Api.del_job({
				itemid: itemid
			}).then((data) => {
				this.get_jobs()
			})

		},


		current_change(index) {
			this.search_data.page = index
			this.get_jobs()
		},
		search() {
			this.search_data.page = 1
			this.get_jobs()
		},
		get_jobs() {
			this.islogin = "请登录"
			this.table_data = []
			Api.get_jobs().then((data) => {
				if (data.code == 1) {
					this.table_data = data.data.data
					this.islogin = "登录成功"
				} else {
					this.$message({
						message: data.message,
						type: 'warning'
					});
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
</style>
