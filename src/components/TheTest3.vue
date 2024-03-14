<script setup>
import { ref, computed, reactive } from "vue";

const var1 = ref(2);
const var2 = ref(3);
const var3 = ref(5);


const list = ref([10, 10, 20, 30, 50, 80, 120, 10, 22, 22]);
const sum = computed(() => { return list.value.reduce((accum, val) => accum + Number(val), 0) })


const times = ref(2);
const nlist = ref([1, 1]);
const sum2 = computed(() => { return nlist.value.reduce((accum, val) => accum + Number(val), 0) })
const change_ph = () => {
    nlist.value = Array(Number(times.value)).fill(1);
}

//行列にして、行ごと、列ごとの和を表示する

const row = ref(3);
const column = ref(5);

let arr = [];
for (let i = 0; i < row.value; i++) {
    arr[i] = Array(column.value).fill(0);
}
const tlist_row = ref(Array(row.value).fill(1));
const tlist_column = ref(Array(column.value).fill(1));
const magicTable = ref(arr);

const rowchange = () => {
    
    tlist_row.value = Array(Number(row.value)).fill(1);
    let arr = [];
    for (let i = 0; i < Number(row.value); i++) {
        arr[i] = Array(Number(column.value)).fill(0);
    }
    magicTable.value=arr;

    console.log(tlist_row.value)
    console.log(tlist_column.value)
}

const columnchange = () => {

    tlist_column.value = Array(Number(column.value)).fill(1);
    let arr = [];
    for (let i = 0; i < Number(row.value); i++) {
        arr[i] = Array(Number(column.value)).fill(0);
    }
    magicTable.value=arr;
}


    function my_sum(list) {
        return list.reduce((accum, val) => accum + Number(val), 0)
    }

    function transpose(matrix, n, m) {

        let newMatrix = [];
        for (let j = 0; j < m; j++) {
            newMatrix[j] = [];
            for (let i = 0; i < n; i++) {
                newMatrix[j][i] = matrix[i][j];
            }
        }
        return newMatrix;
    }


</script>

<template>
    <hr>
    <h3>３つの数字合計する</h3>
    <input type="text" v-model="var1">
    <input type="text" v-model="var2">
    <input type="text" v-model="var3">
    <p>合計は{{ Number(var1) + Number(var2) + Number(var3) }}</p>


    <h3>v-forで一般化し、任意の数の数字を合計する</h3>
    <input type="text" v-model="list[index]" v-for="(i, index) in list">
    <p>合計は{{ sum }}</p>


    <h3>足す個数を指定する</h3>
    <p><input v-model="times" @change="change_ph">個の足し算</p>
    <input v-model="nlist[index]" v-for="(i, index) in nlist">
    <p>合計は{{ sum2 }}</p>


    <h3>行列にして、行ごと、列ごとの和を表示する</h3>
    <input v-model="row" @change="rowchange">行<input v-model="column" @change="columnchange">列
    <table>
        <tbody>
            <tr v-for="(i, indexi) in tlist_row" :key="indexi">
                <td v-for="(j, indexj) in tlist_column" :key="indexj"><input v-model="magicTable[indexi][indexj]"></td>
                {{ my_sum(magicTable[indexi]) }}
            </tr>
            <tr>
                <td v-for="(j, indexj) in tlist_column"> {{ my_sum(transpose(magicTable, row, column)[indexj]) }} </td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
input {
    width: 40px;
    height:40px;
    text-align: center;
}
</style>