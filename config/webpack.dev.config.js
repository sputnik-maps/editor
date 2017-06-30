// based on webpack.production.config.js
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ProgressBarPlugin = require('webpack-simple-progress-plugin');


module.exports = {
  entry: {
    app: './src/index.jsx',
    vendor: [
        'file-saver',
        'mapbox-gl/dist/mapbox-gl.js',
        //TODO: Build failure because cannot resolve migrations file
        //"mapbox-gl-style-spec",
        "lodash.clonedeep",
        "lodash.throttle",
        'color',
        'react',
        "react-dom",
        "react-color",
        "react-file-reader-input",
        "react-collapse",
        "react-height",
        "react-icon-base",
        "react-motion",
        "react-sortable-hoc",
        "request",
        //TODO: Icons raise multi vendor errors?
        //"react-icons",
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'public'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[chunkhash].js'
  },

  devtool: 'cheap-module-eval-source-map',
  watch: true,

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders
  },
  node: {
    fs: "empty",
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', '[chunkhash].vendor.js'),
    new WebpackCleanupPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new ProgressBarPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      title: 'Maputnik'
    })
  ]
};
