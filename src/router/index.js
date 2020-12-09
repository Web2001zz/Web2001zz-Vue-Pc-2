import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../views/Login';
import Register from '../views/Register';
export default new VueRouter({
	//使用history模式
	mode: 'history',

	routes: [
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		}
	]
});
