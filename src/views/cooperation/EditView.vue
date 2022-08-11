<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'cooperationList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio label="1">机构合作</el-radio>
          <el-radio label="2">入驻项目方</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="链接" prop="clickUrl">
        <el-input v-model="form.clickUrl"/>
      </el-form-item>
      <el-form-item label="Logo" prop="logUrl">
        <base-image-uploader :image="imageUrl" @success="uploadHandler"></base-image-uploader>
        <div style="margin-left: 20px">建议上传图片尺寸不要超过200 * 200,长宽比例最好保持1:1</div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="edit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { findCooperationById, editCooperation } from '@/server/api'
import { mapGetters } from 'vuex'

export default {
  name: 'EditView',
  props: {
    id: String
  },
  data () {
    return {
      loading: false,
      imageUrl: '',
      form: {
        type: '1',
        name: '',
        clickUrl: '',
        logUrl: ''
      },
      rules: {
        name: [{ required: true }],
        clickUrl: [{ required: true }],
        logUrl: [{ required: true }]
      }
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    })
  },
  created () {
    this.findById(this.id)
  },
  methods: {
    uploadHandler (data) {
      this.form.logUrl = data
    },
    findById (id) {
      this.loading = true
      findCooperationById({ id }).then(data => {
        this.form = data
        this.form.id = id
        this.form.type = data.type.toString()
        this.imageUrl = this.baseUrl + data.logUrl
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
        editCooperation(this.form).then(() => {
          this.$message({
            message: '合作方式保存成功!',
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
