<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'noticeList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="1">通知公告</el-radio>
          <el-radio label="2">操作指南</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" :autosize="{ minRows: 10, maxRows: 100 }" v-model="form.content"/>
      </el-form-item>
      <el-form-item>
        <el-button icon="refresh" @click="resetFields">重置</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addNotice } from '@/server/api'

export default {
  name: 'AddView',
  data () {
    return {
      loading: false,
      form: {
        type: '1',
        title: '',
        content: ''
      },
      rules: {
        title: [{ required: true }],
        content: [{ required: true }]
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
        addNotice(this.form).then(() => {
          this.$message({
            message: '通知公告保存成功!',
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
