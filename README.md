# TS-Graphic is 2D Graphic library

```html
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  const scene = new Scene()
  scene
    .createLayer()
    .createShape({ strokeStyle: '#000' })
    .circle({ x: 150, y: 150 }, 50)
    .on('hover', p => p.asShape().style.fillStyle = 'red' )
    .on('leave', p => p.asShape().style.fillStyle = 'blue' )

  const canvas = document.getElementById('canvas')
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
</script>
```

## Documentation

[Get started](./docs/core/index.md)

## Demo project list

* [getpalette](./src/demo/getpalette/README.md) - The demo is how extract unique colors from an uploaded image and make from those colors palette [(see live)](https://getpalette.github.io/)
* sprites - shows sprites animation
* relative-draw - test for draw in the relative coordinate
* colors - test for how works colors
* block-scheme-editor - block scheme editor
* chart3
* paint
* [viewport](./src/demo/viewport/README.md) - The demo shows the viewport with a scroll box and gives the opportunity to move and/or scale the scene
* [movement](./src/demo/movement/README.md) - The demo shows shapes moving using matrix transform method

## Road Map  
* [Task list](tasks.todo)

## Drafts

* [Declarative Style](/docs/core/declarative-style.md)