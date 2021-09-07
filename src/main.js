import { createApp } from 'vue';
import { ElementsVue } from './elements-vue';

import App from './App.vue'

const app = createApp(App).use(ElementsVue)
app.mount('#app');
