const path = require('path');

module.exports = {
  entry: {
    'qrcode.js': './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name]',
    library: 'QRCodeLib',
    libraryTarget: 'umd',
  },
  resolve: {
    alias: {
      // '/SRC': path.resolve(__dirname, 'src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.test\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-jest',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  optimization: {},
};
