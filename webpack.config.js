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
    extensions: ['.ts', '.tsx', '.js']
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
  config.entry['linear-chart'] = './src/chart/index.ts'
  config.entry['linear-chart2'] = './src/chart2/index.ts'
  config.entry['linear-chart3'] = './src/chart3/index.ts'
  config.entry['test-bundle'] = './src/test-index.ts'
  config.output.library = 'charts'
}

module.exports = config
