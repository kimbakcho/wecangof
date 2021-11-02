// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
          args[0].title = "위캔고- 위드 코로나 시대";
          return args;
        })
  },
  publicPath: process.env.VUE_PUBLIC_URL,
  configureWebpack:   process.env.NODE_ENV === 'production' ?  {
    plugins: [new PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/','/BC001/7'],
      renderer: new Renderer({
        headless: false,
        renderAfterDocumentEvent: 'render-event'
      })
    })]
  }: {}

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
