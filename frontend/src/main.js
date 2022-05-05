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
import { faHouseMedical,faChildren,
    faWheelchair, faSeedling, faPaw, faGraduationCap, faCopy,faCaretDown, faHouse, faCirclePlus,faList,faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueClipboard from 'vue3-clipboard'

import filters from "@/filters";
const publicPath = process.env.VUE_APP_NODE_ENV === 'production'
    ? '/ch5-social-good-bounty/'
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

const DONATION_TYPES = {
    'Medicine':{title:"Medicine",className:"badge bg-primary",iconName:"house-medical"},
    'Children':{title:"Children",className:"badge bg-warning",iconName:"children"},
    'Disability':{title:"Disability",className:"badge bg-secondary",iconName:"wheelchair"},
    'Environment':{title:"Environment",className:"badge bg-success",iconName:"seedling"},
    'Animal':{title:"Animal",className:"badge bg-dark",iconName:"paw"},
    'Education':{title:"Education",className:"badge bg-info",iconName:"graduation-cap"},
}

await init();

library.add(faHouseMedical,faChildren,
    faWheelchair,faSeedling,faPaw,faGraduationCap,faCopy,faCaretDown,faHouse,faCirclePlus,faList,faHandHoldingHeart)

let app = createApp(App);
app.config.globalProperties.window = window;
app.config.globalProperties.$DONATION_TYPES = DONATION_TYPES;
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
