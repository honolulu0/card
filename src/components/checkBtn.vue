<template>
    <div class="checkbox-buttons">
        <label class="checkbox-button" v-for="(v, k) in datalist" :key="v.value">
            <input type="checkbox" class="checkbox-input" v-model="selectedOptions" :value="v.value">
            <span class="checkbox-label">
                <img class="check-img" :src="v.icon" alt="">
                
                {{ k }}
            </span>
            
        </label>
    </div>
</template>
<script>
export default {
    name: 'checkBtn',
    props: {
        datalist: {
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            selectedOptions: []
        }
    },
    watch: {
    selectedOptions(newValues) {
      // 打印选中的数据
      console.log(newValues);
      this.$emit('checked', newValues)
    }
  }
}
</script>
<style lang="scss" scoped>
.checkbox-buttons {
    display: flex;
}

.checkbox-button {
    width: 100px;
    display: inline-block;
    border-radius: 4px;
    background-color: #97a5ee;
    padding: 0;
    margin-right: 8px;
    position: relative;
    font-size: 16px;
    margin-bottom: 10px;
}

.checkbox-input {
    display: none;
}

.checkbox-label {
    width: 100px;
    display: inline-block;
    padding: 9px 12px;
    border: 1px solid #97a5ee;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    background-color: #97a5ee;
    color: #fff;
    transition: background-color 0.3s, border-color 0.3s, color 0.3s;
    box-sizing: border-box;
    line-height: 1;
    // text-align: end;
}

.checkbox-input:checked+.checkbox-label {
    background-color: #2f4cdd;
    border-color: #2f4cdd;
    color: #fff;
}

.check-img {
    width: 15px;
    height: 15px;
    display: inline;
    float: left;
    margin-left: 5px;
    margin-right: 5px;
    // position: absolute;
    left: 10px;
    top: 11.5px;
}
</style>