<script setup lang="ts">

</script>

<template>
    <div class="about">
        <div class="card">
            <div class="avatar"><img src="../assets/moxueyi.png" alt="" srcset=""></div>
            <div class="name"><span>Nickname:</span>moxueyi</div>
            <div class="desc">
                <p>
                    <span>关于我：</span>一个热爱编程的菜鸟
                </p>
                <p>
                    <span>目前：</span>
                    正在努力成为一名高级程序员，希望可以和大家一起进步
                </p>
                <p><span>This demo：</span>这是一个简单的todo list
                    demo，以一款名为《卡拉彼丘》射击游戏内的小天使角色——星绘作为主题，游戏特色是可以变成“纸片人”，里面有高手也有萌萌人，不说了，卡丘启动～</p>
            </div>
            <div class="links"><a href="https://klbq.qq.com/web202305/index.html?nav=world" target="_blank">《卡拉彼丘》官网</a>
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

.desc {
    margin: 0 3dvh 0 3dvh;
    cursor: text;

    span {
        font-weight: 700;
    }

    p {
        letter-spacing: 0.1em;
    }
}

.links a {
    color: #be4fe0;
    text-decoration: none;
    font-weight: 700;

    &:hover {
        color: #8000ff;
    }

    border-bottom: 1px solid #000000;
}
</style>