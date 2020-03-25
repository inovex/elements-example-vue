import Vue from 'vue'
import App from './App.vue'
import { applyPolyfills, defineCustomElements } from '@inovex/elements/dist/loader';
import { addIcons } from '@inovex/elements/dist/collection/util/icons';
import { ICON_PATHS } from '@inovex/elements/dist/inovex-elements/icon-assets/SVG/index.esm.js';

addIcons(ICON_PATHS);

Vue.config.ignoredElements = [
  /^ino-/ // ignore all web components starting with "ino-"
];

applyPolyfills().then(() => {
  defineCustomElements();
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
