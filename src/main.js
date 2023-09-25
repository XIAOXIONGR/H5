import { createApp } from 'vue'
import './style.css'
import router from './router'
import store from './store/store';
import App from './App.vue'

const vue = createApp(App)

vue.use(router);
vue.use(store);
vue.mount("#app");
