# Painting API

```html
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  const scene = new Scene()
  scene
    .createLayer()
    .createShape({ strokeStyle: '#000' })
    .circle({ x: 150, y: 150 }, 50)
    .on('click', p => p.asShape().style.fillStyle = '::ani color red white .2s' )

  const canvas = document.getElementById('canvas')
  const renderer = new Renderer2D(canvas.getContext('2d')!!)
  renderer.render(scene)
</script>
```

## Classes

* [Scene](./scene)
* [Layer](./layer)
* [Shape](./shape)
* [Renderer2D](./renderer2D)

[README](../../README.md)