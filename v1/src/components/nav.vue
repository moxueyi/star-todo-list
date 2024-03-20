<script setup lang="ts">
import { onMounted, ref } from 'vue';
let nav_item = ref<HTMLDivElement>();
let nav_items = ref<HTMLDivElement[]>();
let triangle = ref<HTMLDivElement>();
let switchFlag = ref<boolean>(false);

const openNav = () => {
    if (!switchFlag.value) {
        triangle.value!.style.transformOrigin = 'center 25%';
        triangle.value!.style.transform = 'rotateZ(180deg)';
        nav_item.value!.style.height = '10dvh';
        setTimeout(() => nav_items.value?.forEach((item) => item.style.display = 'grid'), 500);
    } else {
        nav_items.value?.forEach((item) => item.style.display = 'none');
        triangle.value!.style.transformOrigin = 'center 25%';
        triangle.value!.style.transform = 'rotateZ(0deg)';
        nav_item.value!.style.height = '0dvh';
    }
    switchFlag.value = !switchFlag.value;
}

onMounted(() => {
    nav_item.value = document.querySelector('.nav-item') as HTMLDivElement;
    triangle.value = document.querySelector('.triangle') as HTMLDivElement;
    nav_items.value = document.querySelectorAll('[class^="nav-item-"]') as unknown as HTMLDivElement[];
})

</script>

<template>
    <div class="nav">
        <div class="nav-item">
            <div class="nav-item-1">
                <slot name="nav-slot-1"></slot>
            </div>
            <div class="nav-item-2">
                <slot name="nav-slot-2"></slot>
            </div>
            <div class="nav-item-3">
                <slot name="nav-slot-3"></slot>
            </div>
        </div>
        <div class="switch" @click="openNav">
            <div class="triangle"></div>
        </div>
    </div>
</template>

<style scoped lang="less">
.nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 10dvh;
    z-index: 9999;

    .nav-item {
        width: 100vw;
        height: 0dvh;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        place-items: center;
        background: linear-gradient(to right, #74cdee, #a892db, #f79ec0);
        transition: height 0.5s ease-in-out;

        [class^="nav-item-"] {
            width: 100%;
            height: 100%;
            display: none;
            color: #272727;
            font-size: 18px;
            place-items: center;
        }
    }

    .switch {
        width: 54px;
        height: 18px;
        background: #acacac;
        border-radius: 0px 0px 5px 5px;
        display: grid;
        place-items: center;

        .triangle {
            border: 10px solid rgba(255, 255, 255, 0.86);
            border-left-color: transparent;
            border-right-color: transparent;
            border-bottom-color: transparent;
            margin-top: 4px;
            transition: transform 0.5s ease-in;
        }
    }

}
</style>