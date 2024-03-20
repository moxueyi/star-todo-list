<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import type { base } from '../datatype';

let date = new Date();
let month = (date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1);
let day = date.getUTCDate() < 10 ? '0' + date.getUTCDate() : date.getUTCDate();
let now_date = date.getFullYear() + '-' + month + '-' + day;

let first = ref<base>();

onBeforeMount(() => {
    first.value = JSON.parse(localStorage.getItem('first') as string);
})
</script>

<template>
    <div class="home">
        <div class="box">
            <div class="title">
                <div class="text">Todo</div>
                <div class="line"></div>
            </div>
            <div class="todoBody">{{ first?.title }}</div>
            <div class="date">
                <div class="now">
                    <span>目前日期：</span>
                    {{ now_date }}
                </div>
                <div class="plan">
                    <span>计划日期：</span>
                    {{ first?.date }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.home {
    width: 100%;
    height: 100%;
    overflow: auto;
    overscroll-behavior: contain;
    display: grid;
    place-items: center;
    background-image: url('../assets/star.jpg');
    background-size: cover;
    background-repeat: no-repeat;    

    .box {
        width: 80%;
        padding: 30px;
        background-color: rgba(255, 250, 250, 0.4);
        // 模糊
        backdrop-filter: blur(5px);
        overflow: hidden;
        display: grid;
        place-items: center;
        border: 1px solid rebeccapurple;
    }
}

.title {
    display: grid;
    place-items: center;
    width: 100%;

    .text {
        color: rgb(74, 73, 73);
        font-size: 36px;
        font-weight: 700;
        line-height: 48px;
        letter-spacing: 0px;
    }

    .line {
        width: 60%;
        height: 11px;
        background: rgb(96, 87, 105);
    }
}

.todoBody {
    margin: 30px;
    color: rgb(74, 73, 73);
    font-size: 24px;
    font-weight: 700;
    line-height: 35px;
    letter-spacing: 2px;

    max-width: 100%;
    white-space: nowrap;
    overflow: auto;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

}

.date {

    .now,
    .plan {
        color: rgb(0, 0, 0);
        font-family: 思源黑体;
        font-size: 20px;
        font-weight: 300;
        line-height: 29px;
        letter-spacing: 0px;

    }

    .now span {
        color: #9e579d;
    }

    .plan span {
        color: #574b90;
    }
}
</style>