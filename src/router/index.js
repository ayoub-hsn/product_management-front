import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Login from '../views/login/login.vue'
import showProducts from '../views/products/ShowProducts.vue'






import PageNotFound from '../views/PageNotFaound.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if(localStorage.getItem('token')){
        return next(from)
      }else{
        next()
      }
    }
  },
  
  {
    path: '/products',
    name: 'showProducts',
    component: showProducts,
    props: true,
    beforeEnter: (to, from, next) => {
      if(!store.getters['authModul/authenticated'] && !localStorage.getItem('token')){
        return next({name: 'Login'})
      }
      next()
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'PageNoTFound',
    component: PageNotFound,
  },
  
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
