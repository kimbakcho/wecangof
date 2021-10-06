module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
      ? '/wecango'
      : '/',
  // devServer: {
  //   historyApiFallback: true,
  //   proxy: {
  //     "/bwecango": {
  //       target: "http://127.0.0.1:8181/bwecango",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         "^/bwecango": "",
  //       },
  //     },
  //   },
  // }

}
