// definePlugin 会把定义的string 变量插入到Js代码中。
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';

const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
});

module.exports = {
  entry: './src/js/main.js', // 入口文件
  output: {
    filename: './dist/js/bundle.js', // 打包输出的文件
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }, // 用!去链式调用loader
      {
        test: /\.vue$/, // a regex for matching all files that end in `.vue`
        loader: 'vue',   // loader to use for matched files
      },
    ],
  },
  postcss() {
    return [cssnext];
  },
  devtool: 'source-map',
  plugins: [definePlugin],
};
