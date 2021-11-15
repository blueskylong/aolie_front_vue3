
import {createApp} from 'vue'
import App from './App.vue'
export * from "@/views/sysfunc"
import router from './router'
import {useStore} from './store'
import 'font-awesome/css/font-awesome.min.css';
import 'element-plus/dist/index.css';
export {UiUtils} from "@/common/UiUtils";



createApp(App).use(useStore()).use(router).mount('#app')

