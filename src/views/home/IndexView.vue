<template>
  <el-container class="home-view">
    <el-header>
      <header-comp @operateMenu="operateMenu"></header-comp>
    </el-header>
    <el-container>
      <el-aside :class="{fold: collapse}">
        <menu-comp :collapse="collapse"></menu-comp>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import HeaderComp from '@/views/home/HeaderComp'
import MenuComp from '@/views/home/MenuComp'

export default {
  name: 'HomeView',
  components: {
    HeaderComp,
    MenuComp
  },
  data () {
    return {
      collapse: false
    }
  },
  created () {
    this.$store.dispatch('imageBaseUrl/getBaseUrl')
  },
  methods: {
    operateMenu (data) {
      this.collapse = data
    }
  }
}
</script>

<style lang="less" scoped>
.el-header {
  background-color: #000000;
}
.el-aside {
  width: 200px;
  transition: width 200ms;
  background-color: #21242c;
  &.fold {
    width: 64px;
  }
}
</style>
