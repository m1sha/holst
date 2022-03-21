# 2D Graphic library

* Remake in EventHandler

```ts
constructor (scene: Scene, render: Renderer2D) {
    ...
    render.on((et, e) => this.invoke(et, e as MouseEvent), 'mousemove', 'mouseleave', 'click', 'mouseup', 'mousedown', 'mouseleave')
}
```
  