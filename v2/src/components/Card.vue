<script setup lang="ts">
import { useTodoList, useCheckedList } from '../stores';
import { TodoType } from '../stores/TodoList/todoType';
import { isCompleted } from '../stores/utiles/isComplete';

const todoStore = useTodoList();
const checkedStore = useCheckedList();

const props = defineProps<{
    backFont: string,
    list: TodoType[],
}>();

const emit = defineEmits<{
    (e: 'pushId', id: string): void,
    (e: 'toggleTodo', backFunc: Function, id: string, completed: boolean): void,
    (e: 'deleteTodo', backFunc: Function, id: string, completed: boolean): void
}>();

</script>

<template>
    <div class="card">
        <div class="card-content">
            <div class="card-item" v-for="item in props.list" :key="item.id">
                <div class="todo-title">{{ item.title }}</div>
                <div class="todo-button">
                    <button class="card-item-completed" type="button"
                        @click="emit('toggleTodo', todoStore.toggleTodo, item.id, item.completed)">
                        {{ isCompleted(item.completed, '重做', '完成') }}
                    </button>
                    <button class="card-item-delete" type="button"
                        @click="emit('deleteTodo', todoStore.deleteTodo, item.id, item.completed)">删除</button>
                    <input class="card-item-checkbox" type="checkbox" :checked="checkedStore.includeID(item.id)"
                        @click="emit('pushId', item.id)">
                </div>
            </div>
        </div>
        <div class="back-font">
            {{ props.backFont }}
        </div>
    </div>
</template>

<style scoped lang="less">
.card {
    position: relative;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    width: 35dvw;
    height: 50dvh;
    padding: 1dvh;

    @media screen and (max-width: 768px) {
        width: 80dvw;
        height: 80dvh;
    }
}

.back-font {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -999;


    color: white;
    text-shadow:
        -1px -1px 0 black,
        1px -1px 0 black,
        1px 1px 0 black,
        -1px 1px 0 black;

    text-align: end;
    font-size: 5dvh;
    font-family: "Festive", serif;
    font-weight: 500;

    user-select: none;
}

.card-content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: auto;
    z-index: 999;
}

.card-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 1dvb;
    z-index: 998;

    gap: 1dvh;

    padding: 1dvh;
    height: 10dvh;
    width: 100%;
    place-items: center;
    font-size: 3dvb;


    &:not(:last-child) {
        margin-bottom: 1dvh;
    }

}

.todo-title {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: auto;
    white-space: nowrap;
    text-overflow: ellipsis;

    display: grid;
    place-items: center;

    scrollbar-width: none;
}

.todo-button {
    display: flex;
    flex-direction: row;

    gap: 1dvh;
    justify-content: space-evenly;
    align-items: center;

    .card-item-checkbox {
        position: relative;
        width: 3dvh;
        height: 3dvh;
        //清除默认样式
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 2px solid rgb(73, 63, 96);
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        outline: none;
        transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

        &:checked {

            background-color: rgb(73, 63, 96);
            border-color: rgb(73, 63, 96);

            &::before {
                content: '';
                position: absolute;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(1);
                background-color: #fff;
            }
        }
    }


    .card-item-completed,
    .card-item-delete {
        white-space: nowrap;

        border: none;

        height: 3dvh;
        line-height: 3dvh;
        text-align: center;
        padding: 0 1dvb 0 1dvb;

        border: none;
        border-radius: 4px;
        cursor: pointer;

        font-size: 1.5dvb;
    }

    .card-item-completed {
        color: #46385C;
        background-color: rgba(94, 132, 239, 0.8);
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            color: #fff;
            background-color: rgba(133, 162, 241, 0.8);
        }

        &:active {
            color: #46385C;
            background-color: rgba(94, 132, 239, 1);
        }
    }

    .card-item-delete {
        color: #fff;
        background-color: rgba(255, 0, 170, 0.8);
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            color: #46385C;
            background-color: rgba(250, 98, 199, 0.8);
        }

        &:active {
            color: #fff;
            background-color: rgba(255, 0, 170, 1);
        }
    }
}
</style>