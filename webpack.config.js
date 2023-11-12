/* eslint-disable no-undef */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './assets/js/index.js',
  output: {
    filename: 'index.[contenthash].js',
    path: path.resolve(__dirname, './dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]',
        },
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[contenthash][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[contenthash][ext]',
        },
      },
    ],
  },
  mode: 'development',
  devServer: {
    port: 8082,
    historyApiFallback: true,
    hot: true,
    open: true,
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name]-[contenthash].css',
    }),
    new HTMLWebpackPlugin({
      inject: 'body',
      template: 'index.html',
    }),
    new CleanWebpackPlugin(),
  ],
};
