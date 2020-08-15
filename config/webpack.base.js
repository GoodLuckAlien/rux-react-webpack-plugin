const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HappyPack = require('happypack')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev')
const proConfig = require('./webpack.pro')
const webpack = require('webpack')


function Appconfig (path){
  return {
    entry: {
      main: './src/index.js'
    },
    output: {
      path: path + '/dist',
      filename: '[name].js'
    },
    resolve:{
      extensions:['.js','.jsx', '.ts', '.tsx' , '.json'],/* 这几个后缀名的文件后缀可以省略不写 */
      alias:{
          '@':path+'/src'  /* @就表示根目录src这个路径 */
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options:{
                importLoaders:1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')]
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              esModule: false,
              name: '[name]_[hash].[ext]',
              outputPath: 'imgs/',
              limit: 2048
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            'css-hot-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [require('autoprefixer')]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.tsx?$/,
          use: {
            loader: 'ts-loader'
          }
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path+'/src',
          use:['happypack/loader?id=babel']
        }

      ]
    },
    optimization: {
      /* 代码分割 */
      splitChunks: {
        chunks: 'all'
      }
    },
    plugins: [
      new htmlWebpackPlugin({
        filename: 'index.html',
        template: './index.html'
      }),
      new CleanWebpackPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].css'
      }),
      /* 多线程编译 */
      new HappyPack({
        id:'babel',
        loaders:['babel-loader?cacheDirectory'],
        verbose:false
      })
    ]
  }
}

module.exports = function(path){
  return type => {
    if (type==='start') {
      return merge(Appconfig(path), devConfig(path))
    } else {
      return merge(Appconfig(path), proConfig)
    }
  }
}