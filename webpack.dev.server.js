var WebpackDevServer = require("webpack-dev-server");
var webpack = require('webpack');

var localServerConfig = require('./config/webpack_dev_server.js');
var webpackConfig = require('./webpack.config.dev.js');
var local_server_host = '';
if (process.env.AUTO === '1') {
  if (process.env.HTTPS === '1') {
    local_server_host = 'https://' + localServerConfig.address + ':' + localServerConfig.port;
    webpackConfig.entry.app.unshift(
      "webpack-dev-server/client?" + local_server_host,
      "webpack/hot/dev-server"
    );
  } else {
    local_server_host = 'http://' + localServerConfig.address + ':' + localServerConfig.port;
    webpackConfig.entry.app.unshift(
      "webpack-dev-server/client?" + local_server_host,
      "webpack/hot/dev-server"
    );
  }
} else {
  local_server_host = 'http://' + localServerConfig.address + ':' + localServerConfig.port;
}

var compiler = webpack(webpackConfig);
var server = new WebpackDevServer(compiler, {
  hot: true,
  historyApiFallback: true,
  publicPath: "/",
  contentBase: './dist/',
  stats: {colors: true},
  https: process.env.HTTPS === '1' ? true : false
});

server.listen(localServerConfig.port, localServerConfig.address, function () {
  console.log('Listen on: ' + local_server_host);
});
