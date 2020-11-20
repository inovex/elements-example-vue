import { createApp } from 'vue'
import App from './App.vue'
import { applyPolyfills, defineCustomElements } from '@inovex.de/elements/dist/loader';

applyPolyfills().then(() => defineCustomElements());

createApp(App).mount('#app')
