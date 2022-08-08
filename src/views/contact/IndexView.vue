<template>
  <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
    <el-form-item label="twitter" prop="twitter">
      <el-input v-model="form.twitter"/>
    </el-form-item>
    <el-form-item label="telegram" prop="telegram">
      <el-input v-model="form.telegram"/>
    </el-form-item>
    <el-form-item label="email" prop="email">
      <el-input v-model="form.email"/>
    </el-form-item>
    <el-form-item>
      <el-button icon="refresh" @click="find">刷新</el-button>
      <el-button type="primary" @click="edit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { findContact, editContact } from '@/server/api'

export default {
  name: 'ContactView',
  data () {
    return {
      loading: false,
      form: {
        twitter: '',
        telegram: '',
        email: ''
      },
      rules: {
        twitter: [{ required: true }],
        telegram: [{ required: true }],
        email: [{ required: true }]
      }
    }
  },
  watch: {
    form: {
      handler (val, oldVal) {
        console.log('c changed')
      },
      deep: true
    }
  },
  created () {
    this.find()
  },
  methods: {
    find () {
      this.loading = true
      findContact().then(data => {
        this.form.twitter = data.twitter
        this.form.telegram = data.telegram
        this.form.email = data.email
      }).catch().finally(() => {
        this.loading = false
      })
    },
    edit () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        editContact(this.form).then(() => {
          this.$message({
            message: '联系方式保存成功!',
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

<style scoped>

</style>
