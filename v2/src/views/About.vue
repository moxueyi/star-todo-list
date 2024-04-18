<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserToken } from '../stores';
import { ElMessage } from 'element-plus';
import { h } from 'vue';

const router = useRouter();

const userToken = useUserToken();
const user = userToken.getToken();

const switchAccount = () => {
    userToken.removeToken();
    router.push('/login');
}

const logoutAccout = () => {
    router.push('/');

    ElMessage({
        showClose: true,
        duration: 5000,
        message: h('p', { style: 'color: #3949B8; font-size: 2dvb;' }, `已经退出账号：${userToken.getToken()!.nikeName}`),
    })
    userToken.removeToken();
}


</script>

<template>
    <div class="about">
        <div class="card">
            <div class="avatar"><img src="../assets/moxueyi.png" alt="" srcset=""></div>
            <div class="name"><span>Nickname: </span>{{ user?.nikeName }}</div>
            <div class="button">
                <div class="switch-account" @click="switchAccount">切换用户</div>
                <div class="logout" @click="logoutAccout">退出登陆</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.about {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;

    .card {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        gap: 1dvh;

        background-color: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(6px);
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);


        padding: 5dvh 0 5dvh 0;

        width: 80%;
        height: 80%;

        @media screen and (min-width: 1000px) {
            width: 70%;
        }

        @media screen and (min-width: 1200px) {
            width: 40%;
        }
    }
}

.avatar {
    width: 20dvh;
    height: 20dvh;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;

    &:hover {
        //放大动画
        transform: scale(1.1);
        transition: all 0.5s ease-in-out;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;



    }

}

.name {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 3dvh;

    span {
        font-weight: 700;
        margin-right: 2dvh;
    }
}

.button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2dvh;

    .switch-account,
    .logout {
        padding: 1dvh 2dvh;
        border-radius: 5dvh;
        backdrop-filter: blur(6px);
        transition: background-color 0.2s ease-in-out;
        user-select: none;
        cursor: pointer;
    }

    .switch-account {
        background-color: #fefcd6;

        &:hover {
            background-color: #fff0b3;
        }
    }

    .logout {
        background-color: #ff85cc;


        &:hover {
            background-color: #ff66b3;
        }
    }
}
</style>