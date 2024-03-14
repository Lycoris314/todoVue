<script setup>
import { ref,computed } from "vue";

// const num =ref(10);
// const num2 =ref(20);
// const num_val=num.value;
// const num_com= computed(()=>{return Number(num.value)+Number(num2.value)})

const list= ref([3,1,4,1,5,9,2]);
const sum = computed(()=>{return list.value.reduce((accum,val)=>accum+val,0) })

</script>

<template>
    <hr>
    <h2>魔法陣</h2>

    <table>
        <tbody v-for="va in list">
            <td v-for="val in list" ><input type="text" :value="val+va"></td>
            <td>{{ sum }}</td>
        </tbody>
    </table>

</template>

<style scoped>
h2 {
    color: blueviolet;
}

input{
    width:40px;
    height:40px;
    text-align: center;
    border: none;
}

td{
    border: 1px solid silver;
    width:40px;
    height:40px;
    text-align: center;
}

</style>
