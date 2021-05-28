import { createApp } from 'vue';
import App from './App.vue'
import { applyPolyfills, defineCustomElements } from '@inovex.de/elements/dist/loader';
import { addIcons } from '@inovex.de/elements/dist/collection/util/icons';
import { ICON_PATHS } from '@inovex.de/elements/dist/inovex-elements/ino-icon/index.esm.js';

addIcons(ICON_PATHS);

const app = createApp(App);

applyPolyfills().then(() => {
  defineCustomElements().then(() => {
    app.mount('#app');
  });
});
