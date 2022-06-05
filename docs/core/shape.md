# Shape

[Go to Home](./index)

## Constructor

```ts
new (path: MutablePath2D, order: number, style: ShapeStyle | null = null)
```

## Properties

|name|type|description|
|----|----|-----------|
|id|string|An uniquely identifier for the the shape
|style|[ShapeStyle](./shape-style.md)|Shape style settings|
|name|string|Shape name for outside usage, may use as identifier for example|
|order|number|The order of drawing in a layer|
|frozen|boolean|If is it true the shape isn't use global matrix transformation
|modifiers|[Modifier](./modifier.md)[]|The shape modifiers
|relative|[RelativeMutablePath2D](./RelativeMutablePath2D.md)| Sets the relative coordinate system for the primitives drawn by the shape|
shift|[Point](./point.md)| Gets e and f from transform matrix
bounds|[Rect](./rect.md)| Gets the boundary rectangle
## Method

|name|description|
|----|----|
|rect (rect: IRect)| Draws a rectangle|
|roundRect (rect: IRect, radius: number)<br /> roundRect (rect: IRect, radius: Corner4)| Draws a rectangle with rounded corners
moveTo (point: IPoint)| Sets a hidden point on the canvas|
lineTo (point: IPoint)| Draws a line from the previous position to the given point|
lineH (point: IPoint, width: number)| Draws a horizontal line|
lineV (point: IPoint, height: number)| Draws a vertical line|
arc (point: IPoint, radius: number, startAngle: number, endAngle: number, anticlockwise?: boolean)| Draws an arc|
ellipse (point: IPoint, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, anticlockwise?: boolean)| Draws an ellipse|
circle (point: IPoint, radius: number)|Draws an ellipse|
quadraticCurveTo (cp: IPoint, p: IPoint)|Draws a quadraticCurveTo|
polyline (points: IPoint[])|Draws a polyline|
line (pointStart: IPoint, pointEnd: IPoint, options?: LineOptions)|Draws a line|
closePath ()| Draws a line to the last position|
merge (shape: Shape)| Imports all geometry from the given shape to the current one|
move (point: IPoint)| Moves the shape to the specified location|
scale (point: IPoint)| Scales the shape|
inPath (p: Point): boolean| Gets point in path|
inStroke (p: Point): boolean| Gets point in Stroke|
toPath2D (globalTransform?: Matrix2D)| Creates the Path2D object|
copyPath ()| Copies the current shape mutable path|
setTransformFrom (shape: Shape)| Imports shape transform matrix from the given to current one |
copyStyle () | Gets copy of the shape style settings|
addModifier (modifier: Modifier) | Adds a modifier|
on (...) | Sets an event on the shape|
off (...) | Removes an event on the shape|




[Go to Home](./index)