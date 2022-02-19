import { ElementStorage } from '../elements/element-storage'

export interface Command {
   execute (storage: ElementStorage): void
}
