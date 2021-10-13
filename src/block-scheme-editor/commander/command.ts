import { Editor } from '../editor'

export interface Command {
   execute (editor: Editor)
 }
