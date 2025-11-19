import { createApp } from 'vue';
import App from './App.vue';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';

import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';
import InputMask from 'primevue/inputmask';
import Panel from 'primevue/panel';
import Divider from 'primevue/divider';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Toast from 'primevue/toast';

import CopyToClipboardPlugin from './plugins/copyToClipboard';

import 'primevue/resources/themes/lara-light-blue/theme.css'; /* ✔ ТЕМА */
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import './style.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);
app.use(CopyToClipboardPlugin);

app.component('Button', Button);
app.component('Card', Card);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Checkbox', Checkbox);
app.component('Textarea', Textarea);
app.component('InputMask', InputMask);
app.component('Panel', Panel);
app.component('Divider', Divider);
app.component('Accordion', Accordion);
app.component('AccordionTab', AccordionTab);
app.component('Toast', Toast);

app.mount('#app');
