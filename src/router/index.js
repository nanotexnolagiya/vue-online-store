import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Signup from '@/components/Auth/Signup'
import Home from '@/components/Home'
import NewProduct from '@/components/Products/Create'
import ProductsList from '@/components/Products/List'
import ProductsSingle from '@/components/Products/Single'
import Cart from '@/components/Cart'
import AuthGuard from './auth-guard'
import store from '../store'
import firebase from 'firebase'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: AuthGuard.guest
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
      beforeEnter: AuthGuard.guest
    },
    {
      path: '/products',
      name: 'products',
      component: ProductsList,
      beforeEnter: AuthGuard.isUser
    },
    {
      path: '/products/new',
      name: 'newProduct',
      component: NewProduct,
      beforeEnter: AuthGuard.isUser
    },
    {
      path: '/products/:id',
      name: 'product',
      props: true,
      component: ProductsSingle,
      beforeEnter: AuthGuard.isUser
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
      beforeEnter: AuthGuard.isUser
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  store.dispatch('setLoading', {loading: true})
  if (!store.getters.auth) {
    firebase.initializeApp({
      apiKey: 'AIzaSyB8ae5jZPs3nyNAoy7DGxwuOvmvwMg1UmI',
      authDomain: 'vue-books-6f21c.firebaseapp.com',
      databaseURL: 'https://vue-books-6f21c.firebaseio.com',
      projectId: 'vue-books-6f21c',
      storageBucket: 'vue-books-6f21c.appspot.com',
      messagingSenderId: '238349163293'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        store.dispatch('autoLoginUser', { user })
        store.dispatch('setAuth', { auth: true })
        store.dispatch('setLoading', {loading: false})
        next()
      } else {
        store.dispatch('setLoading', {loading: false})
        next()
      }
    })
  } else {
    store.dispatch('setLoading', {loading: false})
    next()
  }
})

export default router
