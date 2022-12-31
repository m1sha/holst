import { Drawable, IPoint, Layer, Scene, Shape } from '../../../src'
import { Component } from '../components/base/component'
import { AddedEntityCommand } from './commands/added-entity-command'
import { ChangeBackgroundSizeCommand } from './commands/change-background-size-command'
import { ChangeToolCommand } from './commands/change-tool-command'
import { Command } from './commands/command'
import { CreateInputTextCommand } from './commands/create-input-text-command'
import { CreateTextCommand } from './commands/create-text-command'
import { DeleteEntitiesCommand } from './commands/delete-entities-command'
import { InputTextCommand } from './commands/input-text-command'
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
      this.#storage.add(item)
      item.create(this.selectedLayer)
      this.sendCommand(this, new AddedEntityCommand(item))
    })
  }

  undo () {
    alert('undo')
  }

  redo () {
    alert('redo')
  }

  private onStateChanged (sender: AppState | Component<HTMLElement>, command: Command<any>): void {
    if (command instanceof SelectEntitiesCommand) {
      this.#selectedEntities = []
      command.invoke(this.#storage, this)
    }

    if (command instanceof ChangeToolCommand) {
      this.#selectedTool = command.data!
    }

    if (command instanceof ChangeBackgroundSizeCommand) {
      command.invoke(this.background)
    }

    if (command instanceof CreateInputTextCommand) {
      this.#currentTextPosition = command.data![1]
    }

    if (command instanceof InputTextCommand) {
      this.#currentText = command.data!
    }

    if (command instanceof CreateTextCommand) {
      command.invoke(this)
    }

    if (command instanceof DeleteEntitiesCommand) {
      command.data!.forEach(p => {
        this.#storage.remove(p)
        this.selectedLayer.remove(p)
      })
    }

    this.#storage.refresh()
  }
}
