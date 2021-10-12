import { Environment } from '../environment'

export interface Command {
   execute (environment: Environment)
 }
