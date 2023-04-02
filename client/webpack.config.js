const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const { title } = require('process');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },

    plugins: [
      
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'progressive-text-editor'
    }),

    new InjectManifest ({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js'
    }),

    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'progressive-text-editor',
      short_name: 'Jate',
      description: 'Keep your notes stored both online and offline.',
      background_color: '#225ca3',
      theme_color: '#225ca3',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 256, 384, 512],
          destination: path.join('assets', 'icons')
        }
      ]

    })
      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader']
        },

        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime']
            }
          }
        }
        
      ],
    },
  };
};
