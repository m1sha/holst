import { Drawable, Layer, Scene } from '../../../src'
import { Component } from '../components/base/component'
import { Command } from './commands/command'
import { SelectEntitiesCommand } from './commands/select-entities-command'
import { Entity } from './entities/entity'
import { EntitiesStorage } from './storage'
import { defineStyles } from './styles'
import { SelectTool, Tool } from './tool'

/* eslint no-use-before-define: "off" */
type CommandInvokerCallback = (sender: Component<HTMLElement> | AppState, command: Command<any>) => void

export class AppState {
  #scene: Scene | null = null
  #selectedTool: Tool = new SelectTool()
  #selectedLayer: Layer | null = null
  #selectedEntities: Entity<Drawable>[] = []
  #storage: EntitiesStorage = new EntitiesStorage()
  private invokers: CommandInvokerCallback[] = []

  constructor () {
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

  set selectedTool (tool: Tool) {
    this.#selectedTool = tool
    // this.sendCommand(this, 'selectedTool')
  }

  // addSelectedEntity (entity: Entity<Drawable>) {
  //   this.#selectedEntities.push(entity)
  //   this.sendCommand(this, 'selectedEntity')
  // }

  // clearSelectedEntities () {
  //   this.#selectedEntities = []
  //   this.sendCommand(this, 'clearSelectedEntities')
  // }

  sendCommand (sender: Component<HTMLElement> | AppState, command: Command<any>): void { this.invokers.forEach(p => p(sender, command)) }
  addInvoker (callback: CommandInvokerCallback) { this.invokers.push(callback) }
  addEntities (entities: Entity<Drawable>[]) {
    entities.forEach(item => {
      this.#storage.add(item)
      item.create(this.selectedLayer)
    })
  }

  private onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof SelectEntitiesCommand) {
      const item = this.entities.find(p => command.data && command.data.indexOf(p.target.id) > -1)
      this.#selectedEntities = []
      if (item) this.#selectedEntities.push(item)
    }
  }
}
