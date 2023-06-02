<template>
    <div class="radio-group">
        <label v-for="(v, k) in datalist" :key="v.value" class="radio-button">
            <input type="radio" :value="v.value" v-model="radio1">
            <span class="radio-button-label">
                <img class="check-img" :src="v.icon" alt="">

                {{ k }}
            </span>
        </label>
    </div>
</template>
  

  
<script>
export default {
    name: 'radioBtn',
    props: {
        datalist: {
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            radio1: '',
            options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
            ],
        };
    },
    watch: {
        radio1(newValues) {
            // 打印选中的数据
            console.log(newValues);
            this.$emit('radioed', newValues)
        }
    },
    methods: {
        // selectedValue(v) {
        //     console.log(v);
        // }
    }
};
</script>
<style lang="scss" scoped>
.radio-group {
    display: flex;
}

.radio-button {
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

.radio-button input {
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
}

.radio-button-label {
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
}

.radio-button input:checked+.radio-button-label {
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