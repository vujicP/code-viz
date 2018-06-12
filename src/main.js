import Vue from 'vue'

import store from './store/store.js'
import App from './components/CodeVizMain.vue'

import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
Vue.use(Buefy)

var vm = new Vue({
  store,
  el: '#vue-app',
  render: function (createElement) {
    return createElement(App)
  }
})
