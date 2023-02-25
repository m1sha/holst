const path = require('path')

const config = {
  mode: process.env.mode,
  devtool: 'source-map',
  entry: {},
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')]
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  }
}

if (process.env.libraryTarget === 'umd') {
  config.entry['holst.umd'] = './src/index.ts'
  config.output.libraryTarget = 'umd'
} else {
  config.entry.holst = './src/index.ts'
  config.output.library = 'holst'
}

module.exports = config
