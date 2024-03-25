<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute, useRouter } from 'vue-router';
// import notifyMe from './stores/utiles/notify';
import { ElMessage } from 'element-plus'

const router = useRouter();
const route = useRoute();

const home = ref<HTMLDivElement>();
const about = ref<HTMLDivElement>();

const changeActive = (path: string) => {
    if (path === '/') {
        home.value!.classList.remove('inactive')
        home.value!.classList.add('active')
        about.value!.classList.remove('active')
        about.value!.classList.add('inactive')
    }
    else {
        about.value!.classList.remove('inactive')
        about.value!.classList.add('active')
        home.value!.classList.remove('active')
        home.value!.classList.add('inactive')
    }
}


const navigatorTo = (path: string) => {
    router.push(path);
}

onMounted(() => {
    changeActive(route.path);

    ElMessage({
        showClose: true,
        duration: 5000,
        message: h('p', { style: 'color: #3949B8; font-size: 2dvb;' }, '你来啦，前辈。'),
    })

})

watch(() => route.path, (newPath) => {
    changeActive(newPath);
})

</script>

<template>
    <div class="container">
        <Header :title="'Star Todo List'" #nav-item>
            <div class="nav-item" ref="home" @click="navigatorTo('/')">
                <img class="nav-icon" src="./assets/home.svg" alt="">
                Home
            </div>
            <div class="nav-item" ref="about" @click="navigatorTo('/about')">
                <img class="nav-icon" src="./assets/about.svg" alt="">
                About
            </div>
        </Header>
        <main>
            <router-view></router-view>
        </main>

        <Footer></Footer>
    </div>
</template>

<style lang="less">
::selection,
::-moz-selection {
    background: #3949B8;
    color: #fff;
}

.container {
    background-color: rgb(148, 148, 148);
    width: 100dvw;
    height: 100vh;
    background-image: url("./assets/star.jpg");
    background-size: cover;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        background-position: center;
    }

    .title {
        font-family: "Kranky", serif;
        font-weight: 700;
        font-size: 3dvb;
        color: #ec74ea;
    }
}

header {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 1fr;

    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);

}

.nav-icon {
    width: 2dvh;
    height: 2dvh;
    margin-right: 0.5dvw;
}

.nav-item {
    white-space: nowrap;
    cursor: pointer;
}

.active {

    &::after {
        display: block;
        content: url("./assets/star_icon.svg");
        margin: 0 auto;
    }
}

.inactive {

    &::after {
        display: block;
        content: '';
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: #3949B8;
        margin: 0 auto;
    }
}

main {
    height: 80dvh;
    font-size: 2dvb;

    @media screen and (max-width: 768px) {
        overflow: auto;
    }
}
</style>