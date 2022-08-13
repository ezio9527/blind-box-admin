<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'boxAdd' })">添加盲盒</el-button>
    <el-table border style="width: 100%"
              :data="tableData"
              v-loading="loading"
              :default-sort="{ prop: 'box.sort', order: 'ascending' }">
      <el-table-column prop="box.sort" label="序号" sortable width="80"/>
      <el-table-column prop="box.boxName" label="名称"/>
      <el-table-column prop="box.totalNum" label="总数"/>
      <el-table-column label="剩余数">
        <template #default="scope">
          {{ scope.row.box.totalNum - scope.row.box.sellNum }}
        </template>
      </el-table-column>
      <el-table-column prop="box.price" label="价格"/>
      <el-table-column label="图片">
        <template #default="scope">
          <img style="width: 100px;" :src="baseUrl+scope.row.box.imageUrl">
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
          <el-popconfirm
            @confirm="handleDelete(scope.$index, scope.row)"
            confirm-button-text="删除"
            cancel-button-text="取消"
            icon="InfoFilled"
            icon-color="#626AEF"
            title="即将删除该盲盒，请谨慎操作">
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
import { findBoxAll, delBox } from '@/server/http/api'
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
    qryList () {
      this.loading = true
      findBoxAll().then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'detailsBox', params: { data: JSON.stringify(row) } })
    },
    handleDelete (index, row) {
      delBox(row.box.id.toString()).then(() => {
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
