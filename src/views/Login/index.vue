<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form action="##" @submit.prevent="submit">
              <ValidationProvider
                rules="length|required|phone"
                v-slot="{ errors }"
              >
                <div class="input-text clearFix">
                  <span></span>
                  <input
                    type="text"
                    placeholder="邮箱/用户名/手机号"
                    v-model="user.phone"
                  />
                  <p style="color: red">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
              <ValidationProvider rules="passwordlengh" v-slot="{ errors }">
                <div class="input-text clearFix">
                  <span class="pwd"></span>
                  <input
                    type="password"
                    placeholder="请输入密码"
                    v-model="user.password"
                  />
                  <p style="color: red">{{ errors[0] }}</p>
                </div>
              </ValidationProvider>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input
                    name="m1"
                    type="checkbox"
                    value="2"
                    checked=""
                    v-model="isAutoLogin"
                  />
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" type="submit">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt="" /></li>
                <li><img src="./images/sina.png" alt="" /></li>
                <li><img src="./images/ali.png" alt="" /></li>
                <li><img src="./images/weixin.png" alt="" /></li>
              </ul>
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationProvider, extend } from 'vee-validate'
import { required } from 'vee-validate/dist/rules'
import { mapState } from 'vuex'

extend('required', {
  ...required,
  message: '手机号必须填写',
})

extend('length', {
  validate(value) {
    return value.length === 11
  },
  message: '手机号长度必须为11位',
})

extend('phone', {
  validate(value) {
    return /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
      value
    )
  },
  message: '手机号不符合规范',
})

extend('passwordlengh', {
  validate(value) {
    return value.length >= 6 && value.length <= 12
  },
  message: '请输入6——12位密码',
})

export default {
  name: 'Login',

  data() {
    return {
      user: {
        phone: '',
        password: '',
      },

      isAutoLogin: true, //是否自动登录
      isLoading: false, //判断是否正在登录
    }
  },

  //用户选择自动登录后 下次登录会在创建阶段跳转
  created() {
    //判断是否有token
    if (this.token) {
      this.$router.replace('/')
    }
  },
  //获取登录成功后的token和name
  computed: {
    //获取登陆成功后请求回来的token和name
    ...mapState({
      token: (state) => state.user.token,
      name: (state) => state.user.name,
    }),
  },

  methods: {
    async submit() {
      try {
        //先判断是否正在登陆 防止用户点击次数过多引起重复发送请求
        if (this.isLoading) return
        this.isLoading = true
        //1.提取输入的电话和密码
        const { phone, password } = this.user
        //2.调用actions中的login方法发送请求
        await this.$store.dispatch('login', { phone, password })

        console.log(this.token, this.name)

        //将token和name放进缓存中
        if (this.isAutoLogin) {
          localStorage.setItem('token', this.token)
          localStorage.setItem('name', this.name)
        }

        //跳转到home界面
        this.$router.push('/')
      } catch {
        this.isLoading = false
      }
    },
  },

  components: {
    ValidationProvider,
  },
}
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 406px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #ddd;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(./images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>