# Holst is 2D Graphic library

```html
<canvas id="canvas" width="300" height="300"></canvas>
<script>
  import { Scene, Renderer2D, Color } from 'holst'

  const scene = new Scene()
  const forwardAnimation = scene.createAnimation({ duration: 1500 })
  const backwardAnimation = scene.createAnimation({ duration: 1500 })

  const shape = scene
    .createLayer()
    .createShape({ fill: Color.blue }).circle(150, 150, 50)
    .on('click', async () => {
      await forwardAnimation.play()
      await backwardAnimation.play()
    })
    .on('hover', e => (e.cursor = 'pointer'))
    .on('leave', e => (e.cursor = 'default'))

  forwardAnimation.action = ({ t }) => shape.style.fill = Color.fromGradient(t, [Color.blue, Color.red])
  backwardAnimation.action = ({ t }) => shape.style.fill = Color.fromGradient(t, [Color.red, Color.blue])

  const canvas = document.getElementById('canvas')
  const renderer = new Renderer2D(canvas.getContext('2d')!)
  renderer.render(scene)
</script>
```

## Documentation

[Get started](./docs/core/index.md)

## Road Map  
* [Task list](tasks.todo)
