import store from '../store'

const isUser = (to, from, next) => {
  if (store.getters.isUserLogIn) {
    next()
  } else {
    next('/login?loginError=true')
  }
}

const guest = (to, from, next) => {
  if (!store.getters.isUserLogIn) {
    next()
  } else {
    next('/')
  }
}

export default {
  isUser,
  guest
}
