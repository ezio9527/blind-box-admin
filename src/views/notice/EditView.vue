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
        <el-button type="primary" @click="edit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editNotice, findNoticeById } from '@/server/http/api'

export default {
  name: 'EditView',
  props: {
    id: String
  },
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
  created () {
    this.findById(this.id)
  },
  methods: {
    findById (id) {
      this.loading = true
      findNoticeById({ id }).then(data => {
        this.form = data
        this.form.type = data.type.toString()
      }).catch(e => {
        this.$message({
          message: e,
          type: 'error'
        })
      }).finally(() => {
        this.loading = false
      })
    },
    edit () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        editNotice(this.form).then(() => {
          this.$message({
            message: '保存成功!',
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
