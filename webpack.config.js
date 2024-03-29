// 此配置只用于IDE设置 Language and Framework > JavaScript > Webpack 用
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src'),
      '@views': resolve('src/views'),
      '@comp': resolve('src/components'),
      '@img': resolve('src/assets/images'),
      '@data': resolve('src/assets/data')
    }
  }
}
