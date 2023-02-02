const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@web-ip-util': resolve('../../')
      }
    }
  }
  // chainWebpack: config => {
  //   config.resolve.alias.set('@web-ip-util', resolve('../../'))
  // }
})
