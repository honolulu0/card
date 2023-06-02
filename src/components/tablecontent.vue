<template>
    <div class="table-content">
        <header class="pt30 mb10">
            <el-row type="flex" justify="space-between	">
                <el-col :span="23" v-if="opation">
                    <el-row type="flex" justify="start">
                        <el-col class="tl">
                            <el-checkbox class="mr10" v-model="checkAll" :indeterminate="isIndeterminate"
                                @change="handleCheckAllChange"></el-checkbox>

                            <span class="f14 select">已选中 <span class="w20 tc" style="display: inline-block;">{{ selecteNums }}</span> 项</span>

                            <el-button class="ml20" size="small" type="primary" @click="handleCheckAllChange(true)">全选</el-button>
                            <el-button size="small" type="primary" :disabled="!selecteNums > 0" @click="handleOpenJob">批量竞拍</el-button>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="1" class="tr" v-if="showChange">
                    <img v-if="isshow" class="cp" src="../assets/image/chushou/change.png" alt="" @click="handleChange">
                    <img v-else class="cp" src="../assets/image/chushou/change2.png" alt="" @click="handleChange">
                </el-col>
            </el-row>
        </header>



        <div class="show-content">
            <slot name="showContent"></slot>
        </div>

    </div>
</template>
<script>
export default {
    name: 'TableContent',
    props: {
        selecteData: {
            type: Array,
            default: () => {
                return []
            }
        },
        tableData: {
            type: Array,
            default: () => {
                return []
            }
        },
        showChange: {
            type: Boolean,
            default: true
        },
        opation: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            checkAll: false,
            isIndeterminate: false,
            isshow: true,
            showObj: {
                1: 'table',
                0: 'card'
            },
            default: 'table',
            capyData: {}
        }
    },
    computed: {
        selecteNums() {
            return this.selecteData.length
        }
    },
    watch: {
        selecteData: {
            handler(n, o) {
                this.handleCheckedCitiesChange(n);
            },
            deep: true
        }
    },
    created() {
        this.capyData = JSON.parse(JSON.stringify(this.tableData))


        this.default = this.showObj[Number(this.isshow)]
        this.$emit('changeShow', this.default)
    },
    methods: {
        handleCheckAllChange(val) {
            this.checkedCities = val ? this.capyData : [];
            this.isIndeterminate = false;

            this.$emit('checkAll', val);
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.tableData.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData.length;
        },
        handleChange() {
            this.isshow = !this.isshow;

            this.default = this.showObj[Number(this.isshow)]
            this.$emit('changeShow', this.default)
        },
        handleOpenJob() {
            this.$emit('handleOpenJob')
        }
    }
}
</script>
<style lang="scss" scoped>
.table-content {
    width: 100%;
    height: 100%;
    background: #ffffff;
    border-radius: 20px 20px 0 0;
    padding: 0 30px;
    box-sizing: border-box;
}

.select {
    color: rgba(187, 189, 191, 1);
}

.show-content {
    width: 100%;
    height: auto;
}



/deep/ .show-content {
    /*  审查DOM也可以找到这个结构，同上  */
    .el-table__header-wrapper {
        .el-checkbox__inner {
            display: none !important;
        }
    }
}
</style>