var path = require('path');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
        options: {
          appendTsSuffixTo: [ /\.vue$/ ]
        }
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        exclude: [ './src/index.html' ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
          // other vue-loader options go here
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    extensions: [ '.vue', '.ts', '.js' ],
    alias: {
      Vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
      vue: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
      Vuetify: path.resolve(__dirname, 'node_modules/vuetify/dist/vuetify.js'),
      d3: path.resolve(__dirname, 'node_modules/d3/d3.min.js'),
      crossfilter: path.resolve(__dirname, 'node_modules/crossfilter2/crossfilter.min.js'),
      dc: path.resolve(__dirname, 'node_modules/dc/dc.min.js')
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  plugins: [],
  devtool: '#eval-source-map',
  node: {
    fs: 'empty'
  }
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: true,
      reportFilename: 'reports/report.html',
      generateStatsFile: true
    })
  ]);
}
