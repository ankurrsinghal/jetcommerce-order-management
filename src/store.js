import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import { oToA, aToO } from './utils'

Vue.use(Vuex)

const API_URL = 'https://express-practice-peyziskehs.now.sh'

const store = new Vuex.Store({
  state: {
    currentUser: null,
    products: {},
    cart: {},
    orders: [],
    signInStatus: 'freeze',
    signUpStatus: 'freeze',
    orderCreationStatus: 'freeze',
    orderLoadingStatus: 'freeze',
    productsLoadingStatus: 'freeze',
    signUpErrors: null
  },
  getters: {
    products: (state) => {
      return oToA(state.products)
    },
    cart: (state) => {
      return oToA(state.cart)
    },
    isAuthenticated: state => {
      return !!state.currentUser
    },
    orders: state => state.orders
  },
  mutations: {
    changeAuthState (state, { token }) {
      state.currentUser = { token }
      window.localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    },
    setProducts (state, { products }) {
      // add a deafult quantity to 0
      products.forEach(p => {
        p['quantity'] = 0
      })
      state.products = aToO(products, '_id')
    },
    addItemToCart (state, { product }) {
      if (state.cart[product._id]) {
        Vue.set(state.cart[product._id], 'quantity', state.cart[product._id].quantity + 1)
      } else {
        Vue.set(state.cart, product._id, product)
      }
    },
    removeItemFromCart (state, { product }) {
      delete state.cart[product._id]
    },
    logout (state) {
      window.localStorage.removeItem('currentUser')
      state.currentUser = null
    },
    setOrders (state, { orders }) {
      state.orders = orders
    },
    addToOrders (state, { order }) {
      state.orders.unshift(order)
    },
    clearCart (state) {
      state.cart = {}
    },
    signInStatus (state, { status }) {
      state.signInStatus = status
    },
    signUpStatus (state, { status, errors }) {
      state.signUpErrors = errors
      state.signUpStatus = status
    },
    orderCreationStatus (state, { status }) {
      state.orderCreationStatus = status
    },
    orderLoadingStatus (state, { status }) {
      state.orderLoadingStatus = status
    },
    productsLoadingStatus (state, { status }) {
      state.productsLoadingStatus = status
    }
  },
  actions: {
    async signIn ({ commit }, { email, password }) {
      commit('signInStatus', { status: 'requesting' })
      const res = await axios.post(`${API_URL}/signin`, { email, password })
      if (res.data.token) {
        commit('signInStatus', { status: 'success' })
        commit('changeAuthState', res.data)
      } else {
        commit('signInStatus', { status: 'failed' })
      }
    },
    async signUp ({ commit }, { email, password, name }) {
      commit('signUpStatus', { status: 'requesting' })
      const res = await axios.post(`${API_URL}/signup`, { email, password, name })
      if (res.data.token) {
        commit('signUpStatus', { status: 'success' })
        commit('changeAuthState', res.data)
      } else {
        commit('signUpStatus', { status: 'failed', errors: res.data.errors })
      }
    },
    async getProducts ({ commit, state }) {
      commit('productsLoadingStatus', { status: 'requesting' })
      const res = await axios.get(`${API_URL}/products`, {
        headers: {
          'authorization': state.currentUser.token
        }
      })
      commit('productsLoadingStatus', { status: 'success' })
      commit('setProducts', res.data)
    },
    async getOrders ({ commit, state }) {
      commit('orderLoadingStatus', { status: 'requesting' })
      const res = await axios.get(`${API_URL}/orders`, {
        headers: {
          'authorization': state.currentUser.token
        }
      })
      commit('orderLoadingStatus', { status: 'success' })
      commit('setOrders', res.data)
    },
    async createOrder ({ commit, state, getters }) {
      commit('orderCreationStatus', { status: 'requesting' })
      const res = await axios.post(`${API_URL}/orders`, {
        items: getters.cart
      }, {
        headers: {
          'authorization': state.currentUser.token
        }
      })
      if (res.data === 'ok') {
        commit('orderCreationStatus', { status: 'success' })
        commit('clearCart')
      }
    },
    checkAuth ({ commit }) {
      try {
        const currentUser = JSON.parse(window.localStorage.getItem('currentUser')) || null
        if (currentUser && currentUser.token) {
          commit('changeAuthState', currentUser)
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
})

export default store
