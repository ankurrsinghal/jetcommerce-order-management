import Vue from 'vue'
import VueRouter from 'vue-router'

import Start from './components/Start'
import Home from './components/Home'
import Order from './components/Order'

Vue.use(VueRouter)

const routes = [
  { path: '/start', component: Start, name: 'Start' },
  { path: '/', component: Home, name: 'Home' },
  { path: '/orders', component: Order, name: 'Order' }
]

export default new VueRouter({ routes })
