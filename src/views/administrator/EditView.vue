<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'administratorList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="form.id" disabled/>
      </el-form-item>
      <el-form-item label="账号" prop="userName">
        <el-input v-model="form.userName" disabled/>
      </el-form-item>
      <el-form-item label="密码" prop="userPwd">
        <el-input v-model="form.userPwd"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editAdmin } from '@/server/http/api'

export default {
  name: 'EditView',
  props: {
    administrator: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      loading: false,
      imageUrl: '',
      form: {
        id: '',
        userName: '',
        userPwd: ''
      },
      rules: {
        userPwd: [{ required: true }]
      }
    }
  },
  created () {
    this.form.id = this.administrator.id
    this.form.userName = this.administrator.userName
  },
  methods: {
    edit () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        editAdmin(this.form).then(() => {
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
