<template>
  <div>
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'boxList' })" />
    <el-form :model="form" :rules="rules" ref="form" v-loading="loading" size="large" label-width="120px">
      <el-form-item label="盲盒图片" prop="box.imageUrl">
        <div style="background: linear-gradient(137deg, #845CCF 0%, #C25296 59%, #EE4B6E 100%);padding: 20px">
          <base-image-uploader class="base-image-uploader" @success="uploadHandler"></base-image-uploader>
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
      <el-form-item
        v-for="(item, index) in form.proportions"
        :key="index"
        :label="(index+1+'.').toString()"
        prop="proportions">
        <el-col :span="2"><el-input v-model="form.proportions[index].totalNum" placeholder="盲盒数量"/></el-col>
        <el-col :span="1"><div style="text-align: center;">个</div></el-col>
        <el-col :span="6" :offset="1"><el-input v-model="form.proportions[index].quantity" placeholder="奖励数量"/></el-col>
        <el-col :span="6" :offset="1"><el-input v-model="form.proportions[index].tokenAddress" placeholder="合约地址"/></el-col>
        <el-col :span="6" :offset="1">
          <el-button type="primary" icon="Plus" @click="plus" circle/>
          <el-button type="danger" icon="Delete" @click="sub(index)" circle/>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button icon="refresh" @click="resetFields">重置</el-button>
        <el-button type="primary" @click="add">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addBox } from '@/server/api'

export default {
  name: 'AddView',
  data () {
    return {
      loading: false,
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
      },
      rules: {
        box: {
          imageUrl: [{ required: true }],
          boxName: [{ required: true }],
          totalNum: [{ required: true }],
          price: [{ required: true }],
          contractAddress: [{ required: true }],
          owenAddress: [{ required: true }],
          owenIncome: [{ required: true }],
          proxyAddress: [{ required: true }]
        }
      }
    }
  },
  methods: {
    uploadHandler (data) {
      this.form.box.imageUrl = data
    },
    plus () {
      if (this.form.proportions.length < 3) {
        this.form.proportions.push({
          quantity: '',
          totalNum: '',
          tokenAddress: ''
        })
      } else {
        this.$message({
          message: '最多三个',
          type: 'info'
        })
      }
    },
    sub (index) {
      if (this.form.proportions.length > 1) {
        this.form.proportions.splice(index, 1)
      } else {
        this.$message({
          message: '最少一个',
          type: 'info'
        })
      }
    },
    resetFields () {
      this.$refs.form.resetFields()
      setTimeout(() => {
        const item = {
          proportions: [{
            quantity: '',
            totalNum: '',
            tokenAddress: ''
          }]
        }
        Object.assign(this.form, item)
      })
    },
    validate () {
      // 校验盲盒内容的设置
      // 校验盲盒数量设置
      let total = 0
      this.form.proportions.forEach(item => {
        total += Number(item.totalNum)
      })
      if (total !== Number(this.form.box.totalNum)) {
        this.$message({
          message: '盲盒数量设置不正确!',
          type: 'error'
        })
        return false
      }
      const isNull = this.form.proportions.some(item => {
        return !item.quantity || !item.totalNum || !item.tokenAddress
      })
      if (isNull) {
        this.$message({
          message: '盲盒内容设置不能为空!',
          type: 'error'
        })
        return false
      }
    },
    add () {
      this.$refs.form.validate().then(() => {
        if (!this.validate()) {
          return
        }
        this.loading = true
        this.form.box.owenIncome = Number(this.form.box.owenIncome)
        this.form.box.totalNum = Number(this.form.box.totalNum)
        this.form.box.price = Number(this.form.box.price)
        this.form.proportions.forEach(item => {
          item.quantity = Number(item.quantity)
          item.totalNum = Number(item.totalNum)
        })
        addBox(this.form).then(() => {
          this.$message({
            message: '盲盒保成功!',
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

<style>
.base-image-uploader {
  width: 120px;
  height: 120px;
}
</style>
