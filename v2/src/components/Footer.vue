<script setup lang="ts">
import { onMounted, ref, h } from 'vue';
import MyDialog from './Dialog.vue';
import { useTodoList, useCheckedList } from '../stores';
import { TodoType } from '../stores/TodoList/todoType';
import { ElMessage } from 'element-plus';

const todoStore = useTodoList();
const checkedStore = useCheckedList();

const props = defineProps<{
    leftMenu: { menu1: string, menu2: string },
    rightMenu: { menu1: string, menu2: string },
}>();
const leftMenu = ref<HTMLUListElement>();
const rightMenu = ref<HTMLUListElement>();
const star_but = ref<HTMLDivElement>();

const openMenu = () => {
    star_but.value!.style.transform = star_but.value!.style.transform === 'rotate(45deg)' ? 'rotate(0deg)' : 'rotate(45deg)';
    if (leftMenu.value!.classList.length < 2) {
        leftMenu.value!.classList.add('left-menu-hidden');
        rightMenu.value!.classList.add('right-menu-hidden');
    } else {
        leftMenu.value!.classList.remove('left-menu-hidden');
        rightMenu.value!.classList.remove('right-menu-hidden');
    }
}

onMounted(() => {
    leftMenu.value = document.querySelector('.left-menu') as HTMLUListElement;
    rightMenu.value = document.querySelector('.right-menu') as HTMLUListElement;
    star_but.value = document.querySelector('.star_but') as HTMLDivElement;
})

const dialogVisible = ref<boolean>(false);
const dialogTitle = ref<string>('');
const editList = ref<TodoType[]>([]);

const openWindow = (title: string) => {
    // console.log(title);
    if (title === props.leftMenu.menu2 && checkedStore.checkedList.length === 0) {
        ElMessage({
            type: 'error',
            showClose: true,
            duration: 5000,
            message: h('p', { style: 'color: red; font-size: 2dvb;' }, '前辈没有在列表上勾选任何待办事项哦！'),
        })
        return;
    }

    dialogVisible.value = true;
    dialogTitle.value = title;

    if (title === props.leftMenu.menu2) {
        todoStore.todoList.forEach(todo => {
            if (checkedStore.includeID(todo.id)) {
                const todos = editList.value.filter(item => item.id === todo.id);
                if (todos.length === 0) {
                    editList.value.push(JSON.parse(JSON.stringify(todo)));
                } else {
                    const index = editList.value.findIndex(item => item.id === todo.id);
                    editList.value[index] = { ...JSON.parse(JSON.stringify(todo)) };
                }
            }
        })
    }
    // console.log(editList.value);
}

const input = ref<string>('');
const clearInput = () => {
    input.value = '';
}

const handleAddTodo = () => {
    todoStore.addTodo(input.value);
    clearInput();
}

const handleEditTodo = () => {
    // console.log('handle');
    editList.value.forEach(async item => {
        await todoStore.updateTodo(item.id, item.title);
    })

    dialogVisible.value = false;
    editList.value = [];
}
const clearEditItem = (index: number) => {
    editList.value[index].title = '';
}
const enterEditItem = (index: number, id: string) => {
    todoStore.updateTodo(id, editList.value[index].title);
}
</script>

<template>
    <MyDialog v-model:dialog-visible="dialogVisible" :dialog-title="dialogTitle">
        <template #content>
            <div class="dialog-add" v-if="dialogTitle === props.leftMenu.menu1">
                <el-input v-model="input" style="width: 100%; height: 100%;" placeholder="请输入代办事项"
                    @keydown.enter="handleAddTodo" />
                <div class="clear" @click="clearInput">清空</div>
            </div>
            <div class="dialog-edit" v-if="dialogTitle === props.leftMenu.menu2">
                <div class="dialog-edit-item" v-for="item, index in editList" :key="item.id">
                    <el-input v-model="item.title" style="width: 100%; height: 100%;" placeholder="请输入代办事项" />
                    <div class="clear" @click="clearEditItem(index)">清空</div>
                    <div class="enter" @click="enterEditItem(index, item.id)">提交</div>
                </div>
            </div>
            <div v-else-if="dialogTitle === props.rightMenu.menu1">
                {{ props.rightMenu.menu1 }}
            </div>
            <div v-else-if="dialogTitle === props.rightMenu.menu2">
                {{ props.rightMenu.menu2 }}
            </div>
        </template>
        <template #footer>
            <div class="dialog-footer" v-if="dialogTitle === props.leftMenu.menu1">
                <div class="enter" @click="handleAddTodo">添加（Enter）</div>
            </div>
            <div v-else-if="dialogTitle === props.leftMenu.menu2">
                <div class="enter" @click="handleEditTodo">统一提交</div>
            </div>
            <div v-else-if="dialogTitle === props.rightMenu.menu1">
                {{ props.rightMenu.menu1 }}
            </div>
            <div v-else-if="dialogTitle === props.rightMenu.menu2">
                {{ props.rightMenu.menu2 }}
            </div>
        </template>
    </MyDialog>
    <div class="footer">
        <div class="content">
            <ul class="left-menu">
                <li @click="openWindow(`${props.leftMenu.menu1}`)">
                    {{ props.leftMenu.menu1 }}
                </li>
                <li @click="openWindow(`${props.leftMenu.menu2}`)">
                    {{ props.leftMenu.menu2 }}
                </li>
            </ul>
            <div class="switch" @click="openMenu">
                <img ref="star_but" class="star_but" src="../assets/star_but.svg" alt="">
            </div>
            <ul class="right-menu">
                <li @click="openWindow(`${props.rightMenu.menu1}`)">
                    {{ props.rightMenu.menu1 }}
                </li>
                <li @click="openWindow(`${props.rightMenu.menu2}`)">
                    {{ props.rightMenu.menu2 }}
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
    justify-content: space-around;
    align-items: center;
    height: 10dvh;
}

.content {
    position: absolute;
    width: 100%;

    .left-menu-hidden {
        transform: translateX(-100dvw);
    }

    .right-menu-hidden {
        transform: translateX(100dvw);
    }

    @media screen and (min-width: 768px) {
        width: 70%;

        .left-menu-hidden,
        .right-menu-hidden {
            transform: none;
        }
    }
}

.footer {
    position: absolute;
    width: 100dvw;
    background-color: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(3px);
    overflow: hidden;
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
        transition: transform 0.3s ease-in;
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
    transition: transform 0.3s;

    >li {

        display: grid;
        place-items: center;

        padding: 0.8dvw;
        border-radius: 4px;
        font-size: 1.5dvb;
        cursor: pointer;
    }
}

// 左右菜单按钮样式
.left-menu {
    color: #fff;

    >:first-child {
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

    >:last-child {
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

    >:first-child {
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

    >:last-child {
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

.dialog-add {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 5dvh;
    gap: 2dvh;
    white-space: nowrap;
}

.clear,
.enter {
    display: grid;
    place-items: center;
    border-radius: 4px;
    font-size: 2dvh;
    height: 100%;
    padding: 2px 1dvh 2px 1dvh;
    cursor: pointer;
    user-select: none;
    transition: background-color 0.3s, color 0.3s;
    white-space: nowrap;
}

.clear {
    color: #fff;

    background-color: rgba(255, 0, 170, 0.8);

    &:hover {
        color: #46385C;
        background-color: rgba(250, 98, 199, 0.8);
    }

    &:active {
        color: #fff;
        background-color: rgba(255, 0, 170, 1);
    }
}

.enter {
    color: #46385C;
    background-color: rgba(94, 132, 239, 0.8);

    &:hover {
        color: #fff;
        background-color: rgba(133, 162, 241, 0.8);
    }

    &:active {
        color: #46385C;
        background-color: rgba(94, 132, 239, 1);
    }
}

.dialog-edit {
    display: flex;
    flex-direction: column;
    gap: 2dvh;
    white-space: nowrap;

    .dialog-edit-item {
        display: flex;
        flex-direction: row;
        gap: 2dvh;
    }
}
</style>