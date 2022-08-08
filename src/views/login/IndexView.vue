<template>
  <el-container class="login-view">
    <el-main>
      <div class="login-wrapper">
        <div class="login-banner">
          <div></div>
          <img src="@img/login/banner.png">
        </div>
        <el-form :model="form" :rules="rules" ref="form" size="large">
          <h3>欢迎来到 疯狂盲盒 后台管理 ! 👋🏻</h3>
          <el-form-item prop="userName">
            <el-input v-model="form.userName" size="large" prefix-icon="User"/>
          </el-form-item>
          <el-form-item prop="userPwd">
            <el-input v-model="form.userPwd" size="large" prefix-icon="lock" type="password" show-password/>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="remember" label="记住密码" name="type"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loading="loading">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import { login } from '@/server/api'

export default {
  name: 'LoginView',
  data () {
    return {
      loading: false,
      remember: false,
      form: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 15, message: '用户名长度3-15', trigger: 'blur' }
        ],
        userPwd: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 15, message: '密码长度3-15', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    remember (val) {
      if (val) {
        localStorage.setItem('username', this.form.userName)
        localStorage.setItem('password', this.form.userPwd)
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
    }
  },
  created () {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if (username) {
      this.form.userName = username
      this.form.userPwd = password
      this.remember = true
    }
  },
  methods: {
    onSubmit () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        login(this.form).then(data => {
          localStorage.setItem('username', this.form.userName)
          localStorage.setItem('token', data.toString())
          this.$router.push({ name: 'home' })
        }).catch(e => {
          this.$message({
            message: e.msg,
            type: 'error'
          })
        }).finally(() => {
          this.loading = false
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-view {
  background: radial-gradient(circle at center,var(--el-fill-color-lighter),var(--el-bg-color-page));
  .login-wrapper {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%) translateY(-50%);
    background-color: var(--el-bg-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow);
    .login-banner {
      position: relative;
      width: 450px;
      background-color: var(--el-fill-color-light);
      overflow: hidden;
      padding: 50px 0;
      img {
        width: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
      div {
        position: absolute;
        top: 20px;
        left: 20px;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        background: url(../../assets/images/logo.png) no-repeat;
        background-size: contain;
        box-shadow: var(--el-box-shadow-light);
        z-index: 1;
      }
    }
    .el-form {
      width: 500px;
      padding: 50px;
      h3 {
        font-size: 1.3em;
        color: var(--el-text-color-primary);
        margin: 0 auto 30px;
        font-weight: 700;
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>
