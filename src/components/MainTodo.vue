<script setup>//setupを忘れない

import { ref } from "vue"; //使う関数(refなど)をimportする。

import { useTodoList } from "../composables/useTodoList.js";

const todoRef = ref(""); //TODO追加欄とバインド

const isEditRef = ref(false); //変更ボタンの表示のオンオフ

const { todoListRef, add, show, edit, del, check } = useTodoList();

//追加ボタンをクリック
const addTodo = () => {

    add(todoRef.value);

    todoRef.value = "";
}

//編集ボタンをクリック
const showTodo = (id) => {

    isEditRef.value = true;

    todoRef.value = show(id);
}

//変更ボタンをクリック
const editTodo = () => {

    edit(todoRef.value);

    isEditRef.value = false;

    todoRef.value = "";
}

//削除ボタン
const deleteTodo = (id) => {
    del(id);
}

//チェックボックスのオンオフ
const changeCheck = (id) => {
    check(id);
}

</script>

<template>
    <div class="box_input">

        <input class="todo_input" placeholder="＋ TODOを入力" v-model="todoRef" />

        <div class="addChange">
            <button class="btn green" @click="editTodo" v-if="isEditRef">変更</button>
            <button class="btn" @click="addTodo" v-else>追加</button>
        </div>
    </div>

    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">

            <div class="todo" :class="{ fin: todo.checked }">
                <input type="checkbox" class="check" @change="changeCheck(todo.id)" :checked="todo.checked" />

                <label>{{ todo.task }}</label>
            </div>

            <div class="btns">
                <button class="btn green" @click="showTodo(todo.id)">編</button>

                <button class="btn pink" @click="deleteTodo(todo.id)">削</button>
            </div>
        </div>
    </div>

</template>

<style scoped>
.box_input {
    margin: 20px 0;
    text-align: center;
}

.addChange {
    margin: 10px;
}

.todo_list {
    display: flex;
    justify-content: center;
}

.check {
    margin: 5px;
}

.todo_input {
    width: 50%;
    margin-right: 8px;
    padding: 10px;
    font-size: 18px;
    border: 1px solid #aaa;
    border-radius: 6px;
}

.btn {
    border: none;
    margin: 3px;
    padding: 8px;
    cursor: pointer;
    background-color: #03a9f4;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    font-size: 14px;
}

.btns {
    display: flex;
    margin: 10px 0;
}

.todo {
    /*border: 1px solid silver;*/
    background-color: antiquewhite;
    padding: 5px;
    margin: 20px;
    width: 60%;
}

.green {
    background-color: rgb(118, 187, 14);
}

.pink {
    background-color: rgb(244, 111, 134);
}

.fin {
    text-decoration: line-through;
    background-color: #c9c9c9;
    color: brown
}
</style>
