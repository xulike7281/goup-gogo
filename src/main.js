import { createApp } from 'vue'
import Root from '@/App'
import router from '@/router'
import { createPinia } from 'pinia'
import i18n from '@/locale'
import Antd from 'ant-design-vue';
// CSS
import 'ant-design-vue/dist/reset.css';
import 'ant-design-vue/es/style/reset.css'
import '@/css/base.css'
import '@/css/transition.scss'
import '@/css/nprogress.scss'
const pinia = createPinia()
const app = createApp(Root)
app.use(router)
app.use(pinia)
app.use(i18n)
app.use(Antd)

app.mount('#app')
