import * as api from './api.js'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = {

    closest_connections: [],   //todo: store history for this variable for undo/redo in network viz
    concept_provenance: []        
}


const mutations = {

    'API_FAIL': (state, error) => { console.error(error) },

    'SET_CLOSEST_CONNECTIONS': (state, data) => { state.closest_connections = data },
    'SET_CODE_PROVENANCE': (state, data) => { state.concept_provenance = data }
}


const actions = { 

  getCodeProvenance (store, codeid) {

    api.fetchCodeProvenance(codeid)
    .then(response => store.commit('SET_CODE_PROVENANCE', response.data))
  },

  getClosestConnections (store, { hops, codeid }){

    api.fetchClosestConnections(codeid) //todo: handle hops in backend
    .then(response => store.commit('SET_CLOSEST_CONNECTIONS', response.data))
  }
}


const getters = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store