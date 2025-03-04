const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    script: './src/js/main.js'
  },
  plugins: [

    new HtmlWebpackPlugin({
      title: 'Battleship Game',
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin()

  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  mode: 'development'
}
