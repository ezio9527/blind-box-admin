const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('src'))
      .set('@views', path.resolve('src/views'))
      .set('@comp', path.resolve('src/components'))
      .set('@img', path.resolve('src/assets/images'))
      .set('@data', path.resolve('src/assets/data'))
      .set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '盲盒后台管理'
        return args
      })
  },
  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://www.sportlive8.com',
        changeOrigin: true,
        pathRewrite: {
          '/api': ''
        }
      }
      // '/ws': {
      //   target: 'http://www.sportlive8.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/ws': '/ws'
      //   },
      //   ws: true
      // }
    }
    // https: true
  },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
  }
})
