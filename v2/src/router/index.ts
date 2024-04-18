import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TodoListView from '../views/TodoListView.vue';
import About from '../views/About.vue';

const whileList = ['/', '/about'];

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: TodoListView,
    }, {
        path: '/about',
        name: 'about',
        component: About,
    }, {
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue'),
    }

];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, _from, next) => {
    // 检查用户是否已登录
    const isLoggedIn = JSON.parse(localStorage.getItem('token')!)['token'];
    // console.log(to.path);
    // console.log(isLoggedIn);
    

    if (!whileList.includes(to.path) || isLoggedIn !== null) {
        next();
    } else {
        next({
            path: '/login',
        });
    }
})

export default router;