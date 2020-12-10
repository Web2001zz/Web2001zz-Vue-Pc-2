<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <router-link to="/login">登陆</router-link>
        </span>
      </h3>
      <div class="content">
        <ValidationProvider rules="length|phone|required" v-slot="{ errors }">
          <label>手机号:</label>
          <input
            type="text"
            placeholder="请输入你的手机号"
            v-model="user.phone"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <ValidationProvider rules="requiredcode" v-slot="{ errors }">
          <label>验证码:</label>
          <input type="text" placeholder="请输入验证码" v-model="user.code" />
          <img
            ref="code"
            src="http://182.92.128.115/api/user/passport/code"
            alt="code"
            @click="updateCode"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <ValidationProvider
          name="password"
          rules="passwordLength"
          v-slot="{ errors }"
        >
          <label>登录密码:</label>
          <input
            type="password"
            placeholder="请输入你的登录密码"
            v-model="user.password"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="content">
        <ValidationProvider
          name="repassword"
          rules="repassword:@password"
          v-slot="{ errors }"
        >
          <label>确认密码:</label>
          <input
            type="password"
            placeholder="请输入确认密码"
            v-model="user.repassword"
          />
          <span class="error-msg">{{ errors[0] }}</span>
        </ValidationProvider>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isOK" />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">错误提示信息</span>
      </div>
      <div class="btn">
        <button @click="submit">完成注册</button>
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

extend('required', {
  ...required,
  message: '请输入手机号',
})

extend('length', {
  validate(value) {
    return value.length === 11
  },
  message: '手机号必须为11位',
})

extend('phone', {
  validate(value) {
    return /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/.test(
      value
    )
  },
  message: '必须是手机号格式',
})

extend('requiredcode', {
  ...required,
  message: '请输入验证码',
})

extend('passwordLength', {
  validate(value) {
    return value.length >= 6 && value.length <= 14
  },
  message: '密码设置必须大于6位小于14位',
})

extend('repassword', {
  params: ['password'],
  validate(value, { password }) {
    return value === password
  },
  message: '两次密码输入必须一致',
})

export default {
  name: 'Register',

  data() {
    return {
      user: {
        phone: '',
        password: '',
        code: '',
        repassword: '',
      },
      isOK: false,
    }
  },

  methods: {
    //提交注册
    async submit() {
      try {
        const { phone, password, code, repassword } = this.user
        if (!this.isOK) {
          alert('请同意用户协议！')
          return
        }
        if (password !== repassword) {
          alert('两次密码输入不一致！')
          return
        }
        await this.$store.dispatch('register', { phone, password, code })

        this.$router.push('/login')
      } catch {
        this.user.password = ''
        this.user.code = ''
        this.user.repassword = ''
        this.updateCode()
        alert('注册失败')
      }
    },
    //刷新验证码
    updateCode() {
      this.$refs.code.src = 'http://182.92.128.115/api/user/passport/code'
    },
  },

  components: {
    ValidationProvider,
  },
}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
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