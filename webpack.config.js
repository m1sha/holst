const path = require('path')

module.exports = {
  mode: process.env.mode,
  devtool: 'inline-source-map',
  entry: {
    'linear-chart': './src/linear-chart.ts' //,
    // 'linear-chart2': './src/linear-chart2.ts'
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'charts'//,
    // libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}
