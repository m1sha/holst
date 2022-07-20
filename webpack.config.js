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
  config.output.libraryTarget = 'umd'
} else {
  // config.entry['linear-chart3'] = './src/chart3/index.ts'
  // config.entry['editor.bundle'] = './src/block-scheme-editor/index.ts'
  config.entry['demo.bundle'] = './demo/relative-draw/index.ts'
  config.entry['sprites.bundle'] = './demo/sprites/index.ts'
  config.entry['getpalette.bundle'] = './demo/getpalette/index.ts'
  config.entry['colors.bundle'] = './demo/colors/index.ts'
  config.entry['paint.bundle'] = './demo/paint/index.ts'
  config.entry['viewport.bundle'] = './demo/viewport/index.ts'
  config.entry['movement.bundle'] = './demo/movement/index.ts'
  config.entry['curves.bundle'] = './demo/curves/index.ts'
  config.entry['collisions.bundle'] = './demo/collisions/index.ts'
  config.entry['matrix.bundle'] = './demo/matrix/index.ts'
  config.entry['texts.bundle'] = './demo/texts/index.ts'
  config.entry['table.bundle'] = './demo/table/index.ts'
  config.entry['readme.bundle'] = './demo/readme/index.ts'
  config.entry['blur.bundle'] = './demo/blur/index.ts'
  config.output.library = 'demo'
}

module.exports = config
