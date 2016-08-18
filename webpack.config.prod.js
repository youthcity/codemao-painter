var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var precss = require('precss');
var autoprefixer = require('autoprefixer');
var postPxToEm = require('postcss-px-to-em');

module.exports = {
  entry: {
    'codemao-painter': [
      './src/main.tsx'
    ],
    'react-libs': ['react', 'react-dom']
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: "js/chunk/[name].js"
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  resolve: {
    extensions: ['ts', '.tsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loaders: ['ts-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        name: '//o44j7l4g3.qnssl.com/painter/[name].[ext]'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      }
    ]
  },
  postcss: function () {
    return [precss, autoprefixer, postPxToEm({base: 16})];
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.temp.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react-libs',
      filename: 'js/react-libs.js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin('css/[name].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: false
    })
  ]
};
