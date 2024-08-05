import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import axios from "axios";

let emitter = mitt();
let app = createApp(App)
app.config.globalProperties.emitter = emitter; // app.config.globalProperties : 글로벌한 변수보관함
app.config.globalProperties.axios = axios;

app.mount('#app')
