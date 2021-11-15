module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '你想设置的title名字'
        return args
      })
  },
  transpileDependencies: ['vuex-module-decorators'],
  runtimeCompiler: true,
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader'
        }
      ]
    }
  }
}
