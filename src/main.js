// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
// import firebase from 'firebase'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    // firebase.initializeApp({
    //   apiKey: 'AIzaSyB8ae5jZPs3nyNAoy7DGxwuOvmvwMg1UmI',
    //   authDomain: 'vue-books-6f21c.firebaseapp.com',
    //   databaseURL: 'https://vue-books-6f21c.firebaseio.com',
    //   projectId: 'vue-books-6f21c',
    //   storageBucket: 'vue-books-6f21c.appspot.com',
    //   messagingSenderId: '238349163293'
    // })
    // firebase.auth().onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.dispatch('autoLoginUser', { user })
    //   }
    // })
    this.$store.dispatch('fetchProducts')
  }
})
