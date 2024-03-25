<script setup lang="ts">
import { ref, watch } from 'vue';
import Card from '../components/Card.vue';
import { useTodoList } from '../stores';
import deleteTodo from '../stores/TodoList/deleteTodo'
import toggleTodo from '../stores/TodoList/toggleTodo'


const todoStore = useTodoList();
const checkedList = ref<Array<string>>([]);
const pushID = (id: string) => {

    if (checkedList.value!.includes(id)) {
        checkedList.value!.splice(checkedList.value!.indexOf(id), 1);
        return;
    }
    checkedList.value!.push(id);
    console.log(id);
}


watch(checkedList.value, (newVal) => {
    console.log(newVal);
})



</script>

<template>
    <div class="todo-container">
        <Card :back-font="'Pending'" :list="todoStore.getUncompletedTodos" @push-id="pushID" @toggle-todo="toggleTodo"
            @delete-todo="deleteTodo"></Card>
        <Card :back-font="'Completed'" :list="todoStore.getCompletedTodos" @push-id="pushID" @toggle-todo="toggleTodo"
            @delete-todo="deleteTodo"></Card>
    </div>
</template>

<style scoped lang="less">
.todo-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;

    @media screen and (max-width: 768px) {
        flex-direction: column;
        justify-content: none;
        height: auto;

        gap: 5dvh;

        margin-top: 5dvh;
        margin-bottom: 5dvh;

    }
}
</style>