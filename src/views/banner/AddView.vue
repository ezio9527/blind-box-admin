<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'bannerList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort"/>
      </el-form-item>
      <el-form-item label="链接" prop="clickUrl">
        <el-input v-model="form.clickUrl"/>
      </el-form-item>
      <el-form-item label="图片" prop="imageUrl">
        <base-image-uploader :image="imageUrl" @success="uploadHandler"></base-image-uploader>
        <div style="margin-left: 20px">建议图片尺寸 345 * 135,长宽比例最好保持不变</div>
      </el-form-item>
      <el-form-item>
        <el-button icon="refresh" @click="resetFields">重置</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBanner } from '@/server/http/api'

export default {
  name: 'AddView',
  data () {
    return {
      loading: false,
      imageUrl: '',
      form: {
        title: '',
        sort: '',
        clickUrl: '',
        imageUrl: ''
      },
      rules: {
        title: [{ required: true }],
        sort: [{ required: true, validator: (rule, val, callback) => !isNaN(val), trigger: 'blur' }],
        clickUrl: [{ required: true }],
        imageUrl: [{ required: true }]
      }
    }
  },
  methods: {
    resetFields () {
      this.imageUrl = ''
      this.$refs.form.resetFields()
    },
    uploadHandler (data) {
      this.form.imageUrl = data
    },
    add () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        addBanner(this.form).then(() => {
          this.$message({
            message: '轮播图添加成功!',
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
