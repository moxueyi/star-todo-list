<script setup lang="ts">
import { onMounted, ref } from 'vue';

const leftMenu = ref<HTMLUListElement>();
const rightMenu = ref<HTMLUListElement>();
const star_but = ref<HTMLDivElement>();

const openMenu = () => {
    leftMenu.value!.style.display = leftMenu.value!.style.display === 'none' || leftMenu.value!.style.display === '' ? 'flex' : '';
    rightMenu.value!.style.display = rightMenu.value!.style.display === 'none' || rightMenu.value!.style.display === '' ? 'flex' : '';
    star_but.value!.style.transform = star_but.value!.style.transform === 'rotate(45deg)' ? 'rotate(0deg)' : 'rotate(45deg)';
}

onMounted(() => {
    leftMenu.value = document.querySelector('.left-menu') as HTMLUListElement;
    rightMenu.value = document.querySelector('.right-menu') as HTMLUListElement;
    star_but.value = document.querySelector('.star_but') as HTMLDivElement;
})

</script>

<template>
    <div class="footer">
        <div class="content">
            <ul class="left-menu">
                <li>
                    <div>新增待办</div>
                </li>
                <li>
                    <div>修改待办</div>
                </li>
            </ul>
            <div class="switch" @click="openMenu">
                <img ref="star_but" class="star_but" src="../assets/star_but.svg" alt="">
            </div>
            <ul class="right-menu">
                <li>
                    <div>完成/重做</div>
                </li>
                <li>
                    <div>删除勾选</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="less">
// 基础布局
.footer,
.content,
.left-menu,
.right-menu {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 10dvh;
}

.content {
    position: absolute;
    width: 100%;

    @media screen and (min-width: 768px) {
        width: 70%;
    }
}

.footer {
    position: absolute;
    width: 100dvw;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
}

// 切换按钮样式和布局
.switch {
    @media screen and (min-width: 768px) {
        display: none;
    }

    z-index: 999;

    width: 6dvh;
    height: 6dvh;
    margin: 0 2dvh 0 2dvh;
    border-radius: 50%;
    background-color: #FEFCD6;
    box-shadow: 3px 5px 10px rgba(0, 0, 0, 0.6);

    >.star_but {
        width: 3dvh;
        height: 3dvh;
        margin: 2dvh 0 0 1dvh;
        user-select: none;
        transition: transform 0.4s;
    }

    &:hover {
        // 抖动效果
        animation: shake 0.6s;

        @keyframes shake {

            0% {
                transform: translate(1px, 1px) rotate(0deg);
            }

            10% {

                transform: translate(-1px, -2px) rotate(-1deg);
            }

            20% {

                transform: translate(-3px, 0px) rotate(1deg);
            }

            30% {

                transform: translate(3px, 2px) rotate(0deg);
            }

            40% {

                transform: translate(1px, -1px) rotate(1deg);
            }

            50% {

                transform: translate(-1px, 2px) rotate(-1deg);
            }

            60% {

                transform: translate(-3px, 1px) rotate(0deg);
            }

            70% {

                transform: translate(3px, 1px) rotate(-1deg);

            }

            80% {

                transform: translate(-1px, -1px) rotate(1deg);

            }

            90% {

                transform: translate(3px, 1px) rotate(-1deg);
            }

            100% {

                transform: translate(1px, 2px) rotate(0deg);
            }
        }
    }
}


// 左右菜单按钮布局样式
.left-menu,
.right-menu {
    flex: 1;
    white-space: nowrap;
    z-index: 1;

    >li {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;

        >div {
            padding: 0.8dvw;
            border-radius: 4px;
            font-size: 1.5dvb;
            cursor: pointer;
        }
    }

    @media screen and (max-width: 768px) {
        display: none;
    }
}

// 左右菜单按钮样式
.left-menu {
    color: #fff;

    >:first-child div {
        color: #46385C;
        background-color: rgba(63, 196, 50, 0.8);
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            color: #fff;
            background-color: rgba(132, 243, 122, 0.8);
        }

        &:active {
            color: #46385C;
            background-color: rgba(63, 196, 50, 1);
        }
    }

    >:last-child div {
        color: #fff;
        background-color: rgba(133, 96, 210, 0.8);
        transition: background-color 0.3s, color 0.3s;

        &:hover {
            color: #46385C;
            background-color: rgba(179, 152, 238, 0.8);
        }

        &:active {
            color: #fff;
            background-color: rgba(133, 96, 210, 1);
        }

    }
}
.right-menu {

    >:first-child div {
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

    >:last-child div {
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