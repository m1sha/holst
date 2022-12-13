const path = require('path')
const demos = require('./demo.json')

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
  config.output.libraryTarget = 'umd'
} else {
  for (const item of demos) {
    config.entry[item.name + '.bundle'] = './demo/' + item.name + '/index.ts'
  }
  // config.entry['getpalette.bundle'] = './demo/getpalette/index.ts'

  config.output.library = 'demo'
}

module.exports = config
