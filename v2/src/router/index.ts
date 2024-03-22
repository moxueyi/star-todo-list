import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TodoListView from '../views/TodoListView.vue';
import About from '../views/About.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: TodoListView,
    },
    {
        path: '/about',
        name: 'about',
        component: About,
    }

];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

export default router;