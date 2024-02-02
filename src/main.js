import './assets/styles.css'
import 'primevue/resources/themes/lara-dark-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from 'primevue/dialog';
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.persistState();
});

createApp(App)
    .use(pinia)
    .use(PrimeVue)
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Dialog', Dialog)
    .mount('#app')
