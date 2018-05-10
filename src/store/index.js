import Vue from 'vue'
import Vuex from 'vuex'
import Api from "../api/api.js"

Vue.use(Vuex)

const state = {
	isLogin: false,
	exchangeItem: {},
	adminInfo: {}
}

const mutations = {
	changeIsLogin(state, val){
		state.isLogin = val;
	},
	changeExchangeItem(state, obj) {
		this.state.exchangeItem = Object.assign({}, obj);
	},
	saveAdminInfo(state, adminInfo){
		state.adminInfo = adminInfo;
	}
}

const actions = {
	async getAdminData({commit}){
		Api.getUserInfoRequest().then(function(res) {
			if(res.status == 200) {
				commit('saveAdminInfo', res.data);
			}
		}).catch(function(err){
			console.log('您尚未登陆或者session失效')
		})
	}
}

export default new Vuex.Store({
	state,
	actions,
	mutations,
})