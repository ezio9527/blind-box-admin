<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'administratorAdd' })">添加管理员</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="180" />
      <el-table-column prop="userName" label="账号" width="180" />
      <el-table-column prop="createTime" label="创建时间" />
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
import { delAdmin, findAdminAll } from '@/server/http/api'

export default {
  name: 'ListView',
  data () {
    return {
      pageNo: 0,
      pageSize: 10,
      tableData: []
    }
  },
  created () {
    this.qryList()
  },
  methods: {
    qryList () {
      findAdminAll({ pageNo: this.pageNo, pageSize: this.pageSize }).then(data => {
        this.tableData = data
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'administratorEdit', params: { data: JSON.stringify(row) } })
    },
    handleDelete (index, row) {
      delAdmin({ id: row.id.toString() }).then(() => {
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

<style scoped>

</style>
