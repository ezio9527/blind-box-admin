<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'administratorList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName"/>
      </el-form-item>
      <el-form-item label="昵称" prop="nickName">
        <el-input v-model="form.nickName"/>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input v-model="form.userPwd"/>
      </el-form-item>
      <el-form-item>
        <el-button icon="refresh" @click="resetFields">重置</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addAdmin } from '@/server/api'

export default {
  name: 'AddView',
  data () {
    return {
      loading: false,
      imageUrl: '',
      form: {
        userName: '',
        userPwd: '',
        nickName: ''
      },
      rules: {
        userName: [{ required: true }],
        userPwd: [{ required: true }],
        nickName: [{ required: true }]
      }
    }
  },
  methods: {
    resetFields () {
      this.$refs.form.resetFields()
    },
    add () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        addAdmin(this.form).then(() => {
          this.$message({
            message: '管理员保存成功!',
            type: 'success'
          })
        }).catch(e => {
          this.$message({
            message: e,
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
