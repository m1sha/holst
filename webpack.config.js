const path = require('path')

const config = {
  mode: process.env.mode,
  devtool: 'inline-source-map',
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
  config.entry['chart-bundle'] = './src/chart3/index.ts'
} else {
  // config.entry['linear-chart3'] = './src/chart3/index.ts'
  // config.entry['editor.bundle'] = './src/block-scheme-editor/index.ts'
  config.entry['demo.bundle'] = './src/demo/relative-draw/index.ts'
  config.entry['sprites.bundle'] = './src/demo/sprites/index.ts'
  config.entry['getpalette.bundle'] = './src/demo/getpalette/index.ts'
  config.entry['colors.bundle'] = './src/demo/colors/index.ts'
  config.output.library = 'demo'
}

module.exports = config
