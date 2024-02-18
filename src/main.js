import './assets/styles.css'
import 'primeicons/primeicons.css'
import 'primevue/resources/themes/lara-dark-green/theme.css'

import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dialog from 'primevue/dialog';
import Toast from "primevue/toast";
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(({ store }) => {
    store.persistState();
});

createApp(App)
    .use(pinia)
    .use(PrimeVue)
    .use(ToastService)
    .component('Button', Button)
    .component('InputText', InputText)
    .component('Dialog', Dialog)
    .component('Toast', Toast)
    .mount('#app')
