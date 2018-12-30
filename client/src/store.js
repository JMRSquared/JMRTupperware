import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const BASEURL = 'http://localhost:3020';
export default new Vuex.Store({
  state: {
    tupperwares: []
  },
  mutations: {
    setTupperwares(state, tupperwares) {
      tupperwares.map(t => {
        t.selected = false;
        return t;
      });
      state.tupperwares = state.tupperwares.concat(tupperwares.filter(v => !state.tupperwares.find(t => t._id == v._id)));
    }
  },
  actions: {
    getTupperwares({
      commit
    }, args) {
      axios.get(`${BASEURL}/s/get/tupperware/${args.take}/${args.skip}`).then(results => {
        if (results.status == 200) {
          commit('setTupperwares', results.data)
        } else {
          throw results.status + " " + results.statusText
        }
      }).catch(err => {
        console.log('Error', err);
      });
    }
  }
})