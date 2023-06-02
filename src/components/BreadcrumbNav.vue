<template>
    <div class="tags-box">
        <el-tag class="tags cp" v-for="item in pathList" :key="item.path" :class="{ 'active': item.path === $route.path }"
            @click="tabsHandle($event, item.path)">{{ item.name }}</el-tag>
        <!-- <div class="tags" 
        v-for="item in pathList" :key="item.path" 
        :class="{'active':item.path===$route.path}" 
        @click="tabsHandle($event,item.path)"
      >
          <div>{{item.name}}</div>
          <i class="el-icon-close"></i>
          
      </div> -->



        <div class="user-info-contnet">

            <div class="user-info">
                <p class="user-name">
                    {{ user.nickname }}
                </p>
                <p class="user-role">
                    <img class="w20 h20" :src="grade_icon[user.grade - 1]" alt="">
                    {{ grade[user.grade - 1] }}
                </p>
            </div>

            <el-dropdown @command="handleCommand">
                <div class="user-img cp">
                    <div class="user-img-content">
                        <img src="../assets/image/user-role/user.jpg" alt="">
                    </div>
                </div>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="out" @click.native="endOut">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
 
<script>
import * as Api from '@/api/index.js'
export default {
    data() {
        return {
            pathList: [],
            otherFlag: false,
            path: '',
            grade: ["普通会员", "黄金会员", "钻石会员"],
            grade_icon: [require('../assets/image/user-role/huiyuan.png'), require('../assets/image/user-role/huiyuan.png'), require('../assets/image/user-role/huiyuan.png')],
            user: {}
        }
    },
    created() {
        this.checkPathList(this.$route.path, this.$route.meta.title);


        Api.user_info().then((data) => {
            if (data.code == 1) {
                console.log(data)
                this.user = data.data
                this.$user.info = data.data
                localStorage.setItem('user', JSON.stringify(data.data))
            } else {
                this.$message({
                    message: data.message,
                    type: 'warning'
                });
            }

        })
    },
    methods: {
        tabsHandle(e, path) {
            console.log(e.target.nodeName, path);
            if (e.target.nodeName === 'DIV') {
                this.$router.push(path)
            } else if (e.target.nodeName === 'I') {
                let index = this.pathList.findIndex(item => item.path == path)
                if (this.pathList.length <= 1) return
                this.pathList.splice(index, 1)
                if (this.$route.path === path) {
                    if (index === 0) {
                        this.$router.push(this.pathList[this.pathList.length - 1].path)
                    } else {
                        this.$router.push(this.pathList[index - 1].path)
                    }
                }
            } else {
                this.pathList = this.pathList.filter(item => item.path === path)
                this.otherFlag = false
                this.$router.push(path)
            }
        },
        rightClick(e, path) {
            if (e.target.nodeName === 'DIV') {
                this.otherFlag = true
                this.path = path
            }
        },
        checkPathList(path, name) {
            if ((this.pathList.findIndex(item => item.path == path)) === -1) {
                if (this.pathList.length >= 10) {
                    this.pathList.shift();
                }
                this.pathList.push({
                    path,
                    name
                })
            }
        },
        handleCommand(command) {

            if (command == "out") {
                this.endOut()
            }
        },
        endOut() {
            // localStorage.clear()清除上次登录用户名密码，若此时在地址栏输入项目网址相关页面，仍可以进入项目页面中，故加了下一行
            localStorage.clear()
            //加入该行后会清除缓存，当点击退出按钮后，会清除登录信息缓存
            this.$router.push('/login')
        }
    },
    watch: {
        '$route': function (n) {
            this.checkPathList(n.path, n.meta.title)
        },
        'otherFlag': function (n) {
            let clickFn = () => this.otherFlag = false
            if (n) {
                document.documentElement.addEventListener('click', clickFn)
            } else {
                document.documentElement.removeEventListener('click', clickFn)
            }
        }
    }
}
</script>
 
<style scoped lang='scss'>
.tags-box {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    background: #fff;
    padding-left: 50px;
    box-sizing: border-box;
    position: relative;
    // .tags {
    //     border-radius: 3px;
    //     font-size: 12px;
    //     cursor: pointer;
    //     text-align: center;
    //     width: 120px;
    //     font-size: 18px;
    //     font-weight: 700;
    //     height: 56px;
    //     border: 1px solid #e9eaec;
    //     background: #fff;
    //     padding: 0px 10px;
    //     margin-left: 7px;
    //     -webkit-transition: all .3s ease-in;
    //     -moz-transition: all .3s ease-in;
    //     transition: all .3s ease-in;
    //     display: flex;
    //     align-items: center;
    //     position: relative;

    //     i {
    //         margin-left: 5px;
    //         margin-top: 1px;
    //     }

    //     ul {
    //         position: absolute;
    //         background: #fafafa;
    //         width: 90%;
    //         height: 40px;
    //         left: 0;
    //         top: 25px;
    //         display: flex;
    //         flex-direction: column;
    //         justify-content: center;
    //         border-radius: 5px;
    //         box-shadow: 0px 0px 5px #ddd;

    //         li {
    //             list-style: none;
    //             color: #666;
    //             text-align: center;
    //             height: 20px;
    //             line-height: 20px;
    //             padding: 5px 0;

    //             &:hover {
    //                 background: #eee;
    //             }
    //         }
    //     }
    // }

    // .tags:not(.active):hover {
    //     background: #f8f8f8;
    // }

    // .active {
    //     color: #fff;
    //     background: #409EFF;
    // }
}

.tags {
    border-radius: 3px;
    width: 120px;
    font-size: 18px;
    font-weight: 700;
    height: 56px;
    padding: 14px 0 14.5px 0;
    -webkit-transition: all .3s ease-in;
    -moz-transition: all .3s ease-in;
    transition: all .3s ease-in;
    border-radius: 8px;
}

.tags+.tags {
    margin-left: 20px;
}


.user-info-contnet {
    width: 197px;
    height: 56px;
    position: absolute;
    right: 52px;
    background: rgba(47, 76, 221, 1);
    border-radius: 8px;
    display: flex;
}

.user-info {
    // width: 70%;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-left: 22px;
    padding-top: 5px;
    box-sizing: border-box;

    >p:nth-of-type(1) {
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0px;
        line-height: 25px;
        text-align: left;
        color: rgba(255, 255, 255, 1);
    }

    >p:nth-of-type(2) {
        font-size: 14px;
        font-weight: 400;
        letter-spacing: 0px;
        line-height: 23.17px;
        color: rgba(255, 255, 255, .5);
        text-align: left;
        vertical-align: top;
    }
}

.user-role {
    img {
        vertical-align: inherit;
    }
}

.user-img {
    margin-right: calc(-56px / 2.5);
}

.user-img-content {
    width: 56px;
    height: 56px;
    background-image: url('../assets/image/user-role/placeholder.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100%;
    display: flex;
    align-items: center;

    >img {
        width: 52px;
        height: 52px;
        display: block;
        border-radius: 50%;
        margin: 0 auto;
    }
}
</style>