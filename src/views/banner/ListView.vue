<template>
  <div class="list-view">
    <el-button type="primary" icon="plus" @click="$router.push({ name: 'bannerAdd' })">添加轮播图</el-button>
    <el-table :data="tableData" v-loading="loading" border style="width: 100%">
      <el-table-column prop="title" label="标题" width="180"/>
      <el-table-column prop="clickUrl" label="链接">
        <template #default="scope">
          <el-link type="info" target="_blank" :href="scope.row.clickUrl">{{ scope.row.clickUrl }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="180" />
      <el-table-column label="图片">
        <template #default="scope">
          <img style="width: 200px" :src="baseUrl+scope.row.imageUrl">
        </template>
      </el-table-column>
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
import { findBannerAll, delBanner } from '@/server/api'
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
      findBannerAll().then(data => {
        this.tableData = data
      }).finally(() => {
        this.loading = false
      })
    },
    handleEdit (index, row) {
      this.$router.push({ name: 'bannerEdit', params: { data: JSON.stringify(row) } })
    },
    handleDelete (index, row) {
      delBanner({ id: row.id.toString() }).then(() => {
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
