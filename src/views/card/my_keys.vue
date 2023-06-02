<template>
	<div class="raw" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<SearchCard :height="'auto'">
			<el-row type="flex" align="middle">

				<el-col :span="8">
					关键词：
					<el-input style="width:80%" placeholder="关键词" v-model="key_" clearable>
					</el-input>
				</el-col>
				<el-col :span="8">
					值：
					<el-input style="width:80%" placeholder="值" v-model="value_" clearable>
					</el-input>

					<!-- 				<el-select v-model="value_" filterable placeholder="请选择">
		<el-option v-for="item in options" :key="item" :label="item" :value="item">
		</el-option>
	</el-select> -->
				</el-col>

				<el-col :span="3">
					<el-button @click="add_key" type="primary">添加</el-button>
				</el-col>
				<el-col :span="2">
					<el-switch active-value='1' inactive-value='0' active-text="年份" v-model="value_switch[0]"
						active-color="#13ce66" @change="change_value(0)">
					</el-switch>
				</el-col>
				<el-col :span="2">
					<el-switch active-value='1' inactive-value='0' active-text="系列" v-model="value_switch[2]"
						active-color="#13ce66" @change="change_value(2)">
					</el-switch>
				</el-col>
			</el-row>
		</SearchCard>

		<el-row style="top: 20px">
			<TableContent :showChange="false" :opation="false">
				<template slot="showContent">
					<div class="search-container" ref="searchContainer"></div>
					<el-table :default-expand-all="true" :data="table_data" style="width: 100%"
						:height="tableHeight" header-row-class-name="table-header-style">
						<el-table-column v-for="t in table_name" :prop="t.pop" :label="t.name" :width="t.width">
						</el-table-column>
						<el-table-column fixed="right" label="操作" width="80">
							<template slot-scope="scope">
								<el-button @click="del_key(scope.row.id)" type="text" size="small">删除</el-button>
								<!-- <el-button type="text" @click="all_keys" size="small">刷新</el-button> -->
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
			</TableContent>
		</el-row>
		<!-- <el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination background layout="prev, pager, next" :total="total_page" @current-change="current_change">
			</el-pagination>
		</el-row> -->
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

export default {
	name: 'task',
	components: {
		TableContent,
		SearchCard
	},
	data() {
		return {
			search_data: {
				page: 0
			},
			value_switch: ['0', '0', '0', '0'],
			loading: false,
			options: [],
			tableHeight: 0,
			table_name: [{
				pop: "name",
				name: "关键词",
				width: ''
			}, {
				pop: "value",
				name: "值",
				width: ''
			}],
			table_data: [],
			//搜索参数
			key_: '',
			value_: '',
			total_page: 0,

		};
	},
	mounted() {
		// 初始化给table高度赋值
		this.getHeight();
		// 屏幕resize监听方法
		this.screenMonitor();
		this.all_keys()
		this.get_status()
	},
	methods: {
		get_status() {
			Api.get_status().then((res) => {
				if (res.code == 1) {
					res.data.forEach((item) => {
						this.$set(this.value_switch, item, '1')
					})
					console.log(this.value_switch);
				}

			}).catch((err) => {
				this.$message({
					message: err,
					type: 'warning'
				});
			})
		},


		change_value(e) {
			Api.set_status({
				id: e,
				status: this.value_switch[e]
			}).then((res) => {
				if (res.code == 1) {
					this.$message({
						message: "设置成功",
						type: 'success'
					});
					return
				}
				this.$message({
					message: "设置失败",
					type: 'warning'
				});

			}).catch((err) => {
				this.$message({
					message: err,
					type: 'warning'
				});
			})
		},
		remoteMethod(query) {
			this.loading = true
			Api.www_keys().then((res) => {
				if (res.code == 1) {

					this.options = res.data
				}
			}).finally(() => {
				this.loading = false
			})
		},
		add_key() {
			let da = {}
			da[this.key_] = this.value_
			Api.add_keys({
				data: da
			}).then((res) => {
				if (res.code == 1) {
					this.$message({
						message: "添加成功",
						type: 'success'
					});
					this.all_keys()
					return
				}
				this.$message({
					message: "添加失败",
					type: 'warning'
				});

			}).catch((err) => {
				this.$message({
					message: err,
					type: 'warning'
				});
			})
		},
		del_key(id) {
			Api.del_key({
				id: id
			}).then((data) => {
				this.all_keys()
			})

		},
		current_change(index) {
			this.search_data.page = index
			this.all_keys()
		},
		search() {
			this.search_data.page = 1
			this.all_keys()
		},
		all_keys() {
			Api.all_keys().then((res) => {
				this.table_data = res.data
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
				this.tableHeight = getDynamicHeight(this.$refs.searchContainer).height - 55;
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
