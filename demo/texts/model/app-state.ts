import { Drawable, IPoint, Layer, Scene, Shape } from '../../../src'
import { Component } from '../components/base/component'
import { AddedEntityCommand } from './commands/added-entity-command'
import { Command } from './commands/command'
import { Commander } from './commands/commander'
import { Entity } from './entities/entity'
import { EntitiesStorage } from './storage'
import { defineStyles } from './styles'
import { SelectTool, Tool } from './tool'

/* eslint no-use-before-define: "off" */
type CommandInvokerCallback = (sender: Component<HTMLElement> | AppState, command: Command<any>) => void

export interface MutableAppState {
  scene: () => Scene
  selectedTool: () => Tool
  selectedLayer: () => Layer
  selectedEntities: () => Entity<Drawable>[]
  currentTextPosition: () => IPoint
  currentText: () => string
  storage: () => EntitiesStorage
  clearSelected: () => void
  setTool: (tool: Tool) => void
  setCurrentTextPosition: (point: IPoint) => void
  setCurrentText: (text: string) => void
  background: () => Shape
  addEntities: (entities: Entity<Drawable>[]) => void
}

export class AppState {
  #commander: Commander = new Commander()
  #scene: Scene | null = null
  #selectedTool: Tool = new SelectTool()
  #selectedLayer: Layer | null = null
  #selectedEntities: Entity<Drawable>[] = []
  #currentTextPosition: IPoint = { x: 0, y: 0 }
  #currentText: string = ''
  #storage: EntitiesStorage = new EntitiesStorage()
  private invokers: CommandInvokerCallback[] = []
  background: Shape

  constructor () {
    const layer0 = this.scene.createLayer()
    this.background = layer0.createShape('background').rect(0, 0, 0, 0)
    this.addInvoker((sender, command) => this.onStateChanged(sender, command))
  }

  get selectedTool () { return this.#selectedTool }

  get selectedLayer () {
    if (this.#selectedLayer) return this.#selectedLayer
    return (this.#selectedLayer = this.scene.createLayer())
  }

  get selectedEntities () { return this.#selectedEntities }

  get scene () {
    if (!this.#scene) { this.#scene = new Scene(); defineStyles(this.#scene) }
    return this.#scene
  }

  get entities (): Array<Entity<Drawable>> {
    return this.#storage.entities
  }

  get currentTextPosition () {
    return this.#currentTextPosition
  }

  get currentText (): string {
    return this.#currentText
  }

  sendCommand (sender: Component<HTMLElement> | AppState, command: Command<any>): void { this.invokers.forEach(p => p(sender, command)) }

  addInvoker (callback: CommandInvokerCallback) { this.invokers.push(callback) }

  addEntities (entities: Entity<Drawable>[]) {
    entities.forEach(item => {
      this.sendCommand(this, new AddedEntityCommand(item))
    })
  }

  undo () {
    this.#commander.undo(this.mutable)
    this.#storage.refresh()
  }

  redo () {
    this.#commander.redo(this.mutable)
    this.#storage.refresh()
  }

  private onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    this.#commander.add(command)
    command.execute(this.mutable)
    this.#storage.refresh()
  }

  private get mutable (): MutableAppState {
    return {
      currentText: () => this.#currentText,
      currentTextPosition: () => this.#currentTextPosition,
      scene: () => this.#scene!,
      selectedEntities: () => this.#selectedEntities,
      selectedLayer: () => this.selectedLayer,
      selectedTool: () => this.#selectedTool,
      storage: () => this.#storage,
      clearSelected: () => (this.#selectedEntities = []),
      setTool: tool => (this.#selectedTool = tool),
      setCurrentTextPosition: point => (this.#currentTextPosition = point),
      setCurrentText: text => (this.#currentText = text),
      background: () => this.background,
      addEntities: entities => this.addEntities(entities)
    }
  }
}
