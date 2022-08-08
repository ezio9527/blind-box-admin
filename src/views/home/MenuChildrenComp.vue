<template>
  <template v-for="(menu, index) in children">
    <template v-if="menu.meta.subMenu">
      <el-sub-menu :index="menu.path" :key="index">
        <template #title>
          <component :is="$icon[menu.meta.icon]"></component>
          <span>{{ menu.meta.title }}</span>
        </template>
        <menu-children-comp :children="menu.children"></menu-children-comp>
      </el-sub-menu>
    </template>
    <template v-else-if="menu.meta.menuItem">
      <el-menu-item :index="menu.path" :key="index">
        <template #title>
          <component :is="$icon[menu.meta.icon]"></component>
          <span>{{ menu.meta.title }}</span>
        </template>
      </el-menu-item>
    </template>
    <template v-else-if="menu.children">
      <menu-children-comp :children="menu.children" :key="index"></menu-children-comp>
    </template>
  </template>
</template>

<script>
export default {
  name: 'MenuChildrenComp',
  props: {
    children: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border-right: none;
  svg {
    width: 20px;
    margin-right: 5px;
  }
}
</style>
