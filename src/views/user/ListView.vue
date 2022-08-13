<template>
  <div class="list-view">
    <el-form :inline="true" :model="form" ref="form">
      <el-form-item label="钱包地址" prop="walletAddress">
        <el-input v-model="form.walletAddress" placeholder="请输入用户钱包地址" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="qryList">查询</el-button>
        <el-button icon="refresh" @click="$refs.form.resetFields()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="walletAddress" label="地址" />
      <el-table-column prop="parentAddress" label="上级地址" />
      <el-table-column prop="invCode" label="邀请码" />
      <el-table-column prop="createTime" label="注册时间" />
      <el-table-column prop="user" label="个人绩效">
        <template #default="scope">
          <span v-if="scope.row.user">{{ scope.row.user }}</span>
          <el-button type="primary" @click="findUser(scope.$index, scope.row)" v-else>查询</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="team" label="团队绩效">
        <template #default="scope">
          <span v-if="scope.row.team">{{ scope.row.team }}</span>
          <el-button type="primary" @click="findTeam(scope.$index, scope.row)" v-else>查询</el-button>
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
import { findUserAll, findUserIncome, findTeamIncome } from '@/server/http/api'
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
    findTeam (index, row) {
      findTeamIncome({ walletAddress: row.walletAddress }).then(data => {
        this.tableData[index].team = (data || [{ quantity: '', symbol: '暂无数据' }]).map(item => {
          return item.quantity + item.symbol
        }).join(' ; ')
      })
    },
    findUser (index, row) {
      findUserIncome({ walletAddress: row.walletAddress }).then(data => {
        this.tableData[index].user = (data || [{ quantity: '', symbol: '暂无数据' }]).map(item => {
          return item.quantity + item.symbol
        }).join(' ; ')
      })
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
