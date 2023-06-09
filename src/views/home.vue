<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <MenuTree></MenuTree>
    </el-aside>

    <el-container>
      <!-- <el-header>
        <Header></Header>
      </el-header> -->

      <el-container>
        <el-header style="height: 120px;">
          <BreadcrumbNav></BreadcrumbNav>
        </el-header>

        <el-main>
          <keep-alive>
            <router-view />
          </keep-alive>
        </el-main>
      </el-container>

    </el-container>

    <el-dialog title="会员充值" :visible.sync="dialogFormVisible">
      <el-radio-group v-model="vip" size="mini">
        <span style="display: inline-block; margin-right: 100px">
          <el-image style="width: 70px; height: 70px" :src="require('@/assets/vip1.png')" fit="full"></el-image>
          <el-radio :disabled="$user.info.grade == 3" style="display: block" label="2">39/月 黄金会员</el-radio>
        </span>

        <span style="display: inline-block">
          <el-image style="width: 70px; height: 70px" :src="require('@/assets/vip2.png')" fit="full"></el-image>

          <el-radio style="display: block" label="3">99/月 钻石会员</el-radio>
        </span>
      </el-radio-group>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="user_pay()">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import Header from "../components/header.vue";
import MenuTree from "../components/MenuTree.vue";
import BreadcrumbNav from "../components/BreadcrumbNav.vue";
import * as Api from "@/api/index.js";
export default {
  name: "index",
  components: {
    Header,
    MenuTree,
    BreadcrumbNav,
  },
  data() {
    return {
      dialogFormVisible: false,
      vip: "3",
    };
  },
  mounted() {
    this.$user.fun = this.open_pay;
  },

  methods: {
    open_pay() {
      this.dialogFormVisible = true;
    },
    user_pay() {
      Api.alipay({ vip: this.vip }).then((data) => {
        if (data.code == 1) {
          location.href = data.data;
        } else {
          this.$message({
            message: data.message,
            type: "warning",
          });
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.el-image-viewer__wrapper {
  z-index: 2099 !important;
}

.el-table td {
  font-size: 20px !important;
}
</style>



<style scoped>
/* 	.el-aside{
		background: #002140;
	} */
/* 	.el-container{
		height:100%
	} */
.el-header {
  padding: 0;
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  height: 100%;
}

.el-main {
  height: 100%;
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}
</style>
