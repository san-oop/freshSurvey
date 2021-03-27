const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: [path.join(__dirname, 'src'), path.join(__dirname, 'dist')],
    port: 8095,
    inline: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets', to: './assets' },
        { from: './src/styles.css', to: './' },
        { from: './src/questions.json', to: './' }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    })
  ],
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    }]
  },
};