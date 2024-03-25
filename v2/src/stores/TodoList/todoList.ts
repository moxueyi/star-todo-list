import { defineStore } from "pinia";
import { TodoType } from "./todoType";
import { computed, ref } from "vue";
import { generateRandomId } from "../utiles/generateID";

export const useTodoList = defineStore('todoList', () => {
    const todoList = ref<TodoType[]>([
        { "id": "1711181318393-8xuos", "title": "affffffffffffffffffffffffffffffffagggggggggggg", "completed": false },
        { "id": "1711181336743-bbf5j", "title": "bb", "completed": true },
        { "id": "1711181354170-abj0w2", "title": "cc", "completed": false },
        { "id": "1711181700532-ejakjr", "title": "dd", "completed": true },
    ]);

    // 添加一个todo
    function addTodo(title: string) {
        todoList.value.push({
            id: generateRandomId(),
            title,
            completed: false,
        })
    }

    // 删除一个todo
    function deleteTodo(id: string) {
        const index = todoList.value.findIndex(todo => todo.id === id);
        todoList.value.splice(index, 1);
    }

    // 修改一个todo
    function updateTodo(id: string, title: string) {
        const todo = todoList.value.find(todo => todo.id === id);
        if (todo) {
            todo.title = title;
        }
    }

    // 切换一个todo的完成状态
    function toggleTodo(id: string) {
        const todo = todoList.value.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    // 获取已完成todo
    const getCompletedTodos = computed(() => {
        return todoList.value.filter(todo => todo.completed);
    })

    // 获取未完成todo
    const getUncompletedTodos = computed(() => {
        return todoList.value.filter(todo => !todo.completed);
    })

    return {
        todoList,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodo,
        getCompletedTodos,
        getUncompletedTodos,
    }
})