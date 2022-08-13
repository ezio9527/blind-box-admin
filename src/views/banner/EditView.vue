<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'bannerList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="标题" prop="name">
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
        <el-button type="primary" @click="edit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { editBanner } from '@/server/http/api'
import { mapGetters } from 'vuex'

export default {
  name: 'EditView',
  props: {
    banner: {
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
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    })
  },
  created () {
    if (!this.banner.id) {
      this.$router.push({ name: 'bannerList' })
      return
    }
    this.form.id = this.banner.id
    this.form.title = this.banner.title
    this.form.clickUrl = this.banner.clickUrl
    this.form.imageUrl = this.banner.imageUrl
    this.imageUrl = this.baseUrl + this.banner.imageUrl
  },
  methods: {
    uploadHandler (data) {
      this.form.imageUrl = data
    },
    edit () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        editBanner(this.form).then(() => {
          this.$message({
            message: '轮播图保存成功!',
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
