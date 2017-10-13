const webpack = require('webpack')

module.exports = {
  entry: './app.js',
  output: {
    filename: 'vendor/bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
}