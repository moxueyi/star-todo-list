<script setup lang="ts">
import { Ref, inject } from 'vue';
import { base } from '../datatype';

let todo = inject<Ref<base>>('todo');

</script>

<template>
    <div class="detail">
        <div class="box">
            <div class="text">{{ todo!.title }}</div>
            <div class="line"></div>
            <div class="info">
                <input class="input-title" type="text" v-model="todo!.title" placeholder="请输入待办事项" />
                <input class="input-date" type="date" v-model="todo!.date" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.detail {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;

    .box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: snow;
        border-radius: 20px;
        padding: 20px 0 20px 0;
        width: 70%;
        overflow: hidden;

        .line {
            width: 60%;
            height: 11px;
            background: rgb(96, 87, 105);
            margin: 20px;
        }

        .text {
            color: rgb(74, 73, 73);
            font-size: 36px;
            font-weight: 700;
            line-height: 48px;
            letter-spacing: 0px;
            max-width: 100%;
            white-space: nowrap;
            overflow: auto;

            scrollbar-width: none;
            -ms-overflow-style: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }
    }
}

.info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

[class ^='input-'] {
    appearance: none;
    width: 80%;
    padding: 10px;
    border-radius: 10px;
    border: 2px solid #ccc;
    color: #222;
    font-size: 20px;
}

[class ^='input-']:focus {
    outline: none;
    border: 2px solid #18a3ff;
}

.input-title {
    margin-bottom: 20px;
}
</style>