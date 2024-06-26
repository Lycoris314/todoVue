import { ref } from "vue";

// 外部から使えるようにexportする
export const useTodoList = () => {
    //todoListRefを定義
    const ls = localStorage.todoList;
    const todoListRef = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : [];

    const add = (task) => {
        const id = new Date().getTime(); //現在時刻をidとする。
        todoListRef.value.unshift({ id: id, task: task, checked: false });
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const findById = (id) => {
        return todoListRef.value.find((todo) => todo.id === id);
    };

    const findIndexById = (id) => {
        return todoListRef.value.findIndex((todo) => todo.id === id);
    };

    const editId = ref(-1); //showとeditを結ぶ

    const show = (id) => {
        const todo = findById(id);
        editId.value = id;
        return todo.task; //画面処理させるために返す
    };

    const edit = (task) => {
        const todo = findById(editId.value);
        const idx = findIndexById(editId.value);

        todo.task = task;
        todoListRef.value.splice(idx, 1, todo); //置換

        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    const del = (id) => {
        const todo = findById(id);
        const delMsg = "「" + todo.task + "」を削除しますか？";

        if (!confirm(delMsg)) return;

        const idx = findIndexById(id);
        todoListRef.value.splice(idx, 1);

        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id) => {
        const todo = findById(id);
        const idx = findIndexById(id);

        todo.checked = !todo.checked;
        todoListRef.value.splice(idx, 1, todo);

        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const allDel = () => {
        const delMsg = "本当に済をすべて削除しますか？";
        if (!confirm(delMsg)) return;
        todoListRef.value = todoListRef.value.filter(
            (todo) => todo.checked === false
        );
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    return { todoListRef, add, show, edit, del, check, allDel };
};
