const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const sourceRoot = path.resolve(__dirname, 'src');


module.exports = {
  mode: 'development',
  entry: {
    create: sourceRoot + '/app/create/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      filename: 'create/index.html',
      template: './src/app/create/index.html'
    }),
    new MiniCssExtractPlugin({
      ffilename: '[name]/style.css'
    })
  ]
};