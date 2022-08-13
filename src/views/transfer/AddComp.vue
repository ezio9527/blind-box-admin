<template>
  <el-dialog v-loading="loading" v-model="dialogFormVisible" title="新增地址" @close="close">
    <el-form :model="form" ref="form">
      <el-form-item label="转入地址" prop="walletAddress">
        <el-input v-model="form.walletAddress" autocomplet />
      </el-form-item>
      <el-form-item label="转入数量" prop="quantity">
        <el-input v-model="form.quantity" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="add">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>

import { addTransfer } from '@/server/http/api'

export default {
  name: 'AddComp',
  props: {
    visible: Boolean
  },
  watch: {
    visible (val) {
      this.dialogFormVisible = Boolean(val)
    }
  },
  data () {
    return {
      loading: false,
      dialogFormVisible: false,
      form: {
        walletAddress: '',
        quantity: 0
      }
    }
  },
  methods: {
    close () {
      this.dialogFormVisible = false
      this.$emit('update:visible', false)
    },
    add () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        addTransfer(this.form).then(() => {
          this.$message({
            message: '地址保存成功!',
            type: 'success'
          })
          this.close()
          this.$emit('success')
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
