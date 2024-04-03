import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');