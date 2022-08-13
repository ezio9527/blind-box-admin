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
        <el-input v-model="form.box.contractAddress">
          <template #suffix>
            {{ symbolList[0] }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="发布者地址" prop="box.owenAddress">
        <el-input v-model="form.box.owenAddress">
          <template #suffix>
            {{ symbolList[1] }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="发布者分成" prop="box.owenIncome">
        <el-input v-model="form.box.owenIncome"/>
      </el-form-item>
      <el-form-item label="对接者地址" prop="box.proxyAddress">
        <el-input v-model="form.box.proxyAddress">
          <template #suffix>
            {{ symbolList[2] }}
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="盲盒内容" >
        <div></div>
      </el-form-item>
      <el-form-item v-for="(item, index) in form.proportions" :key="index" :label="(index+1+'.').toString()">
        <el-col :span="2"><el-input v-model="form.proportions[index].totalNum"/></el-col>
        <el-col :span="1"><div style="text-align: center;">个</div></el-col>
        <el-col :span="2" :offset="1"><el-input v-model="form.proportions[index].quantity"/></el-col>
        <el-col :span="10" :offset="1">
          <el-input v-model="form.proportions[index].tokenAddress">
            <template #suffix>
              {{ symbolList[index + 3] }}
            </template>
          </el-input>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ERCContract from '@/server/contract/ERCContract'

export default {
  name: 'DetailsView',
  props: {
    box: {}
  },
  data () {
    return {
      symbolList: ['', '', '', '', '', ''],
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
      baseUrl: 'imageBaseUrl/getUrl',
      walletAddress: 'wallet/getAddress'
    })
  },
  created () {
    if (!this.box.box) {
      this.$router.push({ name: 'boxList' })
      return
    }
    this.form = this.box
    this.getSymbol(this.form.box.contractAddress, 0)
    // this.getSymbol(this.form.box.owenAddress, 1)
    // this.getSymbol(this.form.box.proxyAddress, 2)
    // this.form.box.proportions.forEach((item, index) => {
    //   this.getSymbol(item.tokenAddress, index + 3)
    // })
  },
  methods: {
    getSymbol (address, key) {
      this.symbolList[key] = ''
      const contract = new ERCContract(this.walletAddress, address)
      contract.getSymbol().then(data => {
        this.symbolList[key] = data
      })
    }
  }
}
</script>

<style>
.base-image-uploader {
  width: 120px;
  height: 120px;
}
</style>
