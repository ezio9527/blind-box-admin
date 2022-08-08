<template>
  <el-menu
    ref="menu"
    active-text-color="#ffd04b"
    background-color="#21242c"
    text-color="#fff"
    :router="true"
    :collapse="collapse"
    :default-active="defaultActive">
    <menu-children-comp :children="rootChildren"></menu-children-comp>
  </el-menu>
</template>

<script>
import router from '@/router'
import MenuChildrenComp from '@/views/home/MenuChildrenComp'
export default {
  name: 'MenuComp',
  components: {
    MenuChildrenComp
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      defaultActive: ''
    }
  },
  computed: {
    rootChildren () {
      let root = null
      router.getRoutes().forEach(route => {
        if (route.path === '/') {
          root = route
        }
      })
      return root.children
    }
  },
  created () {
    this.defaultActive = this.$route.path
  },
  methods: {
  }
}
</script>
