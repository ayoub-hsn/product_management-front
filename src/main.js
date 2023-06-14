import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import VueFeather from 'vue-feather';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import LoadScript from "vue-plugin-load-script";
import Vuesax from 'vuesax3'
import 'vuesax3/dist/vuesax.css'
import Select2 from 'vue3-select2-component';
import axios from 'axios'



axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

require('./store/subscriber')





      





import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

import Toaster from '@meforma/vue-toaster';

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';



  library.add(fas)


  store.dispatch('authModul/attempt',localStorage.getItem('token')).then(() => {

  createApp(App).use(store).use(router)
  .use(Vuesax)
  .use(LoadScript)
  .use(Toaster)
  .use(VueSweetalert2,options)
  .use(Antd)
  .component('fa',FontAwesomeIcon)
  .component(VueFeather.name, VueFeather)
  .component('EasyDataTable', Vue3EasyDataTable)
  .component('Select2', Select2)
  .mount('#app')
  
})












