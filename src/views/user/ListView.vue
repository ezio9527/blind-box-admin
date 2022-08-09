<template>
  <div class="list-view">
    <el-form :inline="true" :model="form">
      <el-form-item label="钱包地址">
        <el-input v-model="form.walletAddress" placeholder="请输入用户钱包地址" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="qryList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="name" label="名称" width="180" />
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
    <el-pagination
      v-model:currentPage="form.pageNo"
      v-model:page-size="form.pageSize"
      @current-change="qryList"
      @size-change="qryList"
      :page-sizes="[10, 20, 30, 50]"
      layout="sizes, prev, pager, next"
      :total="tableData.length"/>
  </div>
</template>

<script>
import { findUserAll } from '@/server/api'
import { mapGetters } from 'vuex'

export default {
  name: 'ListView',
  data () {
    return {
      loading: false,
      form: {
        pageNo: 1,
        pageSize: 10,
        walletAddress: ''
      },
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
      findUserAll(this.form).then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'cooperationEdit', params: { id: row.id.toString() } })
    },
    handleDelete (index, row) {
    }
  }
}
</script>

<style lang="less" scoped>
.list-view {
  .el-form {
    width: 100%;
  }
  .el-pagination {
    margin-top: 50px;
    justify-content: center;
  }
}
</style>
