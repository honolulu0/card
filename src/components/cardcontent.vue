<template>
    <div class="card-container" :style="{ 'height': height_ + 'px' }">
        <my_card :ref="'my_card' + item.ID" class="item-card" v-for="(item, index) in tableData" :key="item.ID" :id="item.ID"
            :index="index" :checked="checklist[index]" :images_url="item.TitImg" :title="item.Title"
            :price="item.LowestPrice" :end_time="item.EffectiveTime" :data="item" :datas="tableData"
            @checkbox_change="checkbox_change" :no_check="no_check" @show_dialog="show_dialog" :no_bidding="no_bidding">
        </my_card>

    </div>
</template>
<script>
import HistoryPrice from "./historical_price.vue";
import my_card from './my_card.vue';
export default {
    name: 'CardContent',
    props: {
        height_: {
            type: Number,
            default: 0
        },
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
        no_check: {
            type: Boolean,
            default: true
        },
        no_bidding: {
            type: Boolean,
            default: true
        }
    },
    components: {
        my_card,
        HistoryPrice
    },
    data() {
        return {
            selectedItems: [],
            checklist: [],
            dialogTableVisible: false,
			item_id_: '',
			title_: ''
        }
    },
    watch: {
        selectedItems: {
            handler(n, o) {
                this.$emit('checkbox_changes', n)
            },
            deep: true
        }
    },
    created() {
        this.checklist = new Array(this.tableData.length).fill(false)
    },
    methods: {
        checkbox_change(event, item, index) {
            if (event) {
                // 检查是否已存在相同的项
                const exists = this.selectedItems.some((selectedItem) => selectedItem.ID === item.ID);
                if (!exists) {
                    // 不存在相同的项时，将项添加到已选中的数据中
                    this.selectedItems.push(item);
                }
            } else {
                // 取消选中时将项从已选中的数据中移除
                const index = this.selectedItems.findIndex((selectedItem) => selectedItem.ID === item.ID);
                if (index !== -1) {
                    this.selectedItems.splice(index, 1);
                }
            }
            this.checklist[index] = event;
            console.log(this.selectedItems);
        },
        toggleAllSelection() {
            const than = this;
            this.checklist = new Array(this.tableData.length).fill(true)

            this.tableData.forEach((item, index) => {
                than.$refs['my_card' + item.ID][0].checkbox_change(true, item, index)
            })
            this.$forceUpdate();
        },
        clearSelection() {
            const than = this;
            this.checklist = new Array(this.tableData.length).fill(false)
            this.tableData.forEach((item, index) => {
                than.$refs['my_card' + item.ID][0].checkbox_change(false, item, index)
            })
            this.$forceUpdate();
        },
        show_dialog(item_id, title) {
            this.$emit('show_dialog', item_id, title)
        }
    }
}
</script>
<style lang="scss" scoped>
.card-container {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    // justify-content: space-between;
}

.item-card+.item-card {
    margin-right: 20px;
    margin-bottom: 30px;
}

.item-card:first-child {
    margin-right: 20px;
}
</style>