// definePlugin 会把定义的string 变量插入到Js代码中。
let definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
});

module.exports = {
  entry: './main.js', // 入口文件
  output: {
    filename: 'bundle.js', // 打包输出的文件
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
        },
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' }, // 用!去链式调用loader
    ],
  },
  plugins: [definePlugin],
};
