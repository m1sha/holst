# Scene

[Go to Home](./index)

## Constructor

```ts
  constructor ()
```

## Properties

|name|type|description|
|----|----|-----------|
|layers|Readonly<[Layer](./layer.md)>[]|List of the scene layers|
|actionLayer|[Layer](./layer.md)| Active action layer|
|styleManager|[StyleManager](./StyleManager.md)|Style Manager|

## Method

|name|description|
|----|----|
|createLayer (name?: string, frozen?: boolean): Layer| Creates a new layer|
|clearAllLayers (): void| Clears all layers|
|clearActiveLayer (): void| Clears the active layer|
|sendToBack (layer: Layer): void| Sends the layer to back|
|sendToBackward (layer: Layer): void| Sends the layer to backward|
|bringToFront (layer: Layer): void| Brings the layer to front|
|bringToForward (layer: Layer): void| Brings the layer to forward|


[Go to Home](./index)