<script setup lang="ts">
import { h, onMounted, ref, watch } from 'vue';
import MyHeader from './components/Header.vue';
import MyFooter from './components/Footer.vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserToken } from './stores';
import { ElMessage } from 'element-plus';

const userToken = useUserToken();

const router = useRouter();
const route = useRoute();

const home = ref<HTMLDivElement>();
const about = ref<HTMLDivElement>();
type menu = { menu1: string, menu2: string };
const footer = ref<{ leftMenu: menu, rightMenu: menu }>({
    leftMenu: { menu1: '新增待办', menu2: '修改待办' },
    rightMenu: { menu1: '设置勾选', menu2: '删除勾选' }
});
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
    // console.log(userToken.getToken() === null);

    if (userToken.getToken() !== null) {
        ElMessage({
            showClose: true,
            duration: 5000,
            message: h('p', { style: 'color: #3949B8; font-size: 2dvb;' }, `你来啦，${userToken.getToken()!.nikeName}前辈。`),
        })
    }

})

watch(() => route.path, (newPath) => {
    changeActive(newPath);
})

</script>

<template>
    <div class="container">
        <MyHeader :title="'Star Todo List'" #nav-item>
            <div class="nav-item" ref="home" @click="navigatorTo('/')">
                <img class="nav-icon" src="./assets/home.svg" alt="">
                Home
            </div>
            <div class="nav-item" ref="about" @click="navigatorTo('/about')">
                <img class="nav-icon" src="./assets/about.svg" alt="">
                About
            </div>
        </MyHeader>
        <main>
            <router-view></router-view>
        </main>

        <MyFooter v-if="route.path !== '/login'" :left-menu="footer.leftMenu" :right-menu="footer.rightMenu">
        </MyFooter>
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
    height: 100dvh;
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