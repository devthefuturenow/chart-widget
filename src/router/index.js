import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'

import NotFound from '@/components/NotFound.vue'

import ChartWidget from '@/components/ChartWidget.vue'
Vue.component('ChartWidget', ChartWidget)

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }, {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      auth: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
