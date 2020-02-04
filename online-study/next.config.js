const withCSS = require('@zeit/next-css')
const withLess = require('@zeit/next-less')

// 解决ant/lib/style/index.css 不认识@font-face 异常
if (typeof require !== 'undefined') {
  require.extensions['.css'] = (file) => {

  }
}

module.exports = Object.assign({}, withCSS(withLess({
  cssModules: true,
  webpack(config, {isServer}) {
    if (!isServer) {
      // 关闭css模块化, 使antd样式生效
      config.module.rules[2].use[2].options.module = false
    }
    return config
  }
})))
