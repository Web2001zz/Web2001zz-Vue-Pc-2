import Vue from 'vue';
import App from './App.vue';

//引入路由与vuex
import store from './store';
import router from './router';

//引入公共样式
import './style/iconfont.css';
import './style/reset.css';

//取消提示
Vue.config.productionTip = false;

new Vue({
	//创建全局事件总线
	beforeCreate() {
		Vue.prototype.$bus = this;
	},
	render: (h) => h(App),
	router,
	store
}).$mount('#app');
