<template>
  <div class="record-view">
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'transferList' })" />
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="symbol" label="币种" />
      <el-table-column prop="fromAddress" label="转出地址" />
      <el-table-column prop="walletAddress" label="转入地址" />
      <el-table-column prop="txHash" label="交易hash" />
      <el-table-column prop="quantity" label="数量" />
      <el-table-column prop="status" label="状态" :formatter="formatter"/>
      <el-table-column prop="createTime" label="时间" />
    </el-table>
  </div>
</template>

<script>
import { findTransactionRecord } from '@/server/http/api'

export default {
  name: 'RecordView',
  props: {
    address: String
  },
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  created () {
    this.qryList()
  },
  methods: {
    formatter (row, column, cellValue, index) {
      switch (cellValue) {
        case 1:
          return '处理中'
        case 2:
          return '成功'
        case 3:
          return '失败'
      }
    },
    qryList () {
      this.loading = true
      findTransactionRecord({ walletRecord: this.address }).then(data => {
        this.tableData = data.map(item => {
          item.id = item.id.toString()
          return item
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>
