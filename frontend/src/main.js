import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store';
import { router } from './router';
import PrimeVue from 'primevue/config';
import Dropdown from 'primevue/dropdown';
import Menubar from 'primevue/menubar';
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Card from 'primevue/card';
import DataView from 'primevue/dataview';
import DataViewLayoutOptions from 'primevue/dataviewlayoutoptions';
import Sidebar from 'primevue/sidebar';
import OverlayPanel from 'primevue/overlaypanel';




// import 'primevue/resources/themes/lara-light-teal/theme.css';
import 'primevue/resources/themes/saga-green/theme.css ';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.min.css';
import 'primeicons/primeicons.css';

import './assets/scss/global.scss';

const app = createApp(App);


app.use(store);
app.use(router);
app.use(PrimeVue);

app.component('Card', Card);
app.component('DataView', DataView);
app.component('DataViewLayoutOptions', DataViewLayoutOptions);
app.component('Dropdown', Dropdown);
app.component('Menubar', Menubar);
app.component('Toolbar', Toolbar);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Sidebar', Sidebar);
app.component('OverlayPanel', OverlayPanel);


app.mount('#app');
