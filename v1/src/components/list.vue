<script setup lang="ts">
import { Ref, inject, ref } from 'vue';
import { base, todoType } from '../datatype';

let todoList = inject<todoType>('todoList');
let selectTodo = inject<Ref<number>>('selectTodo');
let doneTodo = inject<Ref<base[]>>('doneTodo');
let list = ref<any>(todoList);
let switchFlag = ref<boolean>(false);

</script>

<template>
    <div class="list">
        <div class="todoSwitch">
            <div>
                <button class="button" @click="(list = todoList, switchFlag = false)">未完成</button>
                <div v-if="!switchFlag" class="doneLine"></div>
            </div>
            <div>
                <button class="button" @click="(list = doneTodo, switchFlag = true)">已完成</button>
                <div v-if="switchFlag" class="doneLine"></div>
            </div>
        </div>
        <div class="list-item" v-for="(item, key) in list" :key="key">
            <div class="info">
                <div class="title">
                    <div class="line"></div>
                    <div class="text">{{ item.title }}</div>
                </div>
                <div class="date">
                    <span>计划日期：</span>
                    {{ item.date }}
                </div>
            </div>
            <div v-if="!switchFlag" class="switch">
                <input type="radio" name="select" id="select" :value="key" v-model="selectTodo">
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.list {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .todoSwitch {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 10px;
        background-color: snow;
        margin-top: 10px;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: 10px;

        .button {
            appearance: none;
            cursor: pointer;
            border: none;
            outline: none;
            text-align: center;

            &:active {
                box-shadow: none;
            }
        }
    }
}

.doneLine {
    width: 100%;
    height: 3px;
    background-color: aquamarine;
}

.list-item {
    display: grid;
    grid-template-columns: 2fr 0.5fr;
    grid-column: 10px;

    width: 80%;
    background: rgb(253, 252, 252);
    border-radius: 10px;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    margin-bottom: 30px;
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 10px;
    width: 100%;
    overflow: hidden;
}

.title {
    display: flex;
    flex-direction: row;
    margin: 10px;
    width: 100%;

    .line {
        width: 4px;
        height: 26px;
        background: rgb(36, 189, 216);
        transition: background 0.3s ease-in-out;
    }

    .text {
        display: grid;
        place-items: center;
        margin: 0 10px 0 10px;
        max-width: 100%;
        overflow: auto;
        white-space: nowrap;
        scrollbar-width: none;
        -ms-overflow-style: none;

        &::-webkit-scrollbar {
            display: none;
        }

    }

}

.date {
    display: flex;
    flex-direction: row;
    justify-content: center;
    line-height: 24px;

    span {
        color: #574b90;
    }
}

.switch {
    display: grid;
    place-items: center;
}

#select {
    width: 30px;
    height: 30px;
    appearance: none;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
        inset 0 0 2px rgba(255, 255, 255, 0.4);
    cursor: pointer;
    display: grid;
    place-items: center;

}

#select:checked::before {
    content: '';
    width: 14px;
    height: 14px;
    background: #ff6b81;
    border-radius: 50%;
}
</style>