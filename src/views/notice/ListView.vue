<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'noticeAdd' })">添加通知公告</el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="type" label="类型" width="180" :formatter="formatter"/>
      <el-table-column prop="title" label="标题" width="180" />
      <el-table-column prop="content" label="内容" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="确定要删除这项数据?">
            <template #reference>
              <el-button
                size="small"
                type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findNoticeAll, delNotice } from '@/server/http/api'

export default {
  name: 'ListView',
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
      findNoticeAll().then(data => {
        this.tableData = data.map(item => {
          item.id = item.id.toString()
          return item
        })
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'noticeEdit', params: { id: row.id.toString() } })
    },
    handleDelete (index, row) {
      delNotice({ id: row.id.toString() }).then(() => {
        this.$message({
          message: '删除成功!',
          type: 'success'
        })
      }).finally(() => {
        this.qryList()
      })
    }
  }
}
</script>
