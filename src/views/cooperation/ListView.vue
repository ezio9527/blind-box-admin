<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'cooperationAdd' })">添加合作方式</el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="type" label="类型" width="180" :formatter="formatter"/>
      <el-table-column prop="name" label="名称" width="180" />
      <el-table-column prop="logUrl" label="Logo">
        <template #default="scope">
          <img style="width: 100px" :src="baseUrl+scope.row.logUrl">
        </template>
      </el-table-column>
      <el-table-column prop="clickUrl" label="链接" />
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
import { findCooperationAll, delCooperation } from '@/server/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ListView',
  data () {
    return {
      loading: false,
      tableData: []
    }
  },
  computed: {
    ...mapGetters({
      baseUrl: 'imageBaseUrl/getUrl'
    })
  },
  created () {
    this.qryList()
  },
  methods: {
    formatter (row, column, cellValue, index) {
      if (cellValue === 1) {
        return '合作机构'
      } else {
        return '入驻项目方'
      }
    },
    qryList () {
      this.loading = true
      findCooperationAll().then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'cooperationEdit', params: { id: row.id.toString() } })
    },
    handleDelete (index, row) {
      delCooperation({ id: row.id.toString() }).then(() => {
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
