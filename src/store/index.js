import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
  user: {
    name: '',
    role: null
  }
}

const mutations = {
  CHANGEUSER(state, obj){
    state.user.name = obj.name;
    state.user.role = obj.role;
  }
}

const actions = {
}

export default new Vuex.Store({
	state,
	actions,
	mutations
});