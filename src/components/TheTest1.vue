<script setup>
import { ref,computed } from "vue";

const num =ref(10);
const num2 =ref(20);
const num_val=num.value;
const num_com= computed(()=>{return Number(num.value)+Number(num2.value)})

</script>

<template>
    <hr>
    <h2>色々とテストする場</h2>
    <input type="text" v-model="num">
    <input type="text" v-model="num2">
    {{ Number(num)+1 }},
    {{ num_val }}
    {{ num_com }},

</template>

<style scoped>
h2 {
    color: blueviolet;
}

</style>
