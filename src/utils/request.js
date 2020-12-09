// 封装一个拦截器 该拦截器用于
//     1.设置公共请求地址的前缀
//     2.添加公共参数
//     3.响应拦截器
//          成功返回成功的promise和数据，
//          失败返回失败的promise和数据

import axios from 'axios';

//引入进度条插件与样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
	//请求地址的公共参数
	baseURL: '/api',
	//请求头是个空对象
	headers: {}
});

//设置请求拦截器
instance.interceptors.request.use((config) => {
	//开始进度条
	NProgress.start();

	return config;
});

//设置响应拦截器
instance.interceptors.response.use(
	//请求成功时
	(response) => {
		//结束进度条
		NProgress.done();
		//判断响应状态码是否是200
		if (response.data.code === 200) {
			//返回成功的响应数据
			return response.data.data;
		}
		//如果不是200，说明信息错误返回失败信息
		const { message } = response.data;

		console.log(message);

		return Promise.reject(message);
	},
	//请求失败时
	(error) => {
		//结束进度条
		NProgress.done();

		const message = error.message || '网络错误';

		console.log(message);
		return Promise.reject(message);
	}
);

export default instance;
