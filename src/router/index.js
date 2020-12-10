import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home'
import Search from '../views/Search'


export default new VueRouter({
  //使用history模式
  mode: 'history',

  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      name: "search",
      path: "/search",
      component: Search
    }
  ]
});
