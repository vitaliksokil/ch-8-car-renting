import { createApp } from 'vue'
import App from './App.vue'
import { createWebHashHistory, createRouter } from "vue-router";
import './assets/scss/app.scss'
import {init} from "@/utils";
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueClipboard from 'vue3-clipboard'

import filters from "@/filters";
const publicPath = process.env.VUE_APP_NODE_ENV === 'production'
    ? '/ch-8-car-renting/'
    : '/';
const routes = [
    { path: publicPath, component: () => import('./components/Pages/HomeComponent'), name:'home'  },
    { path: publicPath + 'cars', component: () => import('./components/Pages/CarsComponent'), name:'cars' },
    { path: publicPath + 'my-cars', component: () => import('./components/Pages/MyCarsComponent'), name:'my-cars',beforeEnter: () => {if (!window.nearAccount.accountId){return { name:'home' }}}, },
    { path: publicPath + 'my-rents', component: () => import('./components/Pages/MyRentsComponent'), name:'my-rents',beforeEnter: () => {if (!window.nearAccount.accountId){return { name:'home' }}}, },
    { path: publicPath + 'create-car', component: () => import('./components/Pages/CreateCarComponent'), name:'create-car',beforeEnter: () => {if (!window.nearAccount.accountId){return { name:'home' }}}, },
    { path: publicPath + 'car/:id', component: () => import('./components/Pages/SingleCarComponent'), name:'car-single' },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
})

await init();

library.add(faCopy)

let app = createApp(App);
app.config.globalProperties.window = window;
app.config.globalProperties.$filters = filters;

app.use(VueLoading);
app.use(VueSweetalert2);
app.use(router);
app.use(VueClipboard,{
    autoSetContainer: true,
    appendToBody: true,
});
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
