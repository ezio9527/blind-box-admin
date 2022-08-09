<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'boxAdd' })">添加盲盒</el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
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
      <el-table-column prop="content" label="内容" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            size="small"
            @click="handleEdit(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { findBoxAll, delNotice } from '@/server/api'
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
