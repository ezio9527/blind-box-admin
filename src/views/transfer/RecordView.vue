<template>
  <div class="record-view">
    <el-page-header title="返回" :content="$route.meta.title" @back="$router.push({ name: 'transferList' })" />
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="type" label="类型" width="180" :formatter="formatter"/>
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" />
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
      if (cellValue === 1) {
        return '通知公告'
      } else {
        return '操作指南'
      }
    },
    qryList () {
      this.loading = true
      findTransactionRecord().then(data => {
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
