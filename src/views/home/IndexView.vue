<template>
  <div>home</div>
</template>

<script>
import { login } from '@/server/api'

export default {
  name: 'HomeView',
  created () {
    login({ username: '张三' })
  }
}
</script>

<style scoped>

</style>
