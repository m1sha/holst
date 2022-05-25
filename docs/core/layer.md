# Layer

[Go to Home](./index)

## Constructor

```ts
  constructor (order: number, styleManager: StyleManager, name?: string)
```

## Properties

|name|type|description|
|----|----|-----------|
|mask|[Shape](./shape.md)| Sets the mask|
|order|number|The order of drawing in the scene|
name|string|A name for outside usage, may use as identifier for example|
frozen|boolean|If is it true the layer isn't use global matrix transformation|
bounds| Readonly<Rect>|Gets the boundary rectangle|
shapes| [Shape](./shape.md)[]| List of shapes|
textBlocks|TextBlock| List of texts|
images|Bitmap| List of images|
entities| Readonly<Orderable[]>|List of orderable entities in the layer|

## Method

|name|description|
|----|----|
| createShape (style: ShapeStyle | string | null = null, path?: MutablePath2D): Shape | Creates the shape|
| addShape (shape: Shape): void | Adds the shape|
| createTextBlock (text: string, style: TextStyle | string, target?: Point): TextBlock | Creates the text block|
| createImage (img: Bitmap) | Creates an image|
| clear () | Clear the layer|
| createMask (defaultRect?: boolean): Shape| Creates the mask shape|
| removeMask (): void| Removes the mask shape|
| sendToBack (item: Shape | TextBlock | Bitmap): void| Sends an item to back|
| sendToBackward (item: Shape | TextBlock | Bitmap): void| Sends an item to backward|
| bringToFront (item: Shape | TextBlock | Bitmap): void| Brings an item to front|
| bringToForward (item: Shape | TextBlock | Bitmap): void| Brings an item to forward|

[Go to Home](./index)