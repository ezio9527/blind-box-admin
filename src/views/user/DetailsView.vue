<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'boxList' })" />
    <el-form :model="form" size="large" label-width="120px">
      <el-form-item label="盲盒图片" prop="box.imageUrl">
        <div style="background: linear-gradient(137deg, #845CCF 0%, #C25296 59%, #EE4B6E 100%);padding: 20px">
          <base-image-uploader class="base-image-uploader" :image="baseUrl+form.box.imageUrl"></base-image-uploader>
        </div>
      </el-form-item>
      <el-form-item label="盲盒名称" prop="box.boxName">
        <el-input v-model="form.box.boxName"/>
      </el-form-item>
      <el-form-item label="盲盒总数" prop="box.totalNum">
        <el-input v-model="form.box.totalNum"/>
      </el-form-item>
      <el-form-item label="盲盒价格" prop="box.price">
        <el-input v-model="form.box.price"/>
      </el-form-item>
      <el-form-item label="代币合约地址" prop="box.contractAddress">
        <el-input v-model="form.box.contractAddress"/>
      </el-form-item>
      <el-form-item label="发布者地址" prop="box.owenAddress">
        <el-input v-model="form.box.owenAddress"/>
      </el-form-item>
      <el-form-item label="发布者分成" prop="box.owenIncome">
        <el-input v-model="form.box.owenIncome"/>
      </el-form-item>
      <el-form-item label="对接者地址" prop="box.proxyAddress">
        <el-input v-model="form.box.proxyAddress"/>
      </el-form-item>
      <el-form-item label="盲盒内容" >
        <div></div>
      </el-form-item>
      <el-form-item v-for="(item, index) in form.proportions" :key="index" :label="(index+1+'.').toString()">
        <el-col :span="2"><el-input v-model="form.proportions[index].quantity"/></el-col>
        <el-col :span="1"><div style="text-align: center;">个</div></el-col>
        <el-col :span="6" :offset="1"><el-input v-model="form.proportions[index].totalNum"/></el-col>
        <el-col :span="6" :offset="1"><el-input v-model="form.proportions[index].tokenAddress"/></el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'DetailsView',
  props: {
    box: {}
  },
  data () {
    return {
      form: {
        box: {
          imageUrl: '',
          boxName: '',
          totalNum: '',
          price: '',
          contractAddress: '',
          owenAddress: '',
          owenIncome: '',
          proxyAddress: ''
        },
        proportions: [{
          quantity: '',
          totalNum: '',
          tokenAddress: ''
        }]
      }
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    })
  },
  created () {
    if (!this.box.box) {
      this.$router.push({ name: 'boxList' })
      return
    }
    this.form = this.box
  }
}
</script>

<style>
.base-image-uploader {
  width: 120px;
  height: 120px;
}
</style>
