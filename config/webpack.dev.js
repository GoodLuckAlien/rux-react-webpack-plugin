const webpack = require('webpack')
const RuxConsolePlugin = require('../plugins/rux-console-pulgin')
const devConfig =(path)=>{
  return  {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
      contentBase: path + '/dist',
      open: true, /* 自动打开浏览器 */
      hot: true,
      historyApiFallback: true,
      publicPath: '/',
      port: 8888, /* 服务器端口 */
      inline: true,
      proxy: {  /* 代理服务器 */
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new RuxConsolePlugin({
        dec:1
      })
    ]
  }
}

module.exports = devConfig