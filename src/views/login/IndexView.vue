<template>
  <el-container class="login-view">
    <el-main>
      <div class="login-wrapper">
        <div></div>
        <div></div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'LoginView'
}
</script>

<style lang="less" scoped>
.login-view {
  background: radial-gradient(circle at center,var(--el-fill-color-lighter),var(--el-bg-color-page));
  .login-wrapper {
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%) translateY(-50%);
    background-color: var(--el-bg-color);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: var(--el-box-shadow);
  }
}
</style>
