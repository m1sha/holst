# Holst is 2D Graphic library

index.html
```html
<html>
  <body>
    <div id="app"></div>
  </body>
</html>
```

index.ts
```ts
import { Scene, Renderer2D, Color, Shape } from 'holst'

const scene = new Scene()
const forwardAnimation = scene.createAnimation({ duration: 1500 })
const backwardAnimation = scene.createAnimation({ duration: 1500 })
const layer = scene.createLayer()
const shape = Shape.create({ fill: Color.blue })
  .circle(400, 300, 150)
  .on('click', async () => {
    await forwardAnimation.play()
    await backwardAnimation.play()
  })
  .on('hover', e => (e.cursor = 'pointer'))
  .on('leave', e => (e.cursor = 'default'))
  
layer.add(shape)

forwardAnimation.action = ({ t }) => (
  shape.style.fill = Color.fromGradient(t, [Color.blue, Color.red])
)

backwardAnimation.action = ({ t }) => (
  shape.style.fill = Color.fromGradient(t, [Color.red, Color.blue])
)
  
const renderer = new DynamicRenderer2D({ width: 800, hight: 600 })
renderer.render(scene)

const app = document.getElementById('app')
app.append(renderer.element)
```
