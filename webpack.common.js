const path = require("path"); // 引入的node的路径处理模块
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const proxy = require('http-proxy-middleware')

module.exports = {
  mode: "development",
  devServer: {
    contentBase: './',
    inline: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://192.168.100.143:8040',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    overlay: { // 浏览器中显示警告和错误：
      errors: true
      // warnings: true
    },
  },
  entry: {
    // app:'./src/index.js'
    app: path.resolve(__dirname, 'src/index.js')
  },
  devtool: 'inline-source-map',
  output: {
    // 输出的文件名，可以是一个相对路径，相对于下面的path
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // 打包之后文件的就被放在这里。这里必须为绝对路径]
    // 默认值为当前项目的dist文件夹文件夹不存在的时候会自动创建
    chunkFilename: 'chunk/[name].[chunkhash].js',
    publicPath: '/', // 避免设置多级路由报错404（解决在刷新时相关文件的路径的设置不对的问题）
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader', // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'sass-loader' // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [{                                                                                                                                                                                                                                                                                                                                                                                                                                               
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'less-loader', // compiles Less to CSS
          
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["es2015", {"loose": true}],
              "react"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /.(jpg|png|gif|svg)$/, 
        use: ['url-loader?limit=8192&name=./[name].[ext]']
      },
      {
        test: /\.(mp3)$/,
        loader: 'url-loader',
      },
      {
        test: /\.(woff|svg|eot|ttf)\??.*$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: './public/index.html', //指定模板路径
        filename: 'index.html', //指定文件名
    }),  
    
  ],
  resolve: {
    modules: [path.resolve(__dirname, 'src'), './node_modules'],
    extensions: ['.js', '.jsx', '.json', '.css', '.less'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      // 'api': path.resolve(__dirname, './src/publics/Api'),
      // 'util': path.resolve(__dirname, './src/publics/common/util'),
      // 'Comps': path.resolve(__dirname, './src/components'),
      // 'Form': path.resolve(__dirname, './src/components/Form'),
      // 'Hoc': path.resolve(__dirname, './src/components/Hoc'),
      // 'globalRedux': path.resolve(__dirname, './src/redux'),
      // 'hooks': path.resolve(__dirname, './src/publics/common/hooks'),
    }
  },
};