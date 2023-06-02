<template>
    <div class="search-container" :style="{'height': height}">
        <!-- <el-row class="search-content">
            
        </el-row>
        <el-row class="select-content">
            
        </el-row> -->

        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'SearchCard',
    props: {
        height: {
            type: String,
            default: '150px'
        }
    },
    data() {
        return {
            search_keys: "",
        }
    }
}
</script>
<style lang="scss" scoped>
.search-container {
    width: 100%;
    // min-height: 150px;
    // max-height: 150px;
    border-radius: 20px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 12px 23px 0px rgba(62, 73, 84, 0.04);
    padding: 23px 30px 16px 30px;
    box-sizing: border-box;
    position: relative;
}
</style>