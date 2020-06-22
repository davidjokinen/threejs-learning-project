const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    'dist':	path.join(__dirname, 'index.js'),
    'rpg/dist':	path.join(__dirname, 'rpg/index.js'),
    // 'game/js/ui':		path.join(__dirname, 'game/js/ui', 'index.js'),
    // 'game/js/components':		path.join(__dirname, 'game/js/components', 'index.js'),
    // 'game/js/core':		path.join(__dirname, 'game/js/core', 'index.js'),
    // 'game/js/map':		path.join(__dirname, 'game/js/map', 'index.js'),
    // 'game/js/scenes':		path.join(__dirname, 'game/js/components', 'index.js'),
    // 'game/js/services':		path.join(__dirname, 'game/js/services', 'index.js'),
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },
  output: {
    path: path.resolve(__dirname),
		// publicPath: '/dist/',
		filename: '[name]/index.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env"]
          }
        }
      }
    ]
  }
};