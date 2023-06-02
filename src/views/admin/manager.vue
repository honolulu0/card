<template>
	<div class="raw">
		<SearchCard :height="'auto'">
			<el-row type="flex">
				<el-col :span="8">
					手机号：
					<el-input style="width:80%" placeholder="手机号" v-model="phone" clearable>
					</el-input>
				</el-col>
				<el-col :span="10">
					用户昵称：
					<el-input style="width:80%" placeholder="用户昵称" v-model="nickname" clearable>
					</el-input>
				</el-col>
				<el-col :span="3">
					<el-button @click="search_user" type="primary">搜索</el-button>
				</el-col>
			</el-row>
		</SearchCard>

		<el-row style="top: 20px">

			<TableContent :showChange="false" :opation="false">
				<template slot="showContent">
					<div class="search-container" ref="searchContainer"></div>
					<el-table ref="table" :default-expand-all="true" :data="table_data" style="width: 100%"
						:height="tableHeight" header-row-class-name="table-header-style">

						<el-table-column v-for="t in table_name" :prop="t.pop" :key="t.pop" :label="t.name"
							:width="t.width">
							<template slot-scope="scope">
								<template v-if="t.pop == 'grade'">
									{{ grade[scope.row[t.pop] - 1] }}
								</template>
								<template v-else>
									{{ scope.row[t.pop] }}
								</template>
							</template>
						</el-table-column>

						<el-table-column fixed="right" label="操作" width="120">
							<template slot-scope="scope">

								<el-popconfirm title="确定删除吗？" @confirm="modify_status(scope.row.id)">
									<el-button slot="reference" type="text"  style="font-size: 20px">删除
									</el-button>

								</el-popconfirm>
								<el-button @click="open_modify(scope.row)" type="text" style="font-size: 20px">修改
								</el-button>
								<!-- <el-button type="text" @click="get_jobs" size="small">刷新</el-button> -->
							</template>
						</el-table-column>
					</el-table>

					<el-row class="mt20" type="flex" justify="center">
						<el-pagination background @size-change="current_change" @current-change="current_change"
							:current-page="page"  :page-size="60"
							layout="total, prev, pager, next, jumper" :total="total_page">
						</el-pagination>
					</el-row>
				</template>
			</TableContent>
		</el-row>

		<!-- <el-row style="top: 20px;" type="flex" justify="end">
			<el-pagination :page-size="60" background layout="prev, pager, next" :total="total_size"
				@current-change="current_change">
			</el-pagination>
		</el-row> -->

		<el-dialog width="500px" title="修改" :visible.sync="dialogTableVisible">
			<el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<el-form-item label="昵称" prop="nickname">
					<el-input v-model="ruleForm.nickname"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="ruleForm.password"></el-input>
				</el-form-item>
				<el-form-item label="手机号" prop="phone">
					<el-input v-model="ruleForm.phone">
					</el-input>
				</el-form-item>

				<el-form-item label="会员等级" prop="grade">


					<el-select v-model="ruleForm.grade" placeholder="请选择">
						<el-option v-for="item, index in grade" :key="index" :label="item" :value="index + 1">
						</el-option>
					</el-select>

				</el-form-item>
				<el-form-item label="会员到期时间" prop="expiration">

					<div class="block">
						<el-date-picker value-format="yyyy-MM-dd HH:mm:ss" size="medium" v-model="ruleForm.expiration"
							type="datetime" placeholder="选择日期时间">
						</el-date-picker>
					</div>

				</el-form-item>

				<el-form-item>
					<el-button type="primary" @click="do_modify" style="width: 48%;">提交</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>

	</div>
</template>

<script>
import TableContent from '@/components/tablecontent.vue'
import SearchCard from '@/components/searchCrad.vue'
import * as Api from '../../api/index.js'
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
			ruleForm: {},
			total_size: 0,
			dialogTableVisible: false,
			options: [{}, {}, {}],
			grade: ["普通会员", "黄金会员", "钻石会员"],
			tableHeight: 0,
			table_name: [{
				pop: "id",
				name: "ID",
				width: 80
			}, {
				pop: "nickname",
				name: "昵称",
				width: ''
			}, {
				pop: "phone",
				name: "手机号",
				width: 200
			}, {
				pop: "password",
				name: "密码",
				width: 200
			}, {
				pop: "last_login_time",
				name: "上次登录时间",
				width: 220
			}, {
				pop: "grade",
				name: "VIP等级",
				width: 120
			}, {
				pop: "expiration",
				name: "到期时间",
				width: 220
			}, {
				pop: "create_time",
				name: "创建时间",
				width: 220
			}],
			table_data: [],
			//搜索参数
			phone: '',
			nickname: '',
			page: 1
		};
	},
	mounted() {
		// 初始化给table高度赋值
		this.getHeight();
		// 屏幕resize监听方法
		this.screenMonitor();
		this.search_user()
	},

	methods: {
		current_change(index) {
			this.page = index
			this.search_user()
		},
		search_user() {
			let d = {}
			if (this.nickname) {
				d = {
					nickname: this.nickname
				}
			} else if (this.phone) {
				d = {
					phone: this.phone
				}
			}
			d.page = this.page
			Api.search(d).then((data) => {
				if (data.code == 1) {
					this.table_data = data.data
					this.total_size = data.all_size
				} else {
					this.$message({
						message: data.message,
						type: 'warning'
					});
				}

			})
		},


		open_modify(data) {
			this.dialogTableVisible = true
			this.ruleForm = data
		},
		do_modify() {
			this.modify_user(this.ruleForm)
			this.dialogTableVisible = false
		},
		modify_status(id) {
			this.modify_user({
				id: id,
				status: 0
			})
		},
		modify_user(md) {
			Api.modify_user(md).then((data) => {
				if (data.code == 1) {
					this.$message({
						message: "修改成功",
						type: 'success'
					});
					this.search_user()
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


<style scoped>
/deep/.el-table .warning-row {
	background: #f4d59a;
}

/deep/.el-table .success-row {
	background: #b2ea94;
}
</style>
