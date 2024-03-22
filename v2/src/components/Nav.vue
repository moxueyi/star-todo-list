<script setup lang="ts">

</script>

<template>
    <div class="nav">
        <div class="title">Star Todo List</div>
        <nav>
            <slot name="nav-item"></slot>
        </nav>
    </div>
</template>

<style scoped lang="less">
.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10dvh;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(6px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    padding: 0 30px 0 30px;

    .title {
        font-family: "Kranky", serif;
        font-weight: 700;
        font-size: 3.5dvh;
        color: #ec74ea;
    }

    nav {
        display: flex;
        flex-direction: row;
        gap: 5dvw;
        font-size: 2.5dvb;
        text-align: center;

        cursor: pointer;
    }
}
</style>