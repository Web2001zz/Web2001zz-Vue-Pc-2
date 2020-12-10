import { reqLogin, reqRegister } from '../../api/user';

export default {
  state: {
    //登陆获取的name和token初始为空字符串
    name: localStorage.getItem("name") || '',
    token: localStorage.getItem("name") || ''
  },
  getters: {},
  actions: {
    //登陆请求
    async login ({ commit }, { phone, password }) {
      const user = await reqLogin(phone, password);
      commit('REQ_LOGIN', user);
    },

    async register ({ commit }, { phone, password, code }) {
      await reqRegister({ phone, password, code })
      console.log({ commit }, { phone, password, code }); 
    }

  },
  mutations: {
    //将登陆成功返回的name和token添加到state中
    REQ_LOGIN (state, user) {
      state.name = user.name;
      state.token = user.token;
    }
  }
};
