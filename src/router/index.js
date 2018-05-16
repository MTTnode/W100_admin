import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const index = r => require.ensure([], () => r(require('@/page/index')), 'index');
const banner = r => require.ensure([], () => r(require('@/page/banner')), 'banner');
const transaction = r => require.ensure([], () => r(require('@/page/transaction')), 'transaction');
const blacklist = r => require.ensure([], () => r(require('@/page/blacklist')), 'blacklist');
const whitelist = r => require.ensure([], () => r(require('@/page/whitelist')), 'whitelist');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/index',
		component: manage,
		children: [{
			path: '',
			component: index,
			meta: ['数据统计'],
		},{
			path: '/banner',
			component: banner,
			meta: ['banner配置'],
		},{
			path: '/transaction',
			component: transaction,
			meta: ['交易对配置'],
		},{
			path: '/blacklist',
			component: blacklist,
			meta: ['黑名单配置'],
		},{
			path: '/whitelist',
			component: whitelist,
			meta: ['白名单配置'],
		}]
	}
]

export default new Router({
	mode: 'history',
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
