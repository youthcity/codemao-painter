// definePlugin 会把定义的string 变量插入到Js代码中。
import webpack from 'webpack';
import cssnext from 'postcss-cssnext';
import path from 'path';
import nodeExternals from 'webpack-node-externals';


/**
 * Usage: if(__DEV__) {
 *          console.warn();
 *        }
 * @type {Plugin}
 */
//const definePlugin = new webpack.DefinePlugin({
//  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
//  __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false')),
//});

module.exports = {
  entry: [  // 入口文件
    //'webpack-dev-server/client?http://localhost:8080',
    //'webpack/hot/only-dev-server',
    './src/main.tsx',
  ],
  output: {
    //publicPath: 'http://localhost:8080/',
    filename: './dist/bundle.js', // 打包输出的文件
  },
  // Enable sourcemaps for debugging webpack's output.
  //devtool: 'source-map',
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js$/, // test 去判断是否为.js,是的话就是进行es6和jsx的编译
        exclude: /(node_modules)/,
        loader: 'babel-loader?presets=es2015',
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        loaders: [
          //'react-hot',
          'ts-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        loader: 'style-loader!css-loader!postcss-loader'
      }, // 用!去链式调用loader
    ],
    preLoaders: [
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      //{ test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  //target: 'node',
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    //'react-color': 'commonjs react-color'
  },
  //externals: [nodeExternals()],
  postcss() {
    return [cssnext];
  },
  //plugins: [definePlugin],
};
