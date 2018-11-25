import firebase from 'firebase'

class Product {
  constructor (title, color, price, description, promo = false, image = '', id = null) {
    this.title = title
    this.color = color
    this.price = price
    this.description = description
    this.promo = promo
    this.image = image
    this.id = id
  }
}

export default {
  state: {
    products: []
  },
  mutations: {
    createProduct (state, payload) {
      state.products.push(payload.product)
    },
    loadProducts (state, payload) {
      state.products = payload.products
    }
  },
  actions: {
    async createProduct ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', {loading: true})
      const image = payload.product.image
      try {
        const newProduct = new Product(
          payload.product.title,
          payload.product.color,
          payload.product.price,
          payload.product.description,
          payload.product.promo,
          ''
        )
        const product = await firebase.database().ref('products').push(newProduct)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const fileData = await firebase.storage().ref(`products/${product.key}.${imageExt}`).put(image)
        const imageLink = await firebase.storage().ref().child(fileData.ref.fullPath).getDownloadURL()
        await firebase.database().ref('products').child(product.key).update({image: imageLink})
        payload.product = {...newProduct, id: product.key, image: imageLink}
        commit('setLoading', { loading: false })
        commit('createProduct', payload)
      } catch (error) {
        commit('setError', { error: error.message })
        commit('setLoading', { loading: false })
        throw error
      }
    },
    async fetchProducts ({ commit }) {
      commit('clearError')
      commit('setLoading', true)
      const products = []
      try {
        const productsVal = await firebase.database().ref('products').once('value')
        const resultProducts = productsVal.val()
        Object.keys(resultProducts).forEach(key => {
          const product = resultProducts[key]
          products.push(
            new Product(
              product.title,
              product.color,
              product.price,
              product.description,
              product.promo,
              product.image,
              key
            )
          )
          commit('loadProducts', { products })
          commit('setLoading', false)
        })
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    getProducts (state) {
      return state.products
    },
    promoProducts (state) {
      return state.products.filters(product => {
        return product.promo
      })
    },
    productById (state) {
      return productId => {
        return state.products.find(product => product.id === productId)
      }
    }
  }
}
