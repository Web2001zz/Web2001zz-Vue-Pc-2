<template>
  <div>
    <header>
      <div class="header-top">
        <div class="header-topBG">
          <div class="header-top-left">
            <h2>尚品汇奥利给!</h2>
            <p v-if="$store.state.user.token">
              欢迎您：{{$store.state.user.name}}
              <span>退出登录</span>
            </p>
            <p v-else>
              请 <router-link to="/login">登录</router-link>
              <router-link to="/register">免费注册</router-link>
            </p>
          </div>
          <ul class="header-top-right">
            <li><a>我的订单</a></li>
            <li><a>我的购物车</a></li>
            <li><a href="###">我的尚品汇</a></li>
            <li><a href="###">尚品汇会员</a></li>
            <li><a href="###">企业采购</a></li>
            <li><a href="###">关注尚品汇</a></li>
            <li><a href="###">合作招商</a></li>
            <li><a href="###" class="clear-border">商家后台</a></li>
          </ul>
        </div>
      </div>
      <div class="header-main">
        <div class="header-img">
          <router-link to="/"
            ><img src="./images/logo.png" alt=""
          /></router-link>
        </div>
        <div class="header-search">
          <input type="text" placeholder="请输入商品关键词" />
          <button @click="search">搜索</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'Header',

  methods: {
    search() {
      this.$router.push('/search')
    },
  },
}
</script>

<style lang="less" scoped>
.clear-border {
  border: none !important;
}
header {
  width: 100%;
  .header-top {
    width: 100%;
    background-color: #ccc;
  }
}
.header-topBG {
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
.header-top-left {
  /* border: 1px solid black; */
  height: 24px;
  line-height: 24px;
  display: flex;
  align-items: center;
  h2 {
    margin-right: 20px;
    font-size: 12px;
    font-weight: 500;
  }
  a {
    margin: 0 5px;
    font-size: 12px;
  }
}
.header-top-right {
  height: 24px;
  display: flex;
  li {
    line-height: 24px;
    a {
      display: inline-block;
      margin-left: 10px;
      padding-right: 10px;
      line-height: 24px;
      border-right: 1px solid black;
      height: 12px;
      line-height: 12px;
    }
  }
}
.header-main {
  width: 1200px;
  margin: 0 auto;
  height: 100px;
  background: #fff;
  /* border: 1px solid black; */
  display: flex;
  justify-content: space-between;
  line-height: 100px;
  img {
    vertical-align: middle;
  }
}
.header-search {
  input {
    height: 28px;
    width: 500px;
    border: 2px solid #ea4a36;
    border-radius: 5px 0px 0px 5px;
  }
  button {
    height: 32px;
    width: 68px;
    background-color: #ea4a36;
    border: none;
    color: #fff;
    cursor: pointer;
    border-radius: 0px 5px 5px 0px;
  }
}
</style>
