<script setup lang="ts">
import myNav from './components/nav.vue'
import home from './components/home.vue';
import list from './components/list.vue';
import detail from './components/detail.vue';
import { provide, reactive, ref } from 'vue';
import { base, todoType } from './datatype';

let id = ref<number>(0);
let todoList = reactive<todoType>({});

let doneTodo = reactive<base[]>([]);

const currTab = ref<string>('home');

type TabType = {
    [key: string]: {
        path: string,
        icon?: URL,
        component: any,
        optional?: string,
    }
}

const tabs: TabType = {
    'home': {
        path: '/',
        icon: new URL('./assets/list.svg', import.meta.url),
        component: home,
    },
    'list': {
        path: '/list',
        icon: new URL('./assets/home.svg', import.meta.url),
        component: list,
    },
    'detail': {
        path: '/detail',
        icon: new URL('./assets/return.svg', import.meta.url),
        component: detail,
        optional: 'default',
    }
};

let todo = ref<base>({
    title: '',
    date: '',
    done: false
})

let selectTodo = ref<number>(NaN);

const handleTab = () => {
    // console.log('change tab');

    if (tabs[currTab.value].path === '/list') {
        currTab.value = 'home';
    } else {
        currTab.value = 'list';
    }
}

const handleAdd = () => {
    currTab.value = 'detail';
    tabs[currTab.value].optional = 'add';
}

const handleEdit = () => {
    if (!Number.isNaN(selectTodo.value)) {
        currTab.value = 'detail';
        tabs[currTab.value].optional = 'edit';
        todo.value = JSON.parse(JSON.stringify(todoList[selectTodo.value]));
    } else {
        alert('您没有勾选任何待办!');
    }
}

const handleDelete = () => {
    if (!Number.isNaN(selectTodo.value)) {
        delete todoList[selectTodo.value];
        if (!(localStorage.getItem('id') === null)
            && selectTodo.value === JSON.parse(localStorage.getItem('id')!)
        ) {
            localStorage.removeItem('id');
            localStorage.removeItem('first');
        }
        selectTodo.value = NaN;
    } else {
        alert('您没有勾选任何待办!');
    }
}

const handleDone = () => {
    if (!(localStorage.getItem('id') === null)) {
        doneTodo.push(JSON.parse(localStorage.getItem('first')!));
        delete todoList[JSON.parse(localStorage.getItem('id')!)];
        localStorage.removeItem('first');
        localStorage.removeItem('id');
        currTab.value = 'list';
    } else {
        alert('您还没有设置先行待办!');
    }
}

const handleFirst = () => {
    if (!Number.isNaN(selectTodo.value)) {
        localStorage.setItem('first', JSON.stringify(todoList[selectTodo.value]));
        localStorage.setItem('id', JSON.stringify(selectTodo.value));
        selectTodo.value = NaN;
        currTab.value = 'home';
    } else {
        alert('您没有勾选任何待办!');
    }
}

const handleEnter = () => {
    if (tabs[currTab.value].optional === 'add') {
        if (todo.value.title !== '' && todo.value.date !== '') {
            todoList[id.value++] = JSON.parse(JSON.stringify(todo.value));
        } else {
            alert('您尚未输入待办事项或日期!');
        }

    } else {
        todoList[selectTodo.value].title = todo.value.title;
        todoList[selectTodo.value].date = todo.value.date;

        if (!(localStorage.getItem('id') === null)
            && selectTodo.value === JSON.parse(localStorage.getItem('id')!)
        ) {
            localStorage.setItem('first', JSON.stringify(todoList[selectTodo.value]));
        }
    }
    todo.value.title = '';
    todo.value.date = '';
    currTab.value = 'list';
    tabs[currTab.value].optional = 'default';

    // console.log(todo.value);
}

provide('id', id);
provide('todoList', todoList);
provide('todo', todo);
provide('doneTodo', doneTodo);
provide('currTab', currTab);
provide('tabs', tabs);
provide('selectTodo', selectTodo);

</script>

<template>
    <div class="container">
        <header>
            <div class="title">Star Todo List</div>
        </header>
        <myNav v-if="currTab === 'list'">
            <template #nav-slot-1>
                <div id="myNav" @click="handleAdd">新增</div>
            </template>
            <template #nav-slot-2>
                <div id="myNav" @click="handleEdit">编辑</div>
            </template>
            <template #nav-slot-3>
                <div id="myNav" @click="handleDelete">删除</div>
            </template>
        </myNav>
        <main>
            <KeepAlive>
                <component :is="tabs[currTab].component"></component>
            </KeepAlive>
        </main>
        <footer>
            <div @click="handleTab">
                <img :src="tabs[currTab].icon?.href" alt="icon">
            </div>
            <div>
                <div v-if="currTab === 'home'" @click="handleDone">完成</div>
                <div v-else-if="currTab === 'list'" @click="handleFirst">先行</div>
                <div v-else @click="handleEnter">确定</div>
            </div>
        </footer>
    </div>
</template>

<style lang="less">
.container {
    width: 100%;
    height: 100vh;

    #myNav {
        cursor: pointer;
    }

    header,
    footer {
        display: grid;
        place-items: center;

        position: fixed;

        height: 10dvh;
        width: 100%;
        background-color: #222;
        z-index: 9999;

        color: rgb(230, 230, 230);
        font-weight: 700;
    }

    header {
        top: 0;

        font-size: 24px;
    }

    footer {
        bottom: 0;

        font-size: 18px;

        grid-template-columns: repeat(2, 1fr);

        div {
            cursor: pointer;
        }
    }

    main {
        width: 100%;
        height: 80vh;
        padding-top: 10dvh;
        padding-bottom: 10dvh;
        background-color: #515660;
    }
}
</style>