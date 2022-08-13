<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="addDialog = true">新增地址</el-button>
    <el-form v-loading="loading" :inline="true" :model="form" ref="form">
      <el-form-item label="转出地址私钥" prop="walletAddress">
        <el-input v-model="form.privateKey" placeholder="请输入私钥" />
      </el-form-item>
      <el-form-item label="转出代币合约" prop="walletAddress">
        <el-input v-model="form.tokenAddress" placeholder="请输入合约地址" @blur="getSymbol(form.tokenAddress)">
          <template #suffix>{{ symbol }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="selectionId.length < 1 || !form.privateKey || !form.tokenAddress" @click="transactBat">一键转币</el-button>
        <el-button type="danger" icon="delete" :disabled="selectionId.length < 1" @click="handleDeleteList">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table border style="width: 100%"
              :data="tableData"
              v-loading="loading"
              @selection-change="selectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="walletAddress" label="地址"/>
      <el-table-column prop="quantity" label="转入数量"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">转币记录</el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="确定要删除这个地址吗?">
            <template #reference>
              <el-button size="small" type="danger" icon="delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <add-comp v-model:visible="addDialog" @success="qryList"></add-comp>
  </div>
</template>

<script>
import { findTransferAll, delTransfer, transact } from '@/server/http/api'
import { mapGetters } from 'vuex'
import AddComp from '@/views/transfer/AddComp'
import ERCContract from '@/server/contract/ERCContract'

export default {
  name: 'ListView',
  components: {
    AddComp
  },
  data () {
    return {
      addDialog: false,
      loading: false,
      tableData: [],
      selectionRow: [],
      symbol: '',
      form: {
        privateKey: '',
        tokenAddress: '',
        transfes: []
      },
      rules: {
        privateKey: [{ required: true }],
        tokenAddress: [{ required: true }],
        transfes: [{ required: true, validator: (rule, val, callback) => val && val.length > 0 }]
      }
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    }),
    selectionId () {
      return this.selectionRow.map(item => {
        return item.id.toString()
      })
    }
  },
  watch: {
    selectionId (val) {
      Object.assign(this.form, {
        transfes: this.selectionRow.map(item => {
          return {
            id: item.id.toString(),
            quantity: item.quantity,
            walletAddress: item.walletAddress
          }
        })
      })
    }
  },
  created () {
    this.qryList()
  },
  methods: {
    qryList () {
      this.loading = true
      findTransferAll().then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    selectionChange (selection) {
      this.selectionRow = selection
    },
    getSymbol (address) {
      this.symbol = ''
      const contract = new ERCContract(this.walletAddress, address)
      contract.getSymbol().then(data => {
        this.symbol = data
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'transferRecord', params: { address: row.walletAddress } })
    },
    handleDelete (index, row) {
      this.loading = true
      delTransfer([row.id.toString()]).then(() => {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
      }).finally(() => {
        this.qryList()
        this.loading = false
      })
    },
    handleDeleteList () {
      this.loading = true
      delTransfer(this.selectionId).then(() => {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
      }).finally(() => {
        this.qryList()
        this.loading = false
      })
    },
    transactBat () {
      this.$refs.form.validate().then(() => {
        this.loading = true
        transact(this.form).then(() => {
          this.$message({
            message: '转账成功!',
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

<style lang="less" scoped>
.list-view {
  .el-form {
    width: 100%;
    margin: unset;
    .el-input {
      width: 500px;
    }
  }
}
</style>
