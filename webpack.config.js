const path = require('path');

// webpack 中的所有的配置信息都应该写在 module.exports 中
module.exports = {
  mode: 'development',
  // 指定入口文件
  entry: path.resolve(__dirname, './src/index.ts'),
  // 指定打包文件的目录
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js"
  },
  // 指定 webpack 打包时要使用模块
  module: {
    // 指定要加载的规则
    rules: [
        {
            test: /\.(js|jsx)$/i,
            loader: 'babel-loader',
        },
        {
            // test 指定的是规则生效的文件
            test: /\.ts$/,
            // 要使用的 loader
            use: 'ts-loader',
            // 要排除的文件
            exclude: /node_modules/
        }
    ]
  },
  resolve: {
    //webpack 不知道哪些文件可以作为模块引入，所以在引入 .ts 模块的时候会报错
    extensions: ['.ts','.js']
  }
}