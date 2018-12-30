import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const BASEURL = 'http://localhost:3020';
export default new Vuex.Store({
  state: {
    tupperwares: [],
    placedOrder: {
      status: null,
      text: null
    },
    currentAdded: {
      status: null,
      text: null
    },
    currentUser: {
      status: null,
      text: null
    }
  },
  mutations: {
    setTupperwares(state, tupperwares) {
      tupperwares.map(t => {
        t.selected = false;
        return t;
      });
      state.tupperwares = state.tupperwares.concat(tupperwares.filter(v => !state.tupperwares.find(t => t._id == v._id)));
    },
    orderPlaced(state, status) {
      state.placedOrder = status
    },
    login(state, status) {
      state.currentUser = status
    },
    addTupperware(state, status) {
      state.currentAdded = status
    }
  },
  actions: {
    addNewTupperware({
      commit
    }, args) {
      commit('addTupperware', {
        status: null,
        text: 'Loading...'
      });
      axios.post(`${BASEURL}/s/add/new/tupperware`, {
        tupperware: args.tupperware
      }).then(results => {
        if (results.status == 200) {
          commit('addTupperware', {
            status: true,
            text: 'Added'
          });
        } else {
          throw results.status + " " + results.statusText
        }
      }).catch(err => {
        if (err.response != null && err.response.status == 512) {
          commit('addTupperware', {
            status: false,
            text: err.response.data
          });
        } else {
          commit('addTupperware', {
            status: false,
            text: err.message
          });
        }
        console.log('Error', err);
      });
    },

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
    },

    PlaceOrder({
      commit
    }, args) {
      commit('orderPlaced', {
        status: 'PLACING',
        text: 'Your order is being placed'
      });
      axios.post(`${BASEURL}/s/place/order`, {
        user: args.user,
        tupperwareID: args.tupperwareID
      }).then(results => {
        if (results.status == 200) {
          commit('orderPlaced', {
            status: 'PLACED',
            text: results.data
          });
        } else {
          throw results.data + " " + results.status
        }
      }).catch(err => {
        commit('orderPlaced', {
          status: 'FAILED',
          text: err.message
        });
        console.log('Error', err);
      });
    },

    Login({
      commit
    }, args) {
      commit('login', {
        status: null,
        text: 'Loading...'
      });
      axios.post(`${BASEURL}/a/login`, {
        username: args.username,
        password: args.password
      }).then(results => {
        if (results.status == 200) {
          commit('login', {
            status: true,
            text: results.data
          });
        } else {
          throw results.data
        }
      }).catch(err => {
        if (err.response != null && err.response.status == 512) {
          commit('login', {
            status: false,
            text: err.response.data
          });
        } else {
          commit('login', {
            status: false,
            text: err.message
          });
        }
      });
    }
  }
})