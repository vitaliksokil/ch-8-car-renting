const {defineConfig} = require('@vue/cli-service')
const webpack = require('webpack');


module.exports = defineConfig({
    publicPath: process.env.VUE_APP_NODE_ENV === 'production'
        ? '/ch-8-car-renting/'
        : '/',
    transpileDependencies: true,
    css: {
        loaderOptions: {
            scss: {
                // additionalData: `@import "~@/assets/scss/app.scss";`
            },
        }
    },
  configureWebpack: {
      experiments: {
          topLevelAwait: true,
      },
    plugins: [
      new webpack.ProvidePlugin({
        process: "process/browser",
        Buffer: ["buffer", "Buffer"],
      }),
    ],
  },
})