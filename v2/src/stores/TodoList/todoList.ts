import { defineStore } from "pinia";
import { TodoType } from "./todoType";
import { computed, ref } from "vue";
import { generateRandomId } from "../utiles/generateID";

export const useTodoList = defineStore('todoList', () => {
    const todoList = ref<TodoType[]>(JSON.parse(localStorage.getItem('todoList') ?? '[]'));

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
    async function updateTodo(id: string, title: string): Promise<boolean> {
        const todo = todoList.value.find(todo => todo.id === id);
        if (todo) {
            todo.title = title;
            return true;
        }
        return false;
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

    function getTitle(id: string): string {
        todoList.value.forEach(todo => {
            if (todo.id === id) {
                return todo.title;
            }
        })
        return '';
    }

    // 获取所有todo
    function getTodoList(): TodoType[] {
        return JSON.parse(JSON.stringify(todoList.value));
    }

    function isTitleChange(id: string, title: string): boolean {
        return getTitle(id) === title;
    }

    return {
        todoList,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodo,
        getCompletedTodos,
        getUncompletedTodos,
        getTodoList,
        isTitleChange,
    }
}, {
    persist: {
        key: 'todoList',
        storage: localStorage,
        paths: ['todoList'],
    }
})