<script setup lang="ts">
const props = defineProps<{
    title: string,
}>();

</script>

<template>
    <div class="header">
        <div class="logo">{{ props.title }}</div>
        <nav>
            <slot name="nav-item"></slot>
        </nav>
    </div>
</template>

<style scoped lang="less">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10dvh;
    width: 100dvw;

    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
    padding: 0 3dvh 0 3dvh;

    .logo {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;

        font-family: "Kranky", serif;
        font-weight: 700;
        font-size: 3.5dvh;
        color: #ec74ea;
        width: 100%;
        height: 100%;
        white-space: nowrap;
    }

    nav {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;

        gap: 4dvh;
        font-size: 2.5dvh;
        text-align: center;
        width: 100%;
        height: 100%;
    }
}
</style>