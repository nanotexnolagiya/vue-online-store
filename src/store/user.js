import firebase from 'firebase'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null,
    auth: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload.user
    },
    setAuth (state, payload) {
      state.auth = payload.auth
    }
  },
  actions: {
    async signup ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', { loading: true })
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        commit('setUser', { user: new User(user.uid) })
        commit('setLoading', { loading: false })
      } catch (error) {
        commit('setError', { error: error.message })
        commit('setLoading', { loading: false })
        throw error
      }
    },
    async login ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', { loading: true })
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        commit('setUser', { user: new User(user.uid) })
        commit('setLoading', { loading: false })
      } catch (error) {
        commit('setError', { error: error.message })
        commit('setLoading', { loading: false })
        throw error
      }
    },
    autoLoginUser ({ commit }, payload) {
      commit('setUser', {user: new User(payload.user.uid)})
    },
    logoutUser ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', {user: null})
    },
    setAuth ({ commit }, payload) {
      commit('setAuth', payload)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLogIn (state) {
      return state.user !== null
    },
    auth (state) {
      return state.auth
    }
  }
}
