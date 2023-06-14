import { createStore } from 'vuex'

import authModul from './login/index'
import productModul from './product/index'

import axios from 'axios'

export default createStore({
  state: {
    url: 'http://127.0.0.1:8000/',
    categories: [
      {id: 1,name: 'Category 1'},
      {id: 2,name: 'Category 2'},
      {id: 3,name: 'Category 3'},
    ]
  },
  mutations: {
  },
  actions: {
    
  },
  modules: {
    authModul,
    productModul,

  }
})
