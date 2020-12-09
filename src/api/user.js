import request from '../utils/request';

//发送登陆请求 参数phone password
export const reqLogin = (phone, password) => {
	return request({
		method: 'POST',
		url: '/user/passport/login',
		data: {
			phone,
			password
		}
	});
};
