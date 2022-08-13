<template>
  <div class="header-comp">
    <div class="header-logo">
      <img src="@img/logo.png"/>
      <span>疯狂盲盒</span>
      <el-icon @click="operateMenu(false)" v-show="collapse"><expand /></el-icon>
      <el-icon @click="operateMenu(true)" v-show="!collapse"><fold /></el-icon>
    </div>
    <div class="header-nav">
      <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="header-function">
      <el-tooltip
        effect="dark"
        content="退出"
        placement="bottom">
        <el-icon @click="logout"><switch-button /></el-icon>
      </el-tooltip>
      <el-tooltip
        effect="dark"
        :content="address ? '钱包已连接' : '连接钱包'"
        placement="bottom">
        <el-icon @click="enable" :class="{success: address, fail: !address}"><Link /></el-icon>
      </el-tooltip>
    </div>
    <div class="header-avatar">
      <span>{{ username }}</span>
      <span><el-icon><avatar /></el-icon></span>
    </div>
  </div>
</template>

<script>
import { logout } from '@/server/http/api'
import Wallet from '@/plugins/Wallet'
import config from '@/assets/data/wallet.conf'
import { mapGetters } from 'vuex'

export default {
  name: 'HeaderComp',
  data () {
    return {
      username: localStorage.getItem('username'),
      breadcrumb: [],
      collapse: false,
      wallet: null
    }
  },
  computed: {
    ...mapGetters({
      address: 'wallet/getAddress'
    })
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  mounted () {
    this.getBreadcrumb()
    this.wallet = new Wallet({
      config,
      enable: this.enableHandler,
      connect: this.connectHandler,
      chainChanged: this.enable,
      accountsChanged: this.enableHandler
    })
    this.$store.commit('wallet/setWallet', this.wallet)
  },
  methods: {
    // 点击连接图标的处理
    linkHandler () {
      if (this.wallet && !this.address) {
        this.wallet.enable()
      }
    },
    // 授权回调
    enableHandler (accounts) {
      this.$store.commit('wallet/setAddress', accounts[0])
    },
    // 连接回调
    connectHandler ({ wallet }) {
      wallet.enable()
    },
    // 网络切换回调
    enable ({ wallet, chainId, config }) {
      if (chainId !== config.chainId) {
        this.$messageBox.confirm('网络切换', '系统检测到当前不是BSC网络,请问是否切换致BSC网络?', {
          type: 'warning'
        }).then(() => {
          wallet.enable()
        }).catch(() => {
          // on cancel
          this.$notify({ message: '当前网络不正确，系统无法正常运行', duration: 5000 })
        })
      } else {
        wallet.enable()
      }
    },
    getBreadcrumb () {
      this.breadcrumb = this.$route.matched.map(item => {
        return item.meta.title
      })
    },
    operateMenu (data) {
      this.collapse = data
      this.$emit('operateMenu', data)
    },
    logout () {
      logout(this.form).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        this.$router.push({ name: 'login' })
      }).catch(e => {
        this.$router.push({ name: 'login' })
        this.$message({
          message: e,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header-comp {
  display: flex;
  align-items: center;
  .header-logo {
    width: 180px;
    height: 60px;
    color: #ffd04b;
    font-size: 20px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 40px;
      margin-right: 10px;
    }
    .el-icon {
      cursor: pointer;
    }
  }
  .header-nav {
    padding-left: 50px;
    color: #eee;
    flex: 1;
  }
  .header-function {
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #eeeeee;
    font-size: 24px;
    padding: 0 10px;
    .el-icon {
      margin: auto 10px;
      cursor: pointer;
      transition: all 200ms;
      &:hover {
        font-size: 26px;
        color: #ffd04b;
      }
      &.success {
        color: #67C23A;
      }
      &.fail {
        color: #F56C6C;
      }
    }
  }
  .header-avatar {
    display: flex;
    align-items: center;
    color: #eeeeee;
    span:last-child {
      display: flex;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      background: #ffd04b;
      align-items: center;
      justify-content: space-around;
      font-size: 24px;
      color: #21242c;
      margin-left: 10px;
    }
  }
}
</style>
<style lang="less">
.header-comp {
  .header-nav {
    .el-breadcrumb__inner {
      color: #FAFCFF;
    }
  }
}
</style>
