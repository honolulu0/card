<template>
	<div class="sidebar-content">
		<div class="sidebar-header">

		</div>

		<div id='menu'>

			<el-menu :default-active='$route.path' class="el-menu-vertical" @select="handleSelect" @open="handleOpen"
				@close="handleClose" :collapse="isCollapse" text-color="#969ba0" active-text-color="#2f4cdd" background-color="#ffffff" router
				:default-openeds="opends">

				<el-submenu :index='String(index)' v-for="(route, index) of menuList" :key="index">
					<template slot="title">
						<i :class='route.meta.icon' class="title-icon iconfont"></i>
						<span slot="title">{{ route.meta.title }}</span>
					</template>
					<el-menu-item :index="route.path + children.path" v-for="(children, childrenindex) of route.children"
						:key="childrenindex">

						{{ children.meta.title }}


					</el-menu-item>

				</el-submenu>
			</el-menu>


			<!-- 		<div id='menuFoot'>
	<div @click="toggleMenu" class='ant-layout-sider-trigger' :class='icon'> </div>
</div> -->
		</div>
	</div>
</template>

<script>
import routes from '../router/routes/menu/index.js'
export default {
	name: 'MenuTree',
	data() {
		return {
			isCollapse: false,
			icon: 'el-icon-d-arrow-left',
			menuList: routes,
			opends: ["0","1"]
		}
	},

	methods: {
		toggleMenu() {
			this.isCollapse ? (this.isCollapse = false, this.icon = 'el-icon-d-arrow-left') : (this.isCollapse = true,
				this.icon =
				'el-icon-d-arrow-right')
		},
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		},
		handleSelect(key, keyPath) {
			// console.log(key, keyPath);
			// // console.log(this.$user.info.grade == 1 ,["/card/task", "/card/my_attention"].indexOf(key)>-1 );
			// if (this.$user.info.grade == 1 && ["/card/task", "/card/my_attention"].indexOf(key)>-1) {
			// 	this.$message({
			// 	          dangerouslyUseHTMLString: true,
			// 	          message: '<strong>请先开通VIP</strong>'
			// 	        });
			// }



		}
	},
	mounted() {
		let user = JSON.parse(localStorage.getItem("user"))
		// console.log(routes);
			if (user.role !== 999) {
				this.menuList.splice(1, 1)
			}
	}
}
</script>
<style lang="scss" scoped>
$-default-color: #2f4cdd;
#menuFoot {
	position: fixed;
	bottom: 0;
}

.ant-layout-sider-trigger {
	border: 1px solid #485353;
	text-align: center;
	bottom: 0;
	height: 18px;
	width: 18px;
	line-height: 18px;
	margin-bottom: 10px;
	margin-left: 10px;
}

.el-menu-vertical:not(.el-menu--collapse) {
	min-height: 80%;
}

.el-menu {
	border-right: none;
}

.el-submenu .el-menu-item {
	/* min-width: 130px !important; */
}
.sidebar-content {
	height: 100%;
	background-color: rgba(255, 255, 255, 1);
}
.sidebar-header {
	width: 255px;
	height: 120px;
	background-image: url('../assets/image/sidebar/sidebar-title.png');
	background-repeat: no-repeat;
	background-position: center right;
	background-size: 100%;
	border: 1px dashed #dadbdf;
	box-sizing: border-box;
}

#menu {
	height: calc(100% - 120px);
	// background-color: rgba(255, 255, 255, 1);
	width: 255px;
	background-image: url('../assets/image/sidebar/sidebar-bg.png');
	background-position: bottom center;
	background-repeat: no-repeat;
	background-size: 100%;
}
/deep/ .el-menu {
	background-color: transparent !important;
}

/deep/ .el-submenu__title {
	font-size: 18px;
	text-indent: .7em;
	font-weight: 500;
	>i {
		margin-right: 16px;
	}
}

/deep/ .el-submenu.is-active {
    .el-submenu__title {
        color: $-default-color !important;
		// border-left-color: $-default-color;
		background-color: #fafbff !important;
		position: relative;
		&::before {
			content: '';
			display: block;
			width: 8px;
			height: 100%;
			background-color: $-default-color !important;
			border-top-right-radius: 6px; /* 只设置右上角的圆角半径 */
			border-bottom-right-radius: 6px; /* 只设置右下角的圆角半径 */
			position: absolute;
			left: 0px;
		}
        .icon-bg {
            i {
                color: $-default-color !important;
            }
        }
        i {
            color: $-default-color !important;
        }
    }
}

/deep/ .el-menu-item {
    transition: .3s;
	text-align: center;
	font-size: 18px;
	font-weight: 400;

}
/deep/ .el-menu-item:hover {
	color: rgba($color: $-default-color, $alpha: 1) !important;
	background-color: rgba($color: $-default-color, $alpha: .2) !important;
}
/deep/ .el-menu-item.is-active {
    background-color: #fafbff !important;
}
</style>
