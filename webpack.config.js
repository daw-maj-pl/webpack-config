const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js'
    // filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    watchContentBase: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),

    // MANY ENTRYPOINTS:
    // new HtmlWebpackPlugin({
    //   template: './src/kontakt.html',
    //   inject: true,
    //   chunks: ['index'],
    //   filename: 'kontakt.html'
    // }),

    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/
    }),
    new BrowserSyncPlugin(
      {
        host: 'localhost',
        port: 9100,
        proxy: 'http://localhost:9000'
      },
      {
        reload: false
      }
    ),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [autoprefixer()]
      }
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets',
        to: './dest/assets'
      }
    ])
  ],
  module: {
    rules: [
      /* {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          { loader: 'style-loader/url' },
          { loader: 'file-loader', options: { name: '[name].[ext]' } }
        ]
      }, */
      {
        test: /\.scss$/, //zamiana css na scss
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          'postcss-loader'
        ] //dopisanie komponentu
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] }
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' }
        }
      },
      {
        test: /\.(html)$/,
        use: ['html-loader']
      }
    ]
  }
};
